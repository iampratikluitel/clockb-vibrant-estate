"use client";

import { useState, useEffect, useRef } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Upload } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { uploadToMinIO } from "@/lib/helper";

interface Report {
  id: string;
  title: string;
  date: string;
  type: string;
  size: string;
  status: string;
  category: string;
  fileUrl?: string;
}

const STATUS_OPTIONS = [
  {
    value: "completed",
    label: "Completed",
    color: "bg-green-100 text-green-800",
  },
  {
    value: "in_progress",
    label: "In Progress",
    color: "bg-blue-100 text-blue-800",
  },
  {
    value: "pending",
    label: "Pending",
    color: "bg-yellow-100 text-yellow-800",
  },
  {
    value: "approved",
    label: "Approved",
    color: "bg-purple-100 text-purple-800",
  },
  { value: "draft", label: "Draft", color: "bg-gray-100 text-gray-800" },
  { value: "rejected", label: "Rejected", color: "bg-red-100 text-red-800" },
];

export default function ProjectUpdatesAdmin() {
  const [selectedTab, setSelectedTab] = useState("quarterly");
  const [reports, setReports] = useState<Report[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingReport, setEditingReport] = useState<Report | null>(null);
  const [formData, setFormData] = useState<Omit<Report, "id">>({
    title: "",
    date: "",
    type: "",
    size: "",
    status: "",
    category: "quarterly",
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchReports();
  }, []);

  const fetchReports = async () => {
    try {
      const response = await fetch("/api/reports");
      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || "Failed to fetch reports");
      }
      const data = await response.json();
      setReports(data);
    } catch (error) {
      console.error("Error fetching reports:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to load reports"
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddReport = () => {
    setEditingReport(null);
    setFormData({
      title: "",
      date: "",
      type: "",
      size: "",
      status: "",
      category: selectedTab,
    });
    setIsDialogOpen(true);
  };

  const handleEditReport = (report: Report) => {
    setEditingReport(report);
    setFormData({
      title: report.title,
      date: new Date(report.date).toISOString().split("T")[0],
      type: report.type,
      size: report.size,
      status: report.status,
      category: report.category,
    });
    setSelectedFile(null);
    setIsDialogOpen(true);
  };

  const handleDeleteReport = async (id: string) => {
    try {
      const response = await fetch(`/api/reports/${id}`, {
        method: "DELETE",
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(error.details || "Failed to delete report");
      }

      setReports(reports.filter((report) => report.id !== id));
      toast.success("Report deleted successfully");
    } catch (error) {
      console.error("Error deleting report:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to delete report"
      );
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData((prev) => ({
        ...prev,
        type: file.type.split("/")[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`,
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      let fileUrl = editingReport?.fileUrl;
      let size = formData.size;

      if (selectedFile) {
        fileUrl = await uploadToMinIO(selectedFile, "reports");
        size = `${(selectedFile.size / (1024 * 1024)).toFixed(1)} MB`;
      }

      const url = editingReport
        ? `/api/reports/${editingReport.id}`
        : "/api/reports";

      const method = editingReport ? "PUT" : "POST";
      const now = new Date();

      if (method === "PUT") {
        const response = await fetch(url, {
          method,
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            title: formData.title,
            date: new Date(formData.date),
            type: formData.type,
            size: size,
            status: formData.status,
            category: selectedTab,
            fileUrl: fileUrl,
            updatedAt: now,
          }),
        });
        // Handle response...
      } else {
        const metadata = {
          title: formData.title,
          date: new Date(formData.date),
          type: formData.type,
          size: size,
          status: formData.status,
          category: selectedTab,
          fileUrl: fileUrl,
          createdAt: now,
          updatedAt: now,
        };

        const form = new FormData();
        form.append("metadata", JSON.stringify(metadata));

        if (selectedFile) {
          form.append("file", selectedFile);
        }

        const response = await fetch(url, {
          method,
          body: form,
        });
      }

      if (!editingReport && selectedFile && !fileUrl) {
        throw new Error("File upload failed");
      }

      setIsDialogOpen(false);
      setSelectedFile(null);
      setFormData({
        title: "",
        date: "",
        type: "",
        size: "",
        status: "",
        category: selectedTab,
      });
      fetchReports();
      toast.success(
        editingReport
          ? "Report updated successfully"
          : "Report added successfully"
      );
    } catch (error) {
      console.error("Error submitting report:", error);
      toast.error(
        error instanceof Error ? error.message : "Failed to submit report"
      );
    }
  };

  const filteredReports = reports.filter(
    (report) => report.category === selectedTab
  );

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Project Updates & Reports</CardTitle>
        <Button onClick={handleAddReport}>
          <Plus className="mr-2 h-4 w-4" />
          Add Report
        </Button>
      </CardHeader>
      <CardContent>
        <Tabs value={selectedTab} onValueChange={setSelectedTab}>
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="quarterly">Quarterly Reports</TabsTrigger>
            <TabsTrigger value="construction">Construction Reports</TabsTrigger>
            <TabsTrigger value="land">Land Allocation</TabsTrigger>
          </TabsList>

          <TabsContent value="quarterly">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      {new Date(report.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditReport(report)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="construction">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      {new Date(report.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditReport(report)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>

          <TabsContent value="land">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Size</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredReports.map((report) => (
                  <TableRow key={report.id}>
                    <TableCell>{report.title}</TableCell>
                    <TableCell>
                      {new Date(report.date).toLocaleDateString()}
                    </TableCell>
                    <TableCell>{report.type}</TableCell>
                    <TableCell>{report.size}</TableCell>
                    <TableCell>{report.status}</TableCell>
                    <TableCell>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEditReport(report)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDeleteReport(report.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TabsContent>
        </Tabs>

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent aria-describedby="dialog-description">
            <DialogHeader>
              <DialogTitle>
                {editingReport ? "Edit Report" : "Add New Report"}
              </DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="date">Date</Label>
                <Input
                  id="date"
                  type="date"
                  value={formData.date}
                  onChange={(e) =>
                    setFormData({ ...formData, date: e.target.value })
                  }
                  required
                />
              </div>
              <div>
                <Label htmlFor="file">File</Label>
                <div className="flex items-center gap-2">
                  <Input
                    id="file"
                    type="file"
                    ref={fileInputRef}
                    onChange={handleFileChange}
                    className="hidden"
                  />
                  <Button
                    type="button"
                    variant="outline"
                    onClick={() => fileInputRef.current?.click()}
                    className="w-full"
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {selectedFile ? selectedFile.name : "Choose File"}
                  </Button>
                </div>
              </div>
              <div>
                <Label htmlFor="fileType">File Type</Label>
                <Select
                  value={formData.type}
                  onValueChange={(value) =>
                    setFormData({ ...formData, type: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select file type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="PDF">PDF</SelectItem>
                    <SelectItem value="DOC">DOC</SelectItem>
                    <SelectItem value="DOCX">DOCX</SelectItem>
                    <SelectItem value="XLS">XLS</SelectItem>
                    <SelectItem value="XLSX">XLSX</SelectItem>
                    <SelectItem value="PPT">PPT</SelectItem>
                    <SelectItem value="PPTX">PPTX</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="size">File Size</Label>
                <Input
                  id="size"
                  value={formData.size}
                  readOnly
                  placeholder="File size will be calculated automatically"
                  className="bg-gray-50"
                />
              </div>
              <div>
                <Label htmlFor="status">Status</Label>
                <Select
                  value={formData.status}
                  onValueChange={(value) =>
                    setFormData({ ...formData, status: value })
                  }
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    {STATUS_OPTIONS.map((status) => (
                      <SelectItem key={status.value} value={status.value}>
                        <span
                          className={`px-2 py-1 rounded-full text-xs font-medium ${status.color}`}
                        >
                          {status.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingReport ? "Update" : "Add"} Report
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
}
