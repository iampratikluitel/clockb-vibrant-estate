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
import { ApiResponse, Member } from "@/lib/types";
import { useAdminAddUpdateTeamMemberMutation } from "@/store/api/Admin/adminAboutPage";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: Member;
}

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "name must me at least 1 character.",
  }),
  description: z.string().min(2, {
    message: "description must be at least 2 character",
  }),
  role: z.string().min(2, {
    message: "role must be at least 2 character",
  }),
  image: z.any(),
});

export default function TeamMemberForm({ type, ExistingDetail }: props) {
  const [Loading, setLoading] = useState(false);
  const [AdminAddUpdateMember] = useAdminAddUpdateTeamMemberMutation();
  const router = useRouter();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ExistingDetail?.name ?? "",
      description: ExistingDetail?.description ?? "",
      role: ExistingDetail?.role ?? "",
      image: ExistingDetail?.image
        ? `/api/resources/download?filename=${encodeURIComponent(ExistingDetail?.image)}`
        : null,
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (type == "Add") {
        setLoading(true);
        if (!data.image) {
          toast.error("Please select Image");
          return;
        }

        let uploadedFileName;
        if (data.image) {
          uploadedFileName = await uploadToMinIO(data.image, "teamMember");
          if (uploadedFileName === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          ...data,
          image: uploadedFileName || data.image,
        };

        const response = await AdminAddUpdateMember(formData).unwrap();
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

        if (data.image != `/api/resources/download?filename=${encodeURIComponent(ExistingDetail?.image ?? "")}`) {
          ImageUrl = await uploadToMinIO(data.image, "teamMember");
          if (ImageUrl === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          _id: ExistingDetail?._id,
          ...data,
          image: ImageUrl ?? ExistingDetail?.image,
        };
        const response = await AdminAddUpdateMember({
          ...formData,
          _id: ExistingDetail?._id || "",
          image: formData.image || "",
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
            <FormField
              control={form.control}
              name="role"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Role</FormLabel>
                  <FormControl>
                    <Input
                      placeholder="Enter the role of the member"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SCNSingleImagePicker
              name="image"
              variant="avatar"
              schemaName="image"
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
