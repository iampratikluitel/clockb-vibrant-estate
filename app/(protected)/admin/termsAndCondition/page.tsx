"use client";

import React, { useState } from "react";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { TrashIcon } from "lucide-react";
import { z } from "zod";
import { toast } from "sonner";
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import { useRouter } from "next/navigation";

const FormSchema = z.object({
  name: z.string().min(2, { message: "Name Should be atleast 2 character" }),
  description: z
    .string()
    .min(10, { message: "Description should be atleast 10 words" }),
  icon: z.any(),
});

interface Props {
  ConfigData?: any | undefined;
}

const TermsAndCondition = ({ ConfigData }: Props) => {
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const [terms, setTerms] = useState([
    { title: "Term 1", content: "This is the first term.", icon: "" },
    { title: "Term 2", content: "This is the second term.", icon: "" },
  ]);

  // Add a new term
  const addNewTerm = () => {
    setTerms([...terms, { title: "", content: "", icon: "" }]);
  };

  // Update a specific term
  const updateTerm = (
    index: number,
    updatedTerm: { title: string; content: string; icon: string }
  ) => {
    setTerms((prev) =>
      prev.map((term, i) => (i === index ? updatedTerm : term))
    );
  };

  // Delete a specific term
  const deleteTerm = (index: number): void => {
    setTerms((prev) => prev.filter((_, i) => i !== index));
  };

  // Handle image change for the term icon
  const handleImageChange = (
    e: React.ChangeEvent<HTMLInputElement>,
    index: number
  ) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const iconUrl = reader.result as string;
        const updatedTerms = [...terms];
        updatedTerms[index].icon = iconUrl;
        setTerms(updatedTerms);
      };
      reader.readAsDataURL(file);
    }
  };

  async function onSubmit() {
    try {
      setLoading(true);
      
      // Validate all terms
      for (const term of terms) {
        if (!term.icon) {
          toast.error("Please upload an icon for each term.");
          return;
        }
      }

      const updatedTerms = await Promise.all(
        terms.map(async (term) => {
          // Upload the icon image to MinIO if it's new
          let iconUrl = term.icon;
          if (term.icon && !term.icon.startsWith(MINIOURL)) {
            const file = new File([term.icon], "icon.png", { type: "image/png" });
            iconUrl = await uploadToMinIO(file, "conditionuse");
            if (!iconUrl) {
              toast.error("Image upload failed. Please try again.");
              throw new Error("Image upload failed");
            }
          }
          return { ...term, icon: iconUrl };
        })
      );

      const formData = {
        terms: updatedTerms, // Sending all terms
        _id: ConfigData?._id,
      };

      const response = await fetch("/api/admin/termsAndCondition", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(`${responseData.message}`);
        setLoading(false);
        router.push("/admin/configuration");
      } else {
        toast.error(`Couldn't Update`);
        setLoading(false);
      }
    } catch (error) {
      toast.error(`Failed`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-semibold mb-4">Terms & Conditions</h1>

      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
        {terms.map((term, index) => (
          <Card key={index} className="shadow-md p-4 relative">
            <CardHeader>
              <div className="flex items-center space-x-2">
                {term.icon && (
                  <img
                    src={term.icon}
                    alt="Icon"
                    className="h-5 w-5 rounded-full"
                  />
                )}
                <h2 className="text-lg font-semibold">Card {index + 1}</h2>
              </div>
            </CardHeader>
            <CardContent>
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  const formData = new FormData(e.target as HTMLFormElement);
                  updateTerm(index, {
                    title: formData.get("title") as string,
                    content: formData.get("content") as string,
                    icon: term.icon,
                  });
                }}
                className="space-y-3"
              >
                <Input
                  type="text"
                  name="title"
                  defaultValue={term.title}
                  placeholder="Enter heading"
                  className="border rounded-md p-2"
                />
                <Textarea
                  name="content"
                  defaultValue={term.content}
                  placeholder="Enter description"
                  className="border rounded-md p-2"
                />
                <div className="flex justify-between">
                  <Button type="submit">Save Changes</Button>
                  <Button
                    type="button"
                    onClick={() => deleteTerm(index)}
                    className="bg-red-500 hover:bg-red-600 text-white"
                  >
                    <TrashIcon className="h-5 w-5" />
                    Delete
                  </Button>
                </div>
              </form>

              <div className="mt-4">
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  className="border rounded-md p-2"
                />
                {term.icon && (
                  <div className="mt-2">
                    <img
                      src={term.icon}
                      alt="Term Icon"
                      className="h-10 w-10 rounded-full"
                    />
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="flex justify-end items-end p-2">
        <Button onClick={addNewTerm}>Add Term</Button>
      </div>

      <div className="flex justify-end mt-4">
        <Button onClick={onSubmit} disabled={loading}>
          {loading ? "Submitting..." : "Submit Terms"}
        </Button>
      </div>
    </div>
  );
};

export default TermsAndCondition;
