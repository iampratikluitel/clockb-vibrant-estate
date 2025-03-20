"use client";

import { Brochure } from "@/lib/types";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { useAdminAddUpdateConfigurationBrochureMutation } from "@/store/api/Admin/adminConfiguration";

// Zod Schema (Excluding file validation here since we handle it separately)
const FormSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

interface Props {
  ConfigData: any | undefined;
}

const BrochureConfigForm = ({ ConfigData }: Props) => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  // Mutation Hook for API Call
  const [addOrUpdateBrochure] = useAdminAddUpdateConfigurationBrochureMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: ConfigData?.description ?? "",
    },
  });

  // Handle File Selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Only PDF files are allowed.");
    }
  };

  // Handle Form Submission
  const handleSubmit = async (data: z.infer<typeof FormSchema>) => {
    if (!file) {
      toast.error("Please upload a PDF file.");
      return;
    }

    setIsSubmitting(true);

    try {
      const formData = new FormData();
      formData.append("description", data.description);
      formData.append("brochure", file);

      if (ConfigData?._id) {
        formData.append("_id", ConfigData._id);
      }

      // Use API Mutation Hook
      const response = await addOrUpdateBrochure(formData).unwrap();

      toast.success(response.message || "Configuration updated successfully.");
      router.push("/admin/Configuration");
    } catch (error) {
      toast.error("Failed to update configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="w-full space-y-6 p-4 bg-white">
        <h1 className="font-semibold text-2xl">Download Brochure</h1>

        {/* File Upload */}
        <div>
          <label className="block font-medium mb-2">Upload Brochure (PDF)</label>
          <input type="file" accept="application/pdf" onChange={handleFileChange} />
          {file && <p className="mt-2 text-sm">Selected file: {file.name}</p>}
        </div>

        {/* Submit Button */}
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
      </form>
    </Form>
  );
};

export default BrochureConfigForm;
