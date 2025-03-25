import { MINIOURL } from '@/lib/constants';
import { uploadToMinIO } from '@/lib/helper';
import { Brochure } from '@/lib/types';
import { zodResolver } from '@hookform/resolvers/zod';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { z } from 'zod';

const FormSchema = z.object({
  brochure: z.any(),
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(2, {
    message: "Description must be at least 2 characters.",
  }),
});

interface Props {
  ConfigData: Brochure | undefined;
}

export default function BrochureConfigForm({ ConfigData }: Props) {
  const [file, setFile] = useState<File | null>(null);
  
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      brochure: ConfigData?.brochure ? `${MINIOURL}${ConfigData?.brochure}` : null,
      name: ConfigData?.name ?? "",
      description: ConfigData?.description ?? "",
    }
  });

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files && event.target.files[0];
    if (selectedFile && selectedFile.type === 'application/pdf') {
      setFile(selectedFile);
    } else {
      alert('Please select a valid PDF file');
    }
  };

  const handleSubmit = async () => {
    try {
      if (!file) {
        toast.error("Please select a file");
        return;
      }
  
      let fileUrl = null;
  
      if (file.name !== ConfigData?.brochure?.split("/").pop()) {
        fileUrl = await uploadToMinIO(file, "BrochureConfig");
  
        if (!fileUrl) {
          toast.error("File upload failed. Please try again.");
          return;
        }
      } else {
        fileUrl = ConfigData?.brochure;
      }
  
      const formData = {
        brochure: fileUrl,
        name: form.getValues().name,
        description: form.getValues().description,
      };
  
      const response = await fetch('/api/admin/configuration/brochure', {
        method: 'POST',
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
  
      if (response.ok) {
        toast.success('Brochure uploaded successfully!');
      } else {
        toast.error('Failed to upload brochure');
      }
    } catch (error) {
      console.error('Error uploading brochure:', error);
      toast.error('Error uploading brochure');
    }
  };
  

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center text-gray-700 mb-6">Upload PDF File</h2>
        <input
          type="file"
          accept="application/pdf"
          onChange={handleFileChange}
          className="block w-full text-sm text-gray-700 border border-gray-300 rounded-lg py-2 px-4 mb-4 focus:ring-2 focus:ring-blue-500 focus:outline-none"
        />
        {file && (
          <div className="mb-4">
            <p className="text-gray-700 font-medium">Selected file: <span className="font-bold">{file.name}</span></p>
            <button
              onClick={handleSubmit}
              className="w-full bg-blue-500 text-white py-2 rounded-lg mt-4 hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
            >
              Upload
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
