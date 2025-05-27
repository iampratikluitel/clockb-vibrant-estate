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
        console.log("Fetched brochure:", data);
        if (data) {
          setBrochure(data);
          setTitle(data.title);
        }
      } else {
        console.log("Failed to fetch brochure, status:", response.status);
      }
    } catch (error) {
      console.error("Error fetching brochure:", error);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile) {
      console.log("File selected:", selectedFile.name);
      setFile(selectedFile);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    console.log("Submitting form...");

    try {
      let fileUrl = brochure?.fileUrl;

      if (file) {
        console.log("Uploading new file to MinIO...");
        fileUrl = await uploadToMinIO(file, "brochure");
        console.log("Uploaded file URL:", fileUrl);

        if (!fileUrl) {
          toast.error("Failed to upload file");
          return;
        }
      }

      if (!fileUrl) {
        console.log("No file URL available after upload");
        toast.error("Failed to upload file");
        setLoading(false);
        return;
      }

      console.log("Sending POST request to update brochure...");
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
        console.log("Brochure updated:", updated);
        toast.success("Brochure updated successfully");
        setBrochure(updated);
        setTitle(updated.title);
        setFile(null);
      } else {
        console.log("Failed to update brochure, status:", response.status);
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
    <div className="space-y-6 py-4">
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
            onChange={(e) => {
              console.log("Title changed:", e.target.value);
              setTitle(e.target.value);
            }}
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
