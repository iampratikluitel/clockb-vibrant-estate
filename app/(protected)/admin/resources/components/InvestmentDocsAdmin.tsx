'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Download, FileText, ScrollText, File, Eye } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { useGetAdminInvestmentDocumentByIdQuery } from '@/store/api/Admin/adminResources';

interface InvestmentDoc {
  id: string;
  icon: 'file-text' | 'scroll-text' | 'file';
  title: string;
  description: string;
  buttonText: string;
  fileUrl?: string;
  actionType: 'download' | 'view';
}

export default function InvestmentDocsAdmin() {
  const [docs, setDocs] = useState<InvestmentDoc[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingDoc, setEditingDoc] = useState<InvestmentDoc | null>(null);
  const [newDoc, setNewDoc] = useState<Partial<InvestmentDoc>>({
    icon: 'file-text',
    buttonText: 'View PDF',
    actionType: 'download'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchDocs();
  }, []);

  const fetchDocs = async () => {
    try {
      const response = await fetch('/api/investment-docs');
      if (!response.ok) throw new Error('Failed to fetch investment documents');
      const data = await response.json();
      setDocs(data);
    } catch (error) {
      console.error('Error fetching investment documents:', error);
      toast.error('Failed to load investment documents');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleFileUpload = async () => {
    if (!selectedFile) {
      toast.error('Please select a file to upload');
      return;
    }

    try {
      setUploading(true);
      const formData = new FormData();
      formData.append('file', selectedFile);
      formData.append('uploadType', 'investment-docs');
      formData.append('title', selectedFile.name);
      formData.append('description', 'Investment document');

      const response = await fetch('/api/uploadtominio', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Upload failed');
      }

      const data = await response.json();
      if (!data || !data[0]) {
        throw new Error('Invalid response from server');
      }

      return data[0]; // Return the first uploaded file name
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to upload file');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddDoc = async () => {
    if (newDoc.title && newDoc.description && newDoc.buttonText) {
      try {
        let fileUrl = null;
        
        if (selectedFile) {
          fileUrl = await handleFileUpload();
          if (!fileUrl) {
            toast.error('Failed to upload file');
            return;
          }
        }

        const requestBody = {
          icon: newDoc.icon,
          title: newDoc.title,
          description: newDoc.description,
          buttonText: newDoc.buttonText,
          fileUrl,
          actionType: newDoc.actionType
        };

        const response = await fetch('/api/investment-docs', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          throw new Error(errorData.details || 'Failed to create document');
        }

        const data = await response.json();
        setDocs(prev => [...prev, data]);
        setNewDoc({ icon: 'file-text', buttonText: 'Download PDF', actionType: 'download' });
        setSelectedFile(null);
        setIsAddDialogOpen(false);
        toast.success('Document created successfully');
      } catch (error) {
        console.error('Error creating document:', error);
        toast.error(error instanceof Error ? error.message : 'Failed to create document');
      }
    } else {
      toast.error('Please fill in all required fields');
    }
  };

  const handleEditDoc = async () => {
    if (editingDoc) {
      try {
        let fileUrl = editingDoc.fileUrl;
        
        if (selectedFile) {
          fileUrl = await handleFileUpload();
          if (!fileUrl) return;
        }

        const response = await fetch(`/api/investment-docs/${editingDoc.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            icon: editingDoc.icon,
            title: editingDoc.title,
            description: editingDoc.description,
            buttonText: editingDoc.buttonText,
            fileUrl,
            actionType: editingDoc.actionType
          }),
        });

        if (!response.ok) throw new Error('Failed to update document');

        const data = await response.json();
        setDocs(prev => prev.map(doc => 
          doc.id === editingDoc.id ? data : doc
        ));
        setIsEditDialogOpen(false);
        setEditingDoc(null);
        setSelectedFile(null);
        toast.success('Document updated successfully');
      } catch (error) {
        console.error('Error updating document:', error);
        toast.error('Failed to update document');
      }
    }
  };

  const handleDeleteDoc = async (id: string) => {
    try {
      const response = await fetch(`/api/investment-docs/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete document');

      setDocs(prev => prev.filter(doc => doc.id !== id));
      toast.success('Document deleted successfully');
    } catch (error) {
      console.error('Error deleting document:', error);
      toast.error('Failed to delete document');
    }
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'file-text':
        return <FileText className="h-6 w-6 text-estates-primary" />;
      case 'scroll-text':
        return <ScrollText className="h-6 w-6 text-estates-primary" />;
      case 'file':
        return <File className="h-6 w-6 text-estates-primary" />;
      default:
        return <FileText className="h-6 w-6 text-estates-primary" />;
    }
  };

  if (loading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Investment Documents & Policies</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Document
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Document</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label>Icon</label>
                <Select
                  value={newDoc.icon}
                  onValueChange={(value) => setNewDoc({ ...newDoc, icon: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="file-text">File Text</SelectItem>
                    <SelectItem value="scroll-text">Scroll Text</SelectItem>
                    <SelectItem value="file">File</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label>Title</label>
                <Input
                  value={newDoc.title || ''}
                  onChange={(e) => setNewDoc({ ...newDoc, title: e.target.value })}
                  placeholder="Enter title"
                />
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <Textarea
                  value={newDoc.description || ''}
                  onChange={(e) => setNewDoc({ ...newDoc, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <div className="space-y-2">
                <label>Document File</label>
                <div className="flex items-center gap-2">
                  <Input
                    type="file"
                    onChange={handleFileChange}
                    accept=".pdf,.doc,.docx"
                    className="flex-1"
                  />
                  {selectedFile && (
                    <span className="text-sm text-gray-500">
                      {selectedFile.name}
                    </span>
                  )}
                </div>
              </div>
              {/* <div className="space-y-2">
                <label>Document Action</label>
                <Select
                  value={newDoc.actionType}
                  onValueChange={(value) => setNewDoc({ ...newDoc, actionType: value as 'download' | 'view' })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select action type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                  </SelectContent>
                </Select>
              </div> */}
              <div className="space-y-2">
                <label>Button Text</label>
                <Input
                  value={newDoc.buttonText || ''}
                  onChange={(e) => setNewDoc({ ...newDoc, buttonText: e.target.value })}
                  placeholder="Enter button text"
                />
              </div>
              <Button 
                onClick={handleAddDoc} 
                className="w-full"
                disabled={uploading || !selectedFile}
              >
                {uploading ? 'Uploading...' : 'Add Document'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {docs.map((doc) => (
            <div key={doc.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                    {getIconComponent(doc.icon)}
                  </div>
                  <h3 className="font-bold text-lg">{doc.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingDoc(doc);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteDoc(doc.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-5">{doc.description}</p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white"
                onClick={() => {
                  if (doc.fileUrl) {
                    if (doc.actionType === 'download') {
                      window.open(`/api/resources/download?filename=${encodeURIComponent(doc.fileUrl)}`, '_blank');
                    } else {
                      window.open(`/api/view?fileUrl=${encodeURIComponent(doc.fileUrl)}`, '_blank');
                    }
                  }
                }}
              >
                {doc.actionType === 'download' ? (
                  <Download className="w-4 h-4" />
                ) : (
                  <Eye className="w-4 h-4" />
                )}
                {doc.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Document</DialogTitle>
            </DialogHeader>
            {editingDoc && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Icon</label>
                  <Select
                    value={editingDoc.icon}
                    onValueChange={(value) => setEditingDoc({ ...editingDoc, icon: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="file-text">File Text</SelectItem>
                      <SelectItem value="scroll-text">Scroll Text</SelectItem>
                      <SelectItem value="file">File</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Title</label>
                  <Input
                    value={editingDoc.title}
                    onChange={(e) => setEditingDoc({ ...editingDoc, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label>Description</label>
                  <Textarea
                    value={editingDoc.description}
                    onChange={(e) => setEditingDoc({ ...editingDoc, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label>Document File</label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="file"
                      onChange={handleFileChange}
                      accept=".pdf,.doc,.docx"
                      className="flex-1"
                    />
                    {selectedFile && (
                      <span className="text-sm text-gray-500">
                        {selectedFile.name}
                      </span>
                    )}
                  </div>
                  {editingDoc.fileUrl && !selectedFile && (
                    <p className="text-sm text-gray-500">
                      Current file: {editingDoc.fileUrl.split('/').pop()}
                    </p>
                  )}
                </div>
                {/* <div className="space-y-2">
                  <label>Document Action</label>
                  <Select
                    value={editingDoc.actionType}
                    onValueChange={(value) => setEditingDoc({ ...editingDoc, actionType: value as 'download' | 'view' })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select action type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="view">View</SelectItem>
                    </SelectContent>
                  </Select>
                </div> */}
                <div className="space-y-2">
                  <label>Button Text</label>
                  <Input
                    value={editingDoc.buttonText}
                    onChange={(e) => setEditingDoc({ ...editingDoc, buttonText: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={handleEditDoc} 
                  className="w-full"
                  disabled={uploading}
                >
                  {uploading ? 'Uploading...' : 'Save Changes'}
                </Button>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </CardContent>
    </Card>
  );
} 