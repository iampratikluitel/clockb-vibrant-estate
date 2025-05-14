"use client"

import { useEffect, useState } from "react";
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
import { uploadToMinIO } from "@/lib/helper";
import { useAdminAddUpdateInvestmentCircleMutation } from "@/store/api/Admin/adminAboutPage";

interface Props {
  ExistingDetail?: any;
}

const FormSchema = z.object({
  name: z.string().min(1, "Title is required"),
  description: z.string().min(1, "Subtitle is required"),
  logo: z.any(),
  points: z.array(z.string()).min(1, "At least one point is required"),
});

export default function InvestmentCircleForm({ ExistingDetail }: Props) {
  const [loading, setLoading] = useState(false);

  const [AdminInvestmentCircle] = useAdminAddUpdateInvestmentCircleMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ExistingDetail?.name ?? "",
      description: ExistingDetail?.description ?? "",
      logo: ExistingDetail?.logo
        ? `/api/resources/download?filename=${encodeURIComponent(
            ExistingDetail?.logo
          )}`
        : "",
      points: ExistingDetail?.points?.length > 0 ? ExistingDetail.points : [""],
    },
  });

  useEffect(() => {
    if (ExistingDetail) {
      form.reset({
        name: ExistingDetail.name || "",
        description: ExistingDetail.description || "",
        logo: ExistingDetail.logo
          ? `/api/resources/download?filename=${encodeURIComponent(
              ExistingDetail?.logo
            )}`
          : "",
        points:
          ExistingDetail?.points?.length > 0 ? ExistingDetail.points : [""],
      });
    }
  }, [ExistingDetail, form]);

  const { fields, append, remove } = useFieldArray({
    control: form.control,
    name: "points",
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);
    try {
      if (!data.logo || data.logo === "") {
        toast.error("No logo selected");
        setLoading(false);
        return;
      }

      let backgroundUrl = null;
      const currentLogoPath = ExistingDetail?.logo ?? "";
      const isLogoUpdated =
        data.logo !==
        `/api/resources/download?filename=${encodeURIComponent(
          currentLogoPath
        )}`;

      if (isLogoUpdated) {
        backgroundUrl = await uploadToMinIO(data.logo, "InvestmentCircle");
        if (!backgroundUrl) {
          toast.error("Logo upload failed. Please try again.");
          setLoading(false);
          return;
        }
      }

      const formData = {
        _id: ExistingDetail?._id, // Include the _id field for updates
        name: data.name,
        description: data.description,
        logo: backgroundUrl ?? ExistingDetail?.logo,
        points: data.points.filter((point) => point.trim() !== ""), // Filter out empty points
      };

      const response = await AdminInvestmentCircle(formData).unwrap();
      if (response) {
        toast.success(response.message || "Changes saved successfully");
      } else {
        toast.error("Couldn't update configuration");
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save changes");
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
                          disabled={fields.length <= 1}
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
                  {form.formState.errors.points && (
                    <p className="text-sm font-medium text-destructive mt-1">
                      {form.formState.errors.points.message}
                    </p>
                  )}
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
