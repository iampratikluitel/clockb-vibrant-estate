import { useState, useEffect } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { uploadToMinIO } from '@/lib/helper';

interface InvestorKit {
  _id?: string;
  title: string;
  description: string;
  fileUrl: string;
}

export default function InvestorKitAdmin() {
  const [investorKit, setInvestorKit] = useState<InvestorKit | null>(null);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchInvestorKit();
  }, []);

  const fetchInvestorKit = async () => {
    try {
      const response = await fetch('/api/admin/investor-kit');
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setInvestorKit(data);
          setTitle(data.title);
          setDescription(data.description);
        }
      }
    } catch (error) {
      console.error('Error fetching investor kit:', error);
      toast.error('Failed to fetch investor kit');
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      let fileUrl = investorKit?.fileUrl;

      if (file) {
        fileUrl = await uploadToMinIO(file, 'investor-kit');
        if (!fileUrl) {
          toast.error('Failed to upload file');
          return;
        }
      }

      const response = await fetch('/api/admin/investor-kit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          _id: investorKit?._id,
          title,
          description,
          fileUrl,
        }),
      });

      if (response.ok) {
        toast.success('Investor kit updated successfully');
        fetchInvestorKit();
      } else {
        toast.error('Failed to update investor kit');
      }
    } catch (error) {
      console.error('Error updating investor kit:', error);
      toast.error('Failed to update investor kit');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Investor Kit</h2>
        <p className="text-gray-500">Manage the investor kit document</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="title" className="block text-sm font-medium mb-1">
            Title
          </label>
          <Input
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-medium mb-1">
            Description
          </label>
          <Textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          />
        </div>

        <div>
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Document
          </label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          {investorKit?.fileUrl && !file && (
            <p className="text-sm text-gray-500 mt-1">
              Current file: {investorKit.fileUrl.split('/').pop()}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? 'Saving...' : 'Save Changes'}
        </Button>
      </form>
    </div>
  );
} 