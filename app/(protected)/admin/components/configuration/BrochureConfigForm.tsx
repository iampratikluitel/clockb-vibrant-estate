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

const FormSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  brochure: z.instanceof(File, {
    message: "A PDF file is required.",
  }),
});

interface Props {
  ConfigData: Brochure | undefined;
}

const BrochureConfigForm = ({ ConfigData }: Props) => {
  const [loading, setLoading] = useState(false);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: ConfigData?.description ?? "",
    },
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    if (selectedFile && selectedFile.type === "application/pdf") {
      setFile(selectedFile);
    } else {
      toast.error("Only PDF files are allowed.");
    }
  };

  return (
    <Form {...form}>
      <form className="w-full space-y-6 p-4 bg-white">
        <h1 className="font-semibold text-2xl">Download Brochure</h1>
        <div>
          <label className="block font-medium mb-2">
            Upload Brochure (PDF)
          </label>
          <input
            type="file"
            accept="application/pdf"
            onChange={handleFileChange}
          />
          {file && <p className="mt-2 text-sm">Selected file: {file.name}</p>}
        </div>

        {loading ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
};

export default BrochureConfigForm;
