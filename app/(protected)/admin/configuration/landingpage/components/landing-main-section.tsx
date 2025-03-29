"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { useForm } from "react-hook-form";
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

// Define a Zod schema for form validation
const FormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Subtitle is required"),
  backgroundImage: z.any(),
  card1name: z.string(),
  card1description: z.string(),
  card2name: z.string(),
  card2description: z.string(),
  card3name: z.string(),
  card3description: z.string(),
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
      backgroundImage: ConfigData?.backgroundImage
        ? `${MINIOURL}${ConfigData?.backgroundImage}`
        : "",
      card1name: ConfigData?.card1name ?? "",
      card1description: ConfigData?.card1description ?? "",
      card2name: ConfigData?.card2name ?? "",
      card2description: ConfigData?.card2description ?? "",
      card3name: ConfigData?.card3name ?? "",
      card3description: ConfigData?.card3description ?? "",
    },
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    console.log("Data", data);
    setIsSubmitting(true);
    try {
      setIsLoading(true);

      if (!data.backgroundImage || data.backgroundImage === "") {
        toast.error("No background image selected");
        return;
      }

      let backgroundUrl = null;

      if (data.backgroundImage != `${MINIOURL}${ConfigData?.backgroundImage}`) {
        backgroundUrl = await uploadToMinIO(
          data.backgroundImage,
          "landingpageConfig"
        );
        if (backgroundUrl === "") {
          toast.error("background upload failed Please try again");
          return;
        }
      }

      const formData = {
        ...data,
        backgroundImage: backgroundUrl ?? ConfigData?.backgroundImage,
      };
      console.log("formData", formData);

      const response = await fetch(
        "/api/admin/configuration/landingpage/landing-first-section",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      console.log("response", response);

      const result = await response.json();

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Main-section updated successfully");
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
          <CardTitle className="text-2xl font-semibold m-4">
            Landing Page Configuration
          </CardTitle>
          <CardContent>
            <div className="flex w-full gap-2 items-center pb-12">
              <div className="w-2/3 space-y-2">
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
              </div>
              <div className="w-1/3 flex justify-end">
                <SCNSingleImagePicker
                  name="image"
                  variant="avatar"
                  schemaName="backgroundImage"
                />
              </div>
            </div>

            <div className="flex w-full gap-4">
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 1:</h1>
                  <FormField
                    control={form.control}
                    name="card1name"
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
                    name="card1description"
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
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 2:</h1>
                  <FormField
                    control={form.control}
                    name="card2name"
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
                    name="card2description"
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
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 3:</h1>
                  <FormField
                    control={form.control}
                    name="card3name"
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
                    name="card3description"
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
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-end justify-end pt-4">
          {/* {isLoading ? (
            <div className="loader"></div>
          ) : (
            <Button type="submit">Submit</Button>
          )} */}
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
