"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm, useFieldArray } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";

const FormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Subtitle is required"),
  logo: z.any(),
  points: z.array(z.string()).min(1, "At least one point is required"), // Points field added
});

interface props {
  ConfigData: any | undefined;
}

export default function LandingMainConfig({ ConfigData }: props) {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // Use React Hook Form with Zod resolver for validation
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ConfigData?.name ?? "",
      description: ConfigData?.description ?? "",
      logo: ConfigData?.logo ? `${MINIOURL}${ConfigData?.logo}` : "",
      points: ConfigData?.points ?? [""], // Initialize with existing points or empty
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "points",
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data", data);
    setIsSubmitting(true);
    try {
      setIsLoading(true);

      if (!data.logo || data.logo === "") {
        toast.error("No background image selected");
        return;
      }

      let backgroundUrl = null;

      if (data.logo !== `${MINIOURL}${ConfigData?.logo}`) {
        backgroundUrl = await uploadToMinIO(data.logo, "InvestmentCircle");
        if (backgroundUrl === "") {
          toast.error("Background upload failed. Please try again.");
          return;
        }
      }

      const formData = {
        ...data,
        logo: backgroundUrl ?? ConfigData?.logo,
      };
      console.log("formData", formData);

      const response = await fetch("/api/admin/about/investment-circle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });
      console.log("response", response);

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Updated successfully");
    } catch (error) {
      toast.error("Failed to update");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardContent>
            <div className="flex w-full gap-2 items-center pb-12">
              <div className="w-2/3 space-y-2 pt-4">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input {...field} />
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
                        <Textarea {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                {/* Points Field */}
                <div className="mt-4">
                  <FormLabel>Points</FormLabel>
                  <div className="space-y-2">
                    {fields.map((item, index) => (
                      <div key={item.id} className="flex gap-2 items-center">
                        <FormControl>
                          <Input
                            {...form.register(`points.${index}`)}
                            className="w-full"
                          />
                        </FormControl>
                        <Button
                          type="button"
                          variant="destructive"
                          onClick={() => remove(index)}
                        >
                          ✕
                        </Button>
                      </div>
                    ))}
                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => append("")}
                      className="mt-2"
                    >
                      Add Point
                    </Button>
                  </div>
                  <FormMessage />
                </div>
              </div>

              <div className="w-1/3 flex justify-end">
                <SCNSingleImagePicker
                  name=""
                  variant="avatar"
                  schemaName="logo"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-end justify-end pt-4">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
