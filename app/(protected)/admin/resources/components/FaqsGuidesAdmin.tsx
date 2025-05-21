'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus, Pencil, Trash2, Download, ExternalLink, HelpCircle, Book, RefreshCw, Upload } from "lucide-react";
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

interface GuideItem {
  id: string;
  icon: 'book' | 'refresh' | 'help';
  title: string;
  description: string;
  buttonType: 'download' | 'view' | 'faq';
  buttonText: string;
  fileUrl?: string;
}

export default function FaqsGuidesAdmin() {
  const [guides, setGuides] = useState<GuideItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [editingGuide, setEditingGuide] = useState<GuideItem | null>(null);
  const [newGuide, setNewGuide] = useState<Partial<GuideItem>>({
    icon: 'book',
    buttonType: 'download'
  });
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    fetchGuides();
  }, []);

  const fetchGuides = async () => {
    try {
      const response = await fetch('/api/guides');
      if (!response.ok) throw new Error('Failed to fetch guides');
      const data = await response.json();
      setGuides(data);
    } catch (error) {
      console.error('Error fetching guides:', error);
      toast.error('Failed to load guides');
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
      formData.append('category', 'guides');
      formData.append('title', selectedFile.name);
      formData.append('description', 'Guide document');

      const response = await fetch('/api/resources/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) throw new Error('Upload failed');

      const data = await response.json();
      return data.filename;
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
      return null;
    } finally {
      setUploading(false);
    }
  };

  const handleAddGuide = async () => {
    if (newGuide.title && newGuide.description && newGuide.buttonText) {
      try {
        let fileUrl = null;
        
        if (newGuide.buttonType === 'download' && selectedFile) {
          fileUrl = await handleFileUpload();
          if (!fileUrl) return;
        }

        const requestBody = {
          icon: newGuide.icon,
          title: newGuide.title,
          description: newGuide.description,
          buttonType: newGuide.buttonType,
          buttonText: newGuide.buttonText,
          fileUrl
        };
        console.log('Sending request with body:', requestBody);

        const response = await fetch('/api/guides', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(requestBody),
        });

        if (!response.ok) {
          const errorData = await response.json();
          console.error('Error response:', errorData);
          throw new Error(errorData.details || 'Failed to create guide');
        }

        const data = await response.json();
        setGuides(prev => [...prev, data]);
        setNewGuide({ icon: 'book', buttonType: 'download' });
        setSelectedFile(null);
        setIsAddDialogOpen(false);
        toast.success('Guide created successfully');
      } catch (error) {
        console.error('Error creating guide:', error);
        toast.error('Failed to create guide');
      }
    }
  };

  const handleEditGuide = async () => {
    if (editingGuide) {
      try {
        let fileUrl = editingGuide.fileUrl;
        
        if (editingGuide.buttonType === 'download' && selectedFile) {
          fileUrl = await handleFileUpload();
          if (!fileUrl) return;
        }

        const response = await fetch(`/api/guides/${editingGuide.id}`, {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            icon: editingGuide.icon,
            title: editingGuide.title,
            description: editingGuide.description,
            buttonType: editingGuide.buttonType,
            buttonText: editingGuide.buttonText,
            fileUrl
          }),
        });

        if (!response.ok) throw new Error('Failed to update guide');

        const data = await response.json();
        setGuides(prev => prev.map(guide => 
          guide.id === editingGuide.id ? data : guide
        ));
        setIsEditDialogOpen(false);
        setEditingGuide(null);
        setSelectedFile(null);
        toast.success('Guide updated successfully');
      } catch (error) {
        console.error('Error updating guide:', error);
        toast.error('Failed to update guide');
      }
    }
  };

  const handleDeleteGuide = async (id: string) => {
    try {
      const response = await fetch(`/api/guides/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete guide');

      setGuides(prev => prev.filter(guide => guide.id !== id));
      toast.success('Guide deleted successfully');
    } catch (error) {
      console.error('Error deleting guide:', error);
      toast.error('Failed to delete guide');
    }
  };

  const handleDownload = async (fileUrl: string, title: string) => {
    try {
      const response = await fetch(
        `/api/download?fileUrl=${encodeURIComponent(fileUrl)}&downloadAs=${encodeURIComponent(fileUrl)}`,
        {
          credentials: 'include',
        }
      );

      if (!response.ok) {
        throw new Error('Failed to download file');
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = title;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error('Error downloading file:', error);
      toast.error('Failed to download file');
    }
  };

  const getIconComponent = (icon: string) => {
    switch (icon) {
      case 'book':
        return <Book className="h-6 w-6 text-estates-primary" />;
      case 'refresh':
        return <RefreshCw className="h-6 w-6 text-estates-primary" />;
      case 'help':
        return <HelpCircle className="h-6 w-6 text-estates-primary" />;
      default:
        return <Book className="h-6 w-6 text-estates-primary" />;
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
        <CardTitle>FAQs & Guides</CardTitle>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Guide
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Guide</DialogTitle>
            </DialogHeader>
            <div className="space-y-4 py-4">
              <div className="space-y-2">
                <label>Icon</label>
                <Select
                  value={newGuide.icon}
                  onValueChange={(value) => setNewGuide({ ...newGuide, icon: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select icon" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="book">Book</SelectItem>
                    <SelectItem value="refresh">Refresh</SelectItem>
                    <SelectItem value="help">Help</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <label>Title</label>
                <Input
                  value={newGuide.title || ''}
                  onChange={(e) => setNewGuide({ ...newGuide, title: e.target.value })}
                  placeholder="Enter title"
                />
              </div>
              <div className="space-y-2">
                <label>Description</label>
                <Textarea
                  value={newGuide.description || ''}
                  onChange={(e) => setNewGuide({ ...newGuide, description: e.target.value })}
                  placeholder="Enter description"
                />
              </div>
              <div className="space-y-2">
                <label>Button Type</label>
                <Select
                  value={newGuide.buttonType}
                  onValueChange={(value) => setNewGuide({ ...newGuide, buttonType: value as any })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select button type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="download">Download</SelectItem>
                    <SelectItem value="view">View</SelectItem>
                    <SelectItem value="faq">FAQ</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              {newGuide.buttonType === 'download' && (
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
              )}
              <div className="space-y-2">
                <label>Button Text</label>
                <Input
                  value={newGuide.buttonText || ''}
                  onChange={(e) => setNewGuide({ ...newGuide, buttonText: e.target.value })}
                  placeholder="Enter button text"
                />
              </div>
              <Button 
                onClick={handleAddGuide} 
                className="w-full"
                disabled={uploading || (newGuide.buttonType === 'download' && !selectedFile)}
              >
                {uploading ? 'Uploading...' : 'Add Guide'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {guides.map((guide) => (
            <div key={guide.id} className="bg-white rounded-xl shadow-md p-6 border border-gray-100">
              <div className="flex justify-between items-start mb-4">
                <div className="flex items-center">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-3">
                    {getIconComponent(guide.icon)}
                  </div>
                  <h3 className="font-bold text-lg">{guide.title}</h3>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingGuide(guide);
                      setIsEditDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteGuide(guide.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-600 text-sm mb-5">{guide.description}</p>
              <Button 
                variant="outline" 
                className="w-full flex items-center justify-center gap-2 hover:bg-estates-primary hover:text-white"
                onClick={() => {
                  if (guide.buttonType === 'download' && guide.fileUrl) {
                    handleDownload(guide.fileUrl, guide.title);
                  }
                }}
              >
                {guide.buttonType === 'download' ? (
                  <Download className="w-4 h-4" />
                ) : (
                  <ExternalLink className="w-4 h-4" />
                )}
                {guide.buttonText}
              </Button>
            </div>
          ))}
        </div>

        <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Guide</DialogTitle>
            </DialogHeader>
            {editingGuide && (
              <div className="space-y-4 py-4">
                <div className="space-y-2">
                  <label>Icon</label>
                  <Select
                    value={editingGuide.icon}
                    onValueChange={(value) => setEditingGuide({ ...editingGuide, icon: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select icon" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="book">Book</SelectItem>
                      <SelectItem value="refresh">Refresh</SelectItem>
                      <SelectItem value="help">Help</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <label>Title</label>
                  <Input
                    value={editingGuide.title}
                    onChange={(e) => setEditingGuide({ ...editingGuide, title: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label>Description</label>
                  <Textarea
                    value={editingGuide.description}
                    onChange={(e) => setEditingGuide({ ...editingGuide, description: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <label>Button Type</label>
                  <Select
                    value={editingGuide.buttonType}
                    onValueChange={(value) => setEditingGuide({ ...editingGuide, buttonType: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select button type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="download">Download</SelectItem>
                      <SelectItem value="view">View</SelectItem>
                      <SelectItem value="faq">FAQ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                {editingGuide.buttonType === 'download' && (
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
                    {editingGuide.fileUrl && !selectedFile && (
                      <p className="text-sm text-gray-500">
                        Current file: {editingGuide.fileUrl.split('/').pop()}
                      </p>
                    )}
                  </div>
                )}
                <div className="space-y-2">
                  <label>Button Text</label>
                  <Input
                    value={editingGuide.buttonText}
                    onChange={(e) => setEditingGuide({ ...editingGuide, buttonText: e.target.value })}
                  />
                </div>
                <Button 
                  onClick={handleEditGuide} 
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