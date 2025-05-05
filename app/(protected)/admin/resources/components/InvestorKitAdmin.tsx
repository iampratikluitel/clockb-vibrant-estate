import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { Download, Upload } from "lucide-react";
import { MINIOURL } from '@/lib/constants';
import { uploadToMinIO } from '@/lib/helper';

interface InvestorKit {
  _id?: string;
  title: string;
  description: string;
  fileUrl: string;
}

export default function InvestorKitAdmin() {
  const [investorKit, setInvestorKit] = useState<InvestorKit | null>(null);
  const [loading, setLoading] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    fileUrl: ''
  });

  useEffect(() => {
    fetchInvestorKit();
  }, []);

  const fetchInvestorKit = async () => {
    try {
      const response = await fetch('/api/admin/configuration/investor-kit');
      if (response.ok) {
        const data = await response.json();
        setInvestorKit(data);
        setFormData({
          title: data?.title || '',
          description: data?.description || '',
          fileUrl: data?.fileUrl || ''
        });
      }
    } catch (error) {
      console.error('Error fetching investor kit:', error);
      toast.error('Failed to load investor kit');
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setUploading(true);
      const fileUrl = await uploadToMinIO(file, 'InvestorKit');
      if (fileUrl) {
        setFormData(prev => ({ ...prev, fileUrl }));
        toast.success('File uploaded successfully');
      }
    } catch (error) {
      console.error('Error uploading file:', error);
      toast.error('Failed to upload file');
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fileUrl) {
      toast.error('Please upload a file');
      return;
    }

    try {
      const response = await fetch('/api/admin/configuration/investor-kit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ...formData,
          _id: investorKit?._id
        }),
      });

      if (response.ok) {
        toast.success('Investor kit updated successfully');
        fetchInvestorKit();
      } else {
        throw new Error('Failed to update investor kit');
      }
    } catch (error) {
      console.error('Error updating investor kit:', error);
      toast.error('Failed to update investor kit');
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Investor Kit Configuration</h2>
        {investorKit?.fileUrl && (
          <Button
            variant="outline"
            onClick={() => window.open(`${MINIOURL}${investorKit.fileUrl}`, '_blank')}
          >
            <Download className="w-4 h-4 mr-2" />
            View Current Kit
          </Button>
        )}
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium mb-1">Title</label>
          <Input
            value={formData.title}
            onChange={(e) => setFormData(prev => ({ ...prev, title: e.target.value }))}
            placeholder="Enter title"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Description</label>
          <Textarea
            value={formData.description}
            onChange={(e) => setFormData(prev => ({ ...prev, description: e.target.value }))}
            placeholder="Enter description"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-1">Investor Kit File</label>
          <div className="flex items-center gap-4">
            <Input
              type="file"
              onChange={handleFileChange}
              accept=".pdf,.doc,.docx"
              disabled={uploading}
            />
            {uploading && <span>Uploading...</span>}
          </div>
        </div>

        <Button type="submit" disabled={uploading}>
          {investorKit ? 'Update Investor Kit' : 'Create Investor Kit'}
        </Button>
      </form>
    </div>
  );
} 