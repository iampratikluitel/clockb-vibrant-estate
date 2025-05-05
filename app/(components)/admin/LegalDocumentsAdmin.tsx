import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FileText, Upload } from "lucide-react";
import { LegalDocumentsTable } from './LegalDocumentsTable';
import { toast } from "sonner";

interface LegalDocument {
  id: string;
  title: string;
  description: string;
  documentUrl: string;
  type: string;
  createdAt: string;
}

const DOCUMENT_TYPES = [
  { value: 'agreement', label: 'Agreement' },
  { value: 'report', label: 'Report' },
  { value: 'certificate', label: 'Certificate' },
];

export default function LegalDocumentsAdmin() {
  const [documents, setDocuments] = useState<LegalDocument[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: '',
  });

  useEffect(() => {
    fetchDocuments();
  }, []);

  const fetchDocuments = async () => {
    try {
      const response = await fetch('/api/legal-docs', {
        credentials: 'include',
      });
      if (!response.ok) throw new Error('Failed to fetch documents');
      const data = await response.json();
      setDocuments(data);
    } catch (error) {
      console.error('Error fetching documents:', error);
      toast.error('Failed to fetch documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedFile(e.target.files[0]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedFile) {
      toast.error('Please select a file');
      return;
    }

    try {
      // First, get a presigned URL for upload
      console.log('Selected file:', {
        name: selectedFile.name,
        type: selectedFile.type || 'application/octet-stream'
      });

      const presignedResponse = await fetch('/api/upload', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          filename: selectedFile.name,                 // lowercase “filename”
          contentType: selectedFile.type || 'application/octet-stream', // exactly “contentType”
        }),
      });

      if (!presignedResponse.ok) {
        const errorData = await presignedResponse.json();
        console.error('Upload error:', errorData);
        throw new Error('Failed to get upload URL');
      }
      const { url, key } = await presignedResponse.json();
      console.log('Presigned URL response:', { url, key });

      // Upload the file to MinIO
      const uploadResponse = await fetch(url, {
        method: 'PUT',
        body: selectedFile,
        headers: {
          'Content-Type': selectedFile.type || 'application/octet-stream',
        },
      });

      if (!uploadResponse.ok) {
        console.error('MinIO upload failed:', await uploadResponse.text());
        throw new Error('Failed to upload file to MinIO');
      }

      // Save the document metadata
      const documentResponse = await fetch('/api/legal-docs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        credentials: 'include',
        body: JSON.stringify({
          ...formData,
          documentUrl: key,
        }),
      });

      if (!documentResponse.ok) throw new Error('Failed to save document');
      
      toast.success('Document saved successfully');
      setFormData({ title: '', description: '', type: '' });
      setSelectedFile(null);
      fetchDocuments();
    } catch (error) {
      console.error('Error saving document:', error);
      toast.error('Failed to save document');
    }
  };

  const handleDelete = async (id: string) => {
    try {
      const response = await fetch(`/api/legal-docs?id=${id}`, {
        method: 'DELETE',
        credentials: 'include',
      });

      if (!response.ok) throw new Error('Failed to delete document');
      
      toast.success('Document deleted successfully');
      fetchDocuments();
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const handleEdit = (document: LegalDocument) => {
    setFormData({
      title: document.title,
      description: document.description,
      type: document.type,
    });
    // You might want to add an edit mode state to handle updates
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-6">Legal Documents Management</h1>
      
      <form onSubmit={handleSubmit} className="space-y-4 mb-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-1">Title</label>
            <Input
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium mb-1">Type</label>
            <Select
              value={formData.type}
              onValueChange={(value) => setFormData({ ...formData, type: value })}
            >
              <SelectTrigger>
                <SelectValue placeholder="Select document type" />
              </SelectTrigger>
              <SelectContent>
                {DOCUMENT_TYPES.map((type) => (
                  <SelectItem key={type.value} value={type.value}>
                    {type.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Document</label>
          <div className="flex items-center gap-2">
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              required
            />
            {selectedFile && (
              <span className="text-sm text-gray-500">{selectedFile.name}</span>
            )}
          </div>
        </div>

        <Button type="submit" className="w-full">
          <Upload className="w-4 h-4 mr-2" />
          Upload Document
        </Button>
      </form>

      {loading ? (
        <div className="flex justify-center items-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
        </div>
      ) : (
        <LegalDocumentsTable
          documents={documents}
          onEdit={handleEdit}
          onDelete={handleDelete}
        />
      )}
    </div>
  );
} 