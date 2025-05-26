'use client';

import { useState, useEffect, useRef } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Download } from "lucide-react";

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
  DialogDescription,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { uploadToMinIO } from '@/lib/helper';

interface LegalDocument {
  id: string;
  title: string;
  date: string;
  type: string;
  size: string;
  description: string;
  fileUrl: string;
  createdAt: string;
  actionType: 'download' | 'view';
}

const STATUS_OPTIONS = [
  { value: 'completed', label: 'Completed', color: 'bg-green-100 text-green-800' },
  { value: 'in_progress', label: 'In Progress', color: 'bg-blue-100 text-blue-800' },
  { value: 'pending', label: 'Pending', color: 'bg-yellow-100 text-yellow-800' },
  { value: 'approved', label: 'Approved', color: 'bg-purple-100 text-purple-800' },
  { value: 'draft', label: 'Draft', color: 'bg-gray-100 text-gray-800' },
  { value: 'rejected', label: 'Rejected', color: 'bg-red-100 text-red-800' },
];


export default function LegalDocumentsAdmin() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingDocument, setEditingDocument] = useState<LegalDocument | null>(null);
  const [formData, setFormData] = useState<Omit<LegalDocument, 'id'>>({
    title: '',
    date: '',
    type: '',
    size: '',
    description: '',
    fileUrl: '',
    createdAt: new Date().toISOString(),
    actionType: 'download'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/legal-docs', {
        credentials: 'include'
      });
      if (!response.ok) {
        throw new Error('Failed to fetch legal documents');
      }
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching legal documents:', error);
      toast.error('Failed to load legal documents');
    } finally {
      setIsLoading(false);
    }
  };

  const handleAddDocument = () => {
    setEditingDocument(null);
    setFormData({
      title: '',
      date: '',
      type: '',
      size: '',
      description: '',
      fileUrl: '',
      createdAt: new Date().toISOString(),
      actionType: 'download'
    });
    setIsDialogOpen(true);
  };

  const handleEditDocument = (document: LegalDocument) => {
    setEditingDocument(document);
    setFormData({
      title: document.title,
      date: document.date,
      type: document.type,
      size: document.size,
      description: document.description,
      fileUrl: document.fileUrl,
      createdAt: document.createdAt,
      actionType: document.actionType
    });
    setIsDialogOpen(true);
  };

  const handleDeleteDocument = async (id: string) => {
    try {
      const response = await fetch(`/api/legal-docs?id=${id}`, {
        method: 'DELETE',
      });
      
      if (!response.ok) {
        throw new Error('Failed to delete legal document');
      }
      
      setDocuments(documents.filter(doc => doc.id !== id));
      toast.success('Legal document deleted successfully');
    } catch (error) {
      console.error('Error deleting legal document:', error);
      toast.error('Failed to delete legal document');
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setSelectedFile(file);
      setFormData(prev => ({
        ...prev,
        type: file.type.split('/')[1].toUpperCase(),
        size: `${(file.size / (1024 * 1024)).toFixed(1)} MB`
      }));
    }
  };

  // const uploadFile = async (file: File) => {
  //   try {
  //     const payload = {
  //       filename: file.name,
  //       contentType: file.type || 'application/octet-stream',
  //     };
  //     console.log('[uploadFile] sending →', payload);
      
  //     // First, get a pre-signed URL from your API
  //     const response = await fetch('/api/upload', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       credentials: 'include',
  //       body: JSON.stringify(payload),
  //     });

  //     if (!response.ok) {
  //       const errorData = await response.json().catch(() => ({ error: 'Failed to parse error response' }));
  //       console.error('[uploadFile] upload URL request failed:', {
  //         status: response.status,
  //         statusText: response.statusText,
  //         error: errorData
  //       });
  //       throw new Error(errorData.error || 'Failed to get upload URL');
  //     }

  //     const { url, key } = await response.json();
  //     console.log('[uploadFile] got presigned URL:', { url, key });

  //     // Upload the file to MinIO using the pre-signed URL
  //     const uploadResponse = await fetch(url, {
  //       method: 'PUT',
  //       body: file,
  //       headers: {
  //         'Content-Type': file.type,
  //       },
  //     });

  //     if (!uploadResponse.ok) {
  //       console.error('[uploadFile] MinIO upload failed:', {
  //         status: uploadResponse.status,
  //         statusText: uploadResponse.statusText
  //       });
  //       throw new Error('Failed to upload file to MinIO');
  //     }

  //     return key;
  //   } catch (error) {
  //     console.error('[uploadFile] error:', error);
  //     throw error;
  //   }
  // };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      if (!selectedFile) {
        toast.error('Please select a file');
        return;
      }

      // 1. Upload the file first
      const fileUrl = await uploadToMinIO(selectedFile, "legal");
      console.log('[handleSubmit] file uploaded, url:', fileUrl);

      // 2. Construct the payload
      const payload = {
        title: formData.title,
        description: formData.description,
        type: formData.type,
        fileUrl: fileUrl,
        date: formData.date || new Date().toISOString(),
        size: formData.size,
        actionType: formData.actionType
      };

      console.log('[handleSubmit] formData:', formData);
      console.log('[handleSubmit] selectedFile:', {
        name: selectedFile.name,
        size: selectedFile.size,
        type: selectedFile.type
      });
      console.log('[handleSubmit] final payload:', payload);

      // 3. Save the document metadata
      const response = await fetch('/api/legal-docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        const errorData = await response.json();
        console.error('[handleSubmit] save failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData
        });
        throw new Error(errorData.error || 'Failed to save legal document');
      }

      const savedDocument = await response.json();
      console.log('[handleSubmit] document saved:', savedDocument);
      
      setDocuments([...documents, savedDocument]);
      setIsDialogOpen(false);
      toast.success('Legal document added successfully');
    } catch (error) {
      console.error('Error saving legal document:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to save legal document');
    }
  };

  const handleDownload = async (fileUrl: string, title: string) => {
    try {
      const response = await fetch(`/api/download?fileUrl=${encodeURIComponent(fileUrl)}`, {
        credentials: 'include'
      });
      
      if (!response.ok) {
        throw new Error('Failed to download file');
      }
      
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = title;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Legal Documents</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex justify-end mb-4">
          <Button onClick={() => setIsDialogOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Legal Document
          </Button>
        </div>

        {isLoading ? (
          <div className="flex justify-center items-center h-32">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
          </div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Size</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {documents.map((doc) => (
                <TableRow key={doc.id}>
                  <TableCell>{doc.title}</TableCell>
                  <TableCell>{new Date(doc.date).toLocaleDateString()}</TableCell>
                  <TableCell>{doc.size}</TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDownload(doc.fileUrl, doc.title)}
                      >
                        <Download className="h-4 w-4" />
                      </Button>
                      {/* <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleEditDocument(doc)}
                      >
                        <Pencil className="h-4 w-4" />
                      </Button> */}
                      <Button 
                        variant="ghost" 
                        size="sm" 
                        onClick={() => handleDeleteDocument(doc.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>{editingDocument ? 'Edit Legal Document' : 'Add Legal Document'}</DialogTitle>
              <DialogDescription>
                {editingDocument ? 'Update the legal document details below.' : 'Fill in the details to add a new legal document.'}
              </DialogDescription>
            </DialogHeader>
            <form onSubmit={handleSubmit}>
              <div className="space-y-4">
                <div>
                  <Label htmlFor="title">Title</Label>
                  <Input
                    id="title"
                    value={formData.title}
                    onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="description">Description</Label>
                  <Textarea
                    id="description"
                    value={formData.description}
                    onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div>
                  <Label htmlFor="file">File</Label>
                  <Input
                    id="file"
                    type="file"
                    onChange={handleFileChange}
                    ref={fileInputRef}
                  />
                </div>
                <div>
                  <Label htmlFor="actionType">Document Action</Label>
                  <Select
                    value={formData.actionType}
                    onValueChange={(value) => setFormData({ ...formData, actionType: value as 'download' | 'view' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="view">View</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="mt-6 flex justify-end gap-2">
                <Button type="button" variant="outline" onClick={() => setIsDialogOpen(false)}>
                  Cancel
                </Button>
                <Button type="submit">
                  {editingDocument ? 'Update' : 'Add'} Legal Document
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
} 