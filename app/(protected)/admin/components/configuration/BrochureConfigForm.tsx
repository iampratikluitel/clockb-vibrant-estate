import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import { Brochure } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  brochure: z.any(),
});

interface Props {
  ConfigData: Brochure | undefined;
}

export default function BrochureConfigForm({ ConfigData }: Props) {
  const [file, setFile] = useState<File | null>(null);
  const [existingId, setExistingId] = useState<string | undefined>(
    ConfigData?._id
  );
  const [loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brochure: ConfigData?.brochure
        ? `${MINIOURL}${ConfigData.brochure}`
        : null,
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Please select a valid PDF file");
    }
  };

  const handleDelete = async () => {
    if (!existingId) {
      toast.error("No brochure to delete.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(
        `/api/admin/configuration/brochure?id=${existingId}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Brochure deleted successfully");
        setExistingId(undefined);
        setFile(null);
        form.reset();
      } else {
        toast.error("Failed to delete brochure");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error deleting brochure");
    } finally {
      setLoading(false);
    }
  };

  const onSubmit = async () => {
    if (!file) {
      toast.error("Please select a PDF file");
      return;
    }

    try {
      setLoading(true);
      let fileUrl = await uploadToMinIO(file, "BrochureConfig");

      if (!fileUrl) {
        toast.error("File upload failed. Please try again.");
        return;
      }

      const payload = {
        brochure: fileUrl,
        _id: existingId,
      };

      const res = await fetch("/api/admin/configuration/brochure", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (res.ok) {
        const result = await res.json();
        toast.success(
          `Brochure ${existingId ? "updated" : "uploaded"} successfully`
        );
        setFile(null);
        form.reset();
      } else {
        toast.error("Failed to upload brochure");
      }
    } catch (err) {
      console.error(err);
      toast.error("Error uploading brochure");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">
          Upload PDF Brochure
        </h2>

        {/* File input */}
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />

        {/* If brochure already exists, show download link */}
        {ConfigData?.brochure && (
          <div className="mb-4">
            <a
              href={`${MINIOURL}${ConfigData.brochure}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 underline text-sm"
            >
              Download Current Brochure
            </a>
          </div>
        )}

        {/* Upload button */}
        <button
          onClick={form.handleSubmit(onSubmit)}
          disabled={loading}
          className="w-full bg-blue-500 text-white py-2 rounded-lg mt-2 hover:bg-blue-600 disabled:opacity-50"
        >
          {loading
            ? "Uploading..."
            : existingId
            ? "Update Brochure"
            : "Upload Brochure"}
        </button>

        {/* Delete button */}
        {existingId && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-500 text-white py-2 rounded-lg mt-4 hover:bg-red-600 disabled:opacity-50"
          >
            {loading ? "Deleting..." : "Delete Brochure"}
          </button>
        )}
      </div>
    </div>
  );
}
