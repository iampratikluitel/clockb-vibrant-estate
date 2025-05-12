"use client";

import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { useAdminAddUpdateAboutHeroMutation } from "@/store/api/Admin/adminAboutPage";

interface Props {
  ExistingDetail?: any;
}

const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Description is required"),
});

export default function AboutForm({ ExistingDetail }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [AdminHeroPage] = useAdminAddUpdateAboutHeroMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: ExistingDetail?.title || "",
      description: ExistingDetail?.description || "",
    },
  });

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        title: ExistingDetail.title || "",
        description: ExistingDetail.description || "",
      });
    }
  }, [ExistingDetail, form]);

  const onSubmit = async (data: z.infer<typeof formSchema>) => {
    setIsSubmitting(true);
    try {
      const formData = {
        ...data,
        _id: ExistingDetail?._id,
      };

      const response = await AdminHeroPage(formData).unwrap();
      if (response) {
        toast.success(response.message || "Changes saved successfully");
      } else {
        toast.error("Couldn't update configuration");
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card className="w-full max-w-3xl mx-auto p-2">
      <CardHeader>
        <CardTitle className="text-xl font-bold">Edit Main Section</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <CardContent className="space-y-5">
          <div className="grid gap-2">
            <Label htmlFor="title" className="font-medium">Title</Label>
            <Input
              id="title"
              placeholder="Enter title"
              {...form.register("title")}
            />
            {form.formState.errors.title && (
              <p className="text-sm text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="grid gap-2">
            <Label htmlFor="description" className="font-medium">Description</Label>
            <Textarea
              id="description"
              placeholder="Enter description"
              rows={6}
              {...form.register("description")}
            />
            {form.formState.errors.description && (
              <p className="text-sm text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
