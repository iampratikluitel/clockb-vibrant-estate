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
import { paths } from "@/lib/paths";
import { ApiResponse, Partner } from "@/lib/types";
import { useAdminAddUpdatePartnerMutation } from "@/store/api/Admin/adminAboutPage";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: Partner;
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

export default function PartnerForm({ type, ExistingDetail }: props) {
  const [Loading, setLoading] = useState(false);
  const [AdminAddUpdatePartner] = useAdminAddUpdatePartnerMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ExistingDetail?.name ?? "",
      description: ExistingDetail?.description ?? "",
      logo: ExistingDetail?.logo ? `${MINIOURL}${ExistingDetail?.logo}` : null,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (type == "Add") {
        setLoading(true);
        if (!data.logo) {
          toast.error("Please select Image");
          return;
        }

        let uploadedFileName;
        if (data.logo) {
          uploadedFileName = await uploadToMinIO(data.logo, "partner");
          if (uploadedFileName === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          ...data,
          logo: uploadedFileName || "",
        };

        const response = await AdminAddUpdatePartner({
          ...formData,
        }).unwrap();
        if (response) {
          const responseData = response as ApiResponse;
          toast.success(responseData.message);
          router.push(`${paths.admin.about}`);
          setLoading(false);
        } else {
          toast.error(`Couldn't Add`);
          setLoading(false);
        }
      } else if (type == "Edit") {
        setLoading(true);
        let ImageUrl = null;

        if (data.logo != `${MINIOURL}${ExistingDetail?.logo}`) {
          ImageUrl = await uploadToMinIO(data.logo, "partner");
          if (ImageUrl === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          _id: ExistingDetail?._id,
          ...data,
          logo: ImageUrl ?? ExistingDetail?.logo,
        };
        const response = await AdminAddUpdatePartner({
          ...formData,
          _id: ExistingDetail?._id || "",
          logo: formData.logo || "",
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
          router.push(`${paths.admin.about}`);
        } else {
          toast.error(`Couldn't Edit`);
          setLoading(false);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed`);
      setLoading(false);
    } finally {
      setLoading(false);
    }
  }

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
