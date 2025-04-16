"use client";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { zodResolver } from "@hookform/resolvers/zod";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";

// 📝 Define Zod Schema
const NewsCatSchema = z.object({
  name: z.string().min(1, "Category name is required"),
  icon: z.any(), // Can add validation for images if needed
});

interface AddNewsCategoryProps {
  type: string;
  setIsOpen: (isOpen: boolean) => void;
}

const AddNewsCategory: React.FC<AddNewsCategoryProps> = ({ type, setIsOpen }) => {
  // 🔄 Loading state
  const [isLoading, setIsLoading] = useState(false);

  // 🎯 Initialize React Hook Form
  const form = useForm({
    resolver: zodResolver(NewsCatSchema),
    defaultValues: {
      name: "",
      icon: null,
    },
  });

  const onSubmit = async (data: z.infer<typeof NewsCatSchema>) => {
    try {
      setIsLoading(true);
      console.log("Submitting:", data);

      // Simulate API call (replace with actual API request)
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("News category added successfully!");
      setIsOpen(false); // Close modal or popup
    } catch (error) {
      console.log(error)
      toast.error("Failed to add category.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col gap-4 p-4 bg-white rounded-lg shadow-md">
      <h2 className="text-xl font-semibold">{type} News Category</h2>

      {/* Form Wrapper */}
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          {/* 📌 Category Title Field */}
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Category Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter category name" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 📌 Category Icon Picker */}
          <FormField
            control={form.control}
            name="icon"
            render={() => (
              <FormItem>
                <FormLabel>Category Icon</FormLabel>
                <FormControl>
                  <SCNSingleImagePicker
                    name="Category Icon"
                    variant="imageBox"
                    schemaName="icon"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* 🔘 Submit Button */}
          <div className="flex justify-end">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default AddNewsCategory;
