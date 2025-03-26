"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";

// Define a Zod schema for form validation
const formSchema = z.object({
  title: z.string().min(1, "Title is required"),
  subTitle: z.string().min(1, "Subtitle is required"),
  description: z.string().min(1, "Description is required"),
});

type FormData = z.infer<typeof formSchema>;

interface Props {
  formData: FormData | undefined;
}

export default function MainSectionEditor({ formData }: Props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use React Hook Form with Zod resolver for validation
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: formData?.title ?? "",
      subTitle: formData?.subTitle ?? "",
      description: formData?.description ?? "",
    },
  });

  // Handle form submission
  async function handleSubmit(data: FormData) {
    setIsSubmitting(true);
    try {
      const response = await fetch(
        `/api/admin/investor-relations/main-section`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(data),
        }
      );
      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Main-section updated successfully");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Main Section</CardTitle>
      </CardHeader>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              {...form.register("title")}
              placeholder="Enter title"
            />
            {form.formState.errors.title && (
              <p className="text-red-500">
                {form.formState.errors.title.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="subtitle">Subtitle</Label>
            <Input
              id="subtitle"
              {...form.register("subTitle")}
              placeholder="Enter subtitle"
            />
            {form.formState.errors.subTitle && (
              <p className="text-red-500">
                {form.formState.errors.subTitle.message}
              </p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...form.register("description")}
              placeholder="Enter description"
              rows={5}
            />
            {form.formState.errors.description && (
              <p className="text-red-500">
                {form.formState.errors.description.message}
              </p>
            )}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={isLoading || isSubmitting}>
            {isLoading || isSubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
}
