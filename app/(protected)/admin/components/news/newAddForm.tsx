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
import React, { useEffect, useState } from "react";
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
import { NewsInsight } from "@/lib/types";

interface Props {
  type: "Add" | "Edit";
  ExistingDetail?: NewsInsight | null;
}

export default function AddNewsForm({
  type,
  ExistingDetail,
}: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (window.MutationObserver) {
      const originalObserve = window.MutationObserver.prototype.observe;
      window.MutationObserver.prototype.observe = function (target, options) {
        if (options?.attributes || options?.childList) {
          originalObserve.call(this, target, options);
        }
      };
    }
  }, []);

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
    console.log("data", data);
  
    try {
      setIsLoading(true);
      
      // Check if the image is missing
      if (!data.image) {
        toast.error("Please upload an image.");
        return;
      }
  
      let ImageUrl = null;
  
      // Upload the image only if it is different from the existing one
      if (data.image !== ExistingDetail?.image) {
        ImageUrl = await uploadToMinIO(data.image, "news");
        if (ImageUrl === "") {
          toast.error("Image upload failed. Please try again.");
          return;
        }
      }
  
      // Check if categoryId is present
      // if (!data.categoryId) {
      //   toast.error("Please select a category.");
      //   return;
      // }
  
      const formData = {
        _id: ExistingDetail?._id,
        ...data,
        image: ImageUrl ?? ExistingDetail?.image,
      };
  
      const response = await fetch("/api/admin/newsInsight", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
  
      const result = await response.json();
  
      if (!response.ok) {
        throw new Error(result.message || "Something went wrong");
      }
  
      toast.success(
        `News ${type === "Edit" ? "updated" : "added"} successfully`
      );
  
      form.reset();
  
      router.push("/admin/about");
  
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false);
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
                          onChange={(e) => {
                            const selectedDate = new Date(e.target.value);
                            field.onChange(selectedDate); // Store as Date object
                          }}
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
