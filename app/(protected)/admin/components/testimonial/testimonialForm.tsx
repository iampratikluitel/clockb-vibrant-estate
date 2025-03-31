"use client";

import { MINIOURL } from "@/lib/constants";
import { TESTIMONIALS } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { toast } from "sonner";
import { uploadToMinIO } from "@/lib/helper";
import { useAdminAddUpdateTestimonialsMutation } from "@/store/api/Admin/adminTestimonials";
import { paths } from "@/lib/paths";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  role: z.string().optional(),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.any(),
});

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: TESTIMONIALS | null;
}

const TestimonialForm = ({ type, ExistingDetail }: props) => {
  const [Loading, setLoading] = useState(false);
  const router = useRouter();
  const [AdminAddUpdateTestimonials] = useAdminAddUpdateTestimonialsMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ExistingDetail?.name ?? "",
      description: ExistingDetail?.description ?? "",
      role: ExistingDetail?.role ?? "",
      image: ExistingDetail?.image
        ? `${MINIOURL}${ExistingDetail?.image}`
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
          uploadedFileName = await uploadToMinIO(
            data.image,
            "testimonials"
          );
          if (uploadedFileName === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }
        const formData = {
          ...data,
          image: uploadedFileName,
        };
        const response = await AdminAddUpdateTestimonials({
          ...formData,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          router.push(paths.admin.testimonial);
          setLoading(false);
        } else {
          toast.error(`Couldn't Add`);
          setLoading(false);
        }
      } else if (type == "Edit") {
        setLoading(true);
        let ImageUrl = null;
        if (data.image != `${MINIOURL}${ExistingDetail?.image}`) {
          ImageUrl = await uploadToMinIO(data.image, "testimonials");
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
        const response = await AdminAddUpdateTestimonials({
          ...formData,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          router.push(paths.admin.testimonial);
          setLoading(false);
        } else {
          toast.error(`Couldn't Edit`);
          setLoading(false);
        }
      }
    } catch (error) {
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
        <h1 className="font-semibold text-2xl">{type} Testimonoial</h1>
        <div className="flex w-full gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Testimonial Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Testimonial Name" {...field} />
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
                      placeholder="Enter Testimonial Description"
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
                  <FormLabel>Testimonial Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter Testimonial Description"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
          <div className="w-1/2">
            <SCNSingleImagePicker
              name="Profile Image"
              variant="avatar"
              schemaName="image"
            ></SCNSingleImagePicker>
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
};

export default TestimonialForm;
