import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { uploadToMinIO } from "@/lib/helper";

interface Brochure {
  _id?: string;
  title: string;
  fileUrl: string;
}

export default function BrochureAdmin() {
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchBrochure();
  }, []);

  const fetchBrochure = async () => {
    try {
      const response = await fetch("/api/admin/configuration/brochure");
      if (response.ok) {
        const data = await response.json();
        if (data) {
          setBrochure(data);
          setTitle(data.title);
        }
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
      toast.error("Failed to fetch brochure");
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
      let fileUrl = brochure?.fileUrl;

      if (file) {
        fileUrl = await uploadToMinIO(file, "brochure");
        console.log("uploaded", fileUrl)
        if (!fileUrl) {
          toast.error("Failed to upload file");
          return;
        }
      }

      const response = await fetch("/api/admin/configuration/brochure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          _id: brochure?._id,
          title,
          fileUrl,
        }),
      });

      if (response.ok) {
        const updated = await response.json();
        toast.success("Brochure updated successfully");
        setBrochure(updated);
        setTitle(updated.title);
        setFile(null);
      } else {
        toast.error("Failed to update brochure");
      }
    } catch (error) {
      console.error("Error updating brochure:", error);
      toast.error("Failed to update brochure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Brochure</h2>
        <p className="text-gray-500">Manage the Brochure document</p>
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
          <label htmlFor="file" className="block text-sm font-medium mb-1">
            Document
          </label>
          <Input
            id="file"
            type="file"
            onChange={handleFileChange}
            accept=".pdf,.doc,.docx"
          />
          {brochure?.fileUrl && !file && (
            <p className="text-sm text-gray-500 mt-1">
              Current file: {brochure.fileUrl.split("/").pop()}
            </p>
          )}
        </div>

        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save Changes"}
        </Button>
      </form>
    </div>
  );
}
