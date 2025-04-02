"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import { MINIOURL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { uploadToMinIO } from "@/lib/helper";

const ProjectSchema = z.object({
  title: z.string().min(2, { message: "Title should be at least 2 word" }),
  description: z
    .string()
    .min(2, { message: "Title should be at least 2 word" }),
  image: z.any(),
  addedDate: z.date().optional(),
  overview: z.string().min(10, {
    message: "Overview must be at least 10 characters.",
  }),
});

interface Props {
  type: "Add" | "Edit";
  ExistingDetail?: any;
  newsCategory: any[];
}

export default function AddProjectForm({ type, ExistingDetail }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: ExistingDetail?.name ?? "",
      description: ExistingDetail?.description ?? "",
      addedDate: ExistingDetail?.addedDate ?? "",
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail.image}`
        : null,
      overview: ExistingDetail?.overview ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
    console.log("data", data)
    try {
      setIsLoading(true);

      // Image validation
      if (!data.image) {
        toast.error("Please upload a project image.");
        return;
      }

      let ImageUrl = null;
      if (data.image !== `${MINIOURL}${ExistingDetail?.image}`) {
        console.log("Uploading new image...");
        ImageUrl = await uploadToMinIO(data.image, "projectImage");
        console.log("Uploaded Image URL:", ImageUrl);
        if (!ImageUrl) {
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }

      // Prepare the form data
      const formData = {
        _id: ExistingDetail?._id,
        ...data,
        image: ImageUrl ?? ExistingDetail?.image,
      };

      // Submit the data to the API
      const response = await fetch("/api/admin/project-description", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
              const responseData = await response.json();
              toast.success(`${responseData.message}`);
              setIsLoading(false);
              router.push("/admin/configuration");
            } else {
              toast.error(`Couldn't Update`);
              setIsLoading(false);
            }
          } catch (error) {
            toast.error(`Failed`);
            setIsLoading(false);
          } finally {
            setIsLoading(false);
          }
        }
      

  return (
    <>
      <div className="w-full max-w mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">{type} Projects</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Project Title" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="description"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <SCNSingleImagePicker
                        name="Project Image"
                        variant="imageBox"
                        schemaName="image"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="overview"
              render={() => (
                <FormItem>
                  <FormLabel>News Overview</FormLabel>
                  <ReactQuillEditor name="overview" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={isLoading}>
                {isLoading ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
