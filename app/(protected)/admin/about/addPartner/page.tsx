"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { MINIOURL } from "@/lib/constants";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { uploadToMinIO } from "@/lib/helper";
import { useRouter } from "next/navigation";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: any;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must me at least 1 character.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 character",
  }),
  logo: z.any(),
});

export default function AddMember({ type, ExistingDetail }: props) {
  const [Loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ExistingDetail?.name ?? "",
      description: ExistingDetail?.description ?? "",
      logo: ExistingDetail?.logo ? `${MINIOURL}${ExistingDetail?.logo}` : null,
    },
  });

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    try {
      setLoading(true);
      if (!data.logo) {
        toast.error("logo data:", data.logo);
        return;
      }

      let logoUrl = null;
      if (data.logo != `${MINIOURL}${ExistingDetail?.logo}`) {
        logoUrl = await uploadToMinIO(data.logo, "Member");
        if (logoUrl === "") {
          toast.error("logo Upload Failed Please try again");
          return;
        }
      }
      const formData = {
        _id: ExistingDetail?._id,
        ...data,
        logo: logoUrl ?? ExistingDetail?.logo,
      };
      const response = await fetch("/api/admin/about/partner", {
        method: type === "Edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Something went wrong");

      toast.success(
        `Member ${type === "Edit" ? "updated" : "added"} successfully`
      );
      router.push("/admin/about");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-4 bg-white"
      >
        <h1 className="font-semibold ">Team Member</h1>
        <div className="flex w-full gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the name of the member"
                      {...field}
                    />
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
                    <Input
                      placeholder="Enter the description of the member"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SCNSingleImagePicker
              name="logo"
              variant="avatar"
              schemaName="logo"
            />
          </div>
        </div>
        {Loading ? (
          <div>
            <div className="loader"></div>
          </div>
        ) : (
          <Button type="submit">Submit</Button>
        )}
      </form>
    </Form>
  );
}
