"use client";

import type React from "react";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "sonner";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { Button } from "@/components/ui/button";

const FormSchema = z.object({
  card1icon: z.any(),
  card2icon: z.any(),
  card3icon: z.any(),

  card1name: z.string().min(2, {
    message: "Name must be at least 2 character",
  }),
  card2name: z.string().min(2, {
    message: "Name must be at least 2 character",
  }),
  card3name: z.string().min(2, {
    message: "Name must be at least 2 character",
  }),

  card1description: z.string().min(2, {
    message: "Description must be at least 2 character",
  }),
  card2description: z.string().min(2, {
    message: "Description must be at least 2 character",
  }),
  card3description: z.string().min(2, {
    message: "Description must be at least 2 character",
  }),
});

interface props {
  ConfigData: any | undefined;
}

export default function KeyHighlightsEditor({ ConfigData }: props) {
  const [Loading, setLoading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      card1icon: ConfigData?.card1icon
        ? `${MINIOURL}${ConfigData?.card1icon}`
        : null,
      card2icon: ConfigData?.card2icon
        ? `${MINIOURL}${ConfigData?.card2icon}`
        : null,
      card3icon: ConfigData?.card3icon
        ? `${MINIOURL}${ConfigData?.card3icon}`
        : null,

      card1name: ConfigData?.card1name ?? "",
      card2name: ConfigData?.card2name ?? "",
      card3name: ConfigData?.card3name ?? "",

      card1description: ConfigData?.card1description ?? "",
      card2description: ConfigData?.card2description ?? "",
      card3description: ConfigData?.card3description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setIsSubmitting(true);

    try {
      setLoading(true);

      let ImageUrl1 = null;
      let ImageUrl2 = null;
      let ImageUrl3 = null;

      if (data.card1icon != `${MINIOURL}${ConfigData?.card1icon}`) {
        ImageUrl1 = await uploadToMinIO(data.card1icon, "landingpageConfig");
        if (ImageUrl1 === "") {
          toast.error("Icon 4 upload failed Please try again");
          return;
        }
      }

      if (data.card2icon != `${MINIOURL}${ConfigData?.card2icon}`) {
        ImageUrl2 = await uploadToMinIO(data.card2icon, "landingpageConfig");
        if (ImageUrl2 === "") {
          toast.error("Icon 4 upload failed Please try again");
          return;
        }
      }

      if (data.card3icon != `${MINIOURL}${ConfigData?.card3icon}`) {
        ImageUrl3 = await uploadToMinIO(data.card3icon, "landingpageConfig");
        if (ImageUrl3 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      const formData = {
        ...data,
        card1icon: ImageUrl1 ?? ConfigData?.card1icon,
        card2icon: ImageUrl2 ?? ConfigData?.card2icon,
        card3icon: ImageUrl3 ?? ConfigData?.card3icon,
      };

      const response = await fetch(
        `/api/admin/investor-relations/key-highlight`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Configuration updated successfully.");
    } catch (error) {
      toast.error("Failed to update configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardTitle className="text-2xl font-semibold m-4">
            Key HIghlights
          </CardTitle>
          <CardContent>
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
                  <SCNSingleImagePicker
                    name="Icon"
                    variant="avatar"
                    schemaName="card1icon"
                  ></SCNSingleImagePicker>
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
                  <SCNSingleImagePicker
                    name="Icon"
                    variant="avatar"
                    schemaName="card2icon"
                  ></SCNSingleImagePicker>
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
                  <SCNSingleImagePicker
                    name="Icon"
                    variant="avatar"
                    schemaName="card3icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-end justify-end pt-4">
          {Loading ? (
            <div className="loader"></div>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
}
