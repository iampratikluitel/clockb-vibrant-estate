"use client";

import type React from "react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent } from "@/components/ui/card";
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
import { useAdminAddUpdateInvestmentCircleMutation } from "@/store/api/Admin/adminAboutPage";

interface InvestmentCircleData {
  name?: string;
  description?: string;
  logo?: string;
  points?: string[];
}

interface Props {
  investmentCircleData?: InvestmentCircleData;
}

const FormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Subtitle is required"),
  logo: z.any(),
  points: z.array(z.string()).min(1, "At least one point is required"),
});

export default function InvestmentCircle({ investmentCircleData }: Props) {
  const [loading, setLoading] = useState(false);

  const [AdminInvestmentCircle] = useAdminAddUpdateInvestmentCircleMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: investmentCircleData?.name ?? "",
      description: investmentCircleData?.description ?? "",
      logo: investmentCircleData?.logo
        ? `/api/resources/download?filename=${encodeURIComponent(investmentCircleData?.logo)}`
        : "",
      points: investmentCircleData?.points ?? [""],
    },
  });

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "points",
  });

  // Handle form submission
  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      setLoading(true);

      if (!data.logo || data.logo === "") {
        toast.error("No background image selected");
        return;
      }

      let backgroundUrl = null;

      if (data.logo !== `/api/resources/download?filename=${encodeURIComponent(investmentCircleData?.logo ?? "")}`) {
        backgroundUrl = await uploadToMinIO(data.logo, "InvestmentCircle");
        if (backgroundUrl === "") {
          toast.error("Background upload failed. Please try again.");
          return;
        }
      }

      const formData = {
        ...data,
        logo: backgroundUrl ?? investmentCircleData?.logo,
      };

      const response = await AdminInvestmentCircle({
        ...formData,
      }).unwrap();

      toast.success("Updated successfully");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update");
    } finally {
      setLoading(false);
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
                  name="logo"
                  variant="avatar"
                  schemaName="logo"
                />
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-end justify-end pt-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Submitting..." : "Submit"}
          </Button>
        </div>
      </form>
    </Form>
  );
}
