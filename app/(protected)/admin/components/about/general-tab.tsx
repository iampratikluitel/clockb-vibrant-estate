import { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, CardContent, CardFooter, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface FormData {
  title: string;
  description: string;
}

export default function GeneralTab() {
  const [issubmitting, setIsSubmitting] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>({
    defaultValues: {
      title: "About Project Estates",
      description: "Learn about the team and partners behind our visionary real estate development project",
    },
  });

  const handleGeneralSubmit = async (data: FormData) => {
    setIsSubmitting(true);

    try {
      const response = await fetch(`/api/admin/about/main-section`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data), 
      });

      if (response.ok) {
        alert("Content saved successfully!");
      } else {
        alert("Error saving content.");
      }
    } catch (error) {
      console.error(error);
      alert("Error saving content.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit(handleGeneralSubmit)} className="w-full space-y-6 p-4 bg-gray-100">
      <Card>
        <CardHeader>
          <CardTitle>About Page Content</CardTitle>
          <CardDescription>Edit the main content of your about page.</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Page Title</Label>
            <Input
              id="title"
              {...register("title", { required: "Title is required" })}
            />
            {errors.title && <span className="text-red-500">{errors.title.message}</span>}
          </div>
          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              {...register("description", { required: "Description is required" })}
              rows={5}
            />
            {errors.description && <span className="text-red-500">{errors.description.message}</span>}
          </div>
        </CardContent>
        <CardFooter>
          <Button type="submit" disabled={issubmitting}>
            {issubmitting ? "Saving..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
