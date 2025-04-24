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
import { NewsSchema } from "./newsSchema";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import { MINIOURL } from "@/lib/constants";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import AddNewsCategory from "./newsCategory";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { uploadToMinIO } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { ApiResponse, NewsInsight } from "@/lib/types";
import { useAdminAddUpdateNewsInsightMutation } from "@/store/api/Admin/adminNewsInsight";
import { paths } from "@/lib/paths";

interface Props {
  type: "Add" | "Edit";
  ExistingDetail?: NewsInsight;
}

export default function AddNewsForm({ type, ExistingDetail }: Props) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [AdminNewsInsight] = useAdminAddUpdateNewsInsightMutation();

  const form = useForm<z.infer<typeof NewsSchema>>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: ExistingDetail?.title ?? "",
      description: ExistingDetail?.description ?? "",
      categoryId: ExistingDetail?.categoryId ?? "",
      addedDate: ExistingDetail?.addedDate
        ? new Date(ExistingDetail.addedDate)
        : undefined,
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail.image}`
        : null,
      overview: ExistingDetail?.overview ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof NewsSchema>) => {
    try {
      if (type === "Add") {
        setLoading(true);
        if (!data.image) {
          toast.error("Please Select Image");
        }

        let uploadedFileName;
        if (data.image) {
          uploadedFileName = await uploadToMinIO(data.image, "news");
          if (uploadedFileName === "") {
            toast.error("Please insert an Image First");
          }
        }

        const formData = {
          ...data,
          image: uploadedFileName || "",
        };

        const response = await AdminNewsInsight({
          ...formData,
        }).unwrap();

        if (response) {
          const responseData = response as ApiResponse;
          toast.success(responseData.message);
          router.push(`${paths.admin.news}`);
          setLoading(false);
        } else {
          toast.error("Could not Add");
          setLoading(false);
        }
      } else if (type === "Edit") {
        let ImageUrl = null;

        if (data.image != `${MINIOURL}${ExistingDetail?.image}`) {
          ImageUrl = await uploadToMinIO(data.image, "news");
          if (ImageUrl === "") {
            toast.error("Image upload Failed Please try again");
            return;
          }
        }
        const formData = {
          ...data,
          image: ImageUrl ?? ExistingDetail?.image,
        };

        const response = await AdminNewsInsight({
          ...formData,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
          router.push(`${paths.admin.news}`);
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
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add News Category</DialogTitle>
          </DialogHeader>
          <AddNewsCategory type={type} setIsOpen={setIsOpen} />
        </DialogContent>
      </Dialog>

      <div className="w-full max-w mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">{type} News</h1>
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
                        <Input placeholder="Enter News Title" {...field} />
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
                          placeholder="Enter News Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="addedDate"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Publish Date</FormLabel>
                      <FormControl>
                        <Input
                          type="date"
                          value={
                            field.value
                              ? new Date(field.value)
                                  .toISOString()
                                  .split("T")[0]
                              : ""
                          }
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
                        name="News Image"
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
