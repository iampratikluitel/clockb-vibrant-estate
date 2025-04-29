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
import { useAdminAddUpdateUpcommingProjectMutation } from "@/store/api/Admin/adminUpcommingProject";
import { paths } from "@/lib/paths";
import { ApiResponse, UPCOMMINGPROJECT } from "@/lib/types";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: UPCOMMINGPROJECT;
}

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

export default function AddProjectForm({ type, ExistingDetail }: props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const [AdminUpcommingProject] = useAdminAddUpdateUpcommingProjectMutation();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: ExistingDetail?.title ?? "",
      description: ExistingDetail?.description ?? "",
      addedDate: ExistingDetail?.addedDate
        ? new Date(ExistingDetail.addedDate)
        : undefined,
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail.image}`
        : null,
      overview: ExistingDetail?.overview ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
    try {
      if (type == "Add") {
        setLoading(true);
        if (!data.image) {
          toast.error("Please select Image");
          return;
        }

        let uploadedFileName;
        if (data.image) {
          uploadedFileName = await uploadToMinIO(data.image, "project");
          if (uploadedFileName === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          ...data,
          image: uploadedFileName || "",
        };

        const response = await AdminUpcommingProject({
          ...formData,
        }).unwrap();

        if (response) {
          const responseData = response as ApiResponse;
          toast.success(responseData.message);
          router.push(`${paths.admin.projectdescription}`);
          setLoading(false);
        } else {
          toast.error("Could not Add");
          setLoading(false);
        }
      } else if (type == "Edit") {
        setLoading(true);
        let ImageUrl = null;

        if (data.image != `${MINIOURL}${ExistingDetail?.image}`) {
          ImageUrl = await uploadToMinIO(data.image, "project");
          if (ImageUrl === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          _id: ExistingDetail?._id,
          ...data,
          image: ImageUrl ?? ExistingDetail?.image,
        };

        const response = await AdminUpcommingProject({
          ...formData,
          _id: ExistingDetail?._id || "",
          logo: formData.image || "",
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
          router.push(`${paths.admin.projectdescription}`);
        } else {
          toast.error(`Couldn't Edit`);
          setLoading(false);
        }
      }
    } catch (error) {
      toast.error(`Failed`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  };

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
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}
