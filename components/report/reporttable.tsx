import { Button } from "@/components/ui/button";
import { DownloadCloud, Eye, FileText } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useState } from "react";
import { toast } from "sonner";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface ReportData {
  id: string;
  title: string;
  date: string;
  type: string;
  size: string;
  status: string;
  fileUrl: string;
}

interface ReportTableProps {
  data: ReportData[];
}

const ReportTable = ({ data }: ReportTableProps) => {
  const [loading, setLoading] = useState<{ [key: string]: boolean }>({});
  const [selectedDoc, setSelectedDoc] = useState<ReportData | null>(null);
  const [isDocumentDialogOpen, setIsDocumentDialogOpen] = useState(false);

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'completed':
      case 'approved':
      case 'final':
        return 'bg-green-100 text-green-800';
      case 'in progress':
      case 'in review':
        return 'bg-blue-100 text-blue-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      case 'draft':
        return 'bg-gray-100 text-gray-800';
      case 'updated':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getFileIcon = () => {
    return <FileText className="h-4 w-4" />;
  };

  const isImageFile = (filename: string) => {
    const imageExtensions = ['.jpg', '.jpeg', '.png', '.gif', '.webp', '.svg'];
    return imageExtensions.some(ext => filename.toLowerCase().endsWith(ext));
  };

  const handleAction = async (report: ReportData, action: 'view' | 'download') => {
    try {
      if (!report.fileUrl) {
        toast.error('No file available for this report');
        return;
      }

      setLoading(prev => ({ ...prev, [report.fileUrl]: true }));
      
      if (action === 'view') {
        setSelectedDoc(report);
        setIsDocumentDialogOpen(true);
      } else {
        const response = await fetch(`/api/resources/download?filename=${encodeURIComponent(report.fileUrl)}`);
        if (!response.ok) {
          throw new Error('Failed to get file URL');
        }
        
        const blob = await response.blob();
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = report.fileUrl.split('/').pop() || 'document';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
      }
    } catch (error) {
      console.error('Error handling file action:', error);
      toast.error('Failed to process file action');
    } finally {
      setLoading(prev => ({ ...prev, [report.fileUrl]: false }));
    }
  };

  return (
    <>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-estates-gray-100">
              <TableHead className="w-[40%]">Report Name</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {data.map((report) => (
              <TableRow key={report.id} className="hover:bg-estates-gray-100/50">
                <TableCell className="font-medium">
                  <div className="flex items-center gap-2">
                    {getFileIcon()}
                    {report.title}
                  </div>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(report.status)}`}>
                    {report.status}
                  </span>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleAction(report, 'view')}
                      disabled={loading[report.fileUrl]}
                    >
                      <Eye className="h-4 w-4" />
                      <span className="sr-only">View</span>
                    </Button>
                    <Button 
                      variant="outline" 
                      size="sm" 
                      className="h-8 px-2"
                      onClick={() => handleAction(report, 'download')}
                      disabled={loading[report.fileUrl]}
                    >
                      <DownloadCloud className="h-4 w-4" />
                      <span className="sr-only">Download</span>
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>

      <Dialog open={isDocumentDialogOpen} onOpenChange={setIsDocumentDialogOpen}>
        <DialogContent className="max-w-4xl h-[80vh] flex flex-col">
          <DialogHeader className="flex-none">
            <DialogTitle>{selectedDoc?.title}</DialogTitle>
          </DialogHeader>
          {selectedDoc && (
            <div className="flex flex-col flex-1 min-h-0">
              <div className="flex-1 overflow-auto">
                {selectedDoc.fileUrl?.toLowerCase().endsWith('.pdf') ? (
                  <object
                    data={`/api/view?fileUrl=${encodeURIComponent(selectedDoc.fileUrl)}`}
                    type="application/pdf"
                    className="w-full h-full"
                  >
                    <div className="flex flex-col items-center justify-center h-full">
                      <p className="text-gray-500 mb-4">Unable to display PDF directly</p>
                      <Button
                        variant="outline"
                        onClick={() => window.open(`/api/view?fileUrl=${encodeURIComponent(selectedDoc.fileUrl)}`, '_blank')}
                        className="flex items-center gap-2"
                      >
                        <Eye className="w-4 h-4" />
                        Open PDF in New Tab
                      </Button>
                    </div>
                  </object>
                ) : isImageFile(selectedDoc.fileUrl || '') ? (
                  <div className="relative w-full h-full">
                    <img
                      src={`/api/view?fileUrl=${encodeURIComponent(selectedDoc.fileUrl)}`}
                      alt={selectedDoc.title}
                      className="w-full h-full object-contain"
                    />
                  </div>
                ) : (
                  <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-gray-500 mb-4">Preview not available for this file type</p>
                    <Button
                      variant="outline"
                      onClick={() => handleAction(selectedDoc, 'download')}
                      className="flex items-center gap-2"
                    >
                      <DownloadCloud className="w-4 h-4" />
                      Download to View
                    </Button>
                  </div>
                )}
              </div>
              <div className="flex justify-end gap-2 mt-4 pt-4 border-t">
                <Button
                  variant="outline"
                  onClick={() => handleAction(selectedDoc, 'download')}
                  className="flex items-center gap-2"
                >
                  <DownloadCloud className="w-4 h-4" />
                  Download Document
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setIsDocumentDialogOpen(false)}
                >
                  Close
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default ReportTable;
