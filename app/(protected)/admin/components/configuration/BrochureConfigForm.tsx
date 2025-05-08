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
        ? `/api/resources/download?filename=${encodeURIComponent(
            ConfigData.brochure
          )}`
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
    <div className="flex justify-center items-center min-h-screen bg-gray-50 px-4 py-4">
      <div className="bg-white p-8 rounded-2xl shadow-xl w-full max-w-lg space-y-6">
        <h2 className="text-3xl font-bold text-center text-gray-800">
          PDF Brochure Manager
        </h2>

        {/* File Input */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Upload Brochure (PDF Only)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
            className="block w-full border border-gray-300 rounded-lg px-4 py-2 text-sm shadow-sm file:border-0 file:bg-blue-100 file:text-blue-700 focus:ring-2 focus:ring-blue-500 focus:outline-none"
          />
        </div>

        {/* Existing Brochure Link */}
        {ConfigData?.brochure && (
          <div className="text-center">
            <a
              href={`/api/resources/download?filename=${encodeURIComponent(
                ConfigData.brochure
              )}`}
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-600 hover:underline text-sm"
            >
              📄 Download Current Brochure
            </a>
          </div>
        )}

        {/* Upload Button */}
        <button
          onClick={form.handleSubmit(onSubmit)}
          disabled={loading}
          className="w-full bg-blue-600 text-white py-2.5 rounded-lg text-base font-semibold hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading
            ? "Uploading..."
            : existingId
            ? "Update Brochure"
            : "Upload Brochure"}
        </button>

        {/* Delete Button */}
        {existingId && (
          <button
            onClick={handleDelete}
            disabled={loading}
            className="w-full bg-red-500 text-white py-2.5 rounded-lg text-base font-semibold hover:bg-red-600 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? "Deleting..." : "Delete Brochure"}
          </button>
        )}
      </div>
    </div>
  );
}