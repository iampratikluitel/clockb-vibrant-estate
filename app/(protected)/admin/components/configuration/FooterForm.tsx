"use client";

import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { FOOTER } from "@/lib/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "@/components/ui/input";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { z } from "zod";
import { useForm } from "react-hook-form";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { toast } from "sonner";
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";

const socialLink = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  whatsapp: z.string().optional(),
  youtube: z.string().optional(),
});

const FormSchema = z.object({
  email: z.string().email(),
  about: z.string().min(2, {
    message: "About must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 10 characters.",
  }),
  phone2: z.string().optional(),
  socialHandles: socialLink,
});

interface props {
  ConfigData?: FOOTER;
}

const FooterForm = ({ ConfigData }: props) => {
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: ConfigData?.email ?? "",
      about: ConfigData?.about ?? "",
      address: ConfigData?.address ?? "",
      phone: ConfigData?.phone ?? "",
      phone2: ConfigData?.phone2 ?? "",
      socialHandles: {
        facebook: ConfigData?.socialHandles?.facebook ?? "",
        linkedin: ConfigData?.socialHandles?.linkedin ?? "",
        instagram: ConfigData?.socialHandles?.instagram ?? "",
        twitter: ConfigData?.socialHandles?.twitter ?? "",
        whatsapp: ConfigData?.socialHandles?.whatsapp ?? "",
        youtube: ConfigData?.socialHandles?.youtube ?? "",
      },
    },
  });

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
      setLoading(true);
      // if (!data.logo) {
      //   console.log("Logo data:", data.logo);
      //   toast.error("Please select Logo");
      //   return;
      // }
      // let ImageUrl = null;
      // if (data.logo != `/api/resources/download?filename=${encodeURIComponent(ConfigData?.logo ?? "")}`) {
      //   ImageUrl = await uploadToMinIO(data.logo, "footer");
      //   if (ImageUrl === "") {
      //     toast.error("Image Upload Failed Please try again");
      //     return;
      //   }
      // }
      const formData = {
        _id: ConfigData?._id,
        ...data,
        // logo: ImageUrl ?? ConfigData?.logo,
      };
      const response = await fetch(`/api/admin/configuration/footer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Configuration updated successfully.");
    } catch (error) {
      console.log(error);
      toast.error("Failed to update configuration. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-5xl mx-auto space-y-8 p-6 bg-white rounded-xl shadow-md"
      >
        <h1 className="font-semibold text-3xl text-gray-800">
          Footer Configuration
        </h1>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="flex flex-col gap-6">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="Email" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="about"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>About</FormLabel>
                  <FormControl>
                    <Input placeholder="About" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="address"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Address</FormLabel>
                  <FormControl>
                    <Input placeholder="Address" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Phone</FormLabel>
                  <FormControl>
                    <Input placeholder="Phone" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="phone2"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Secont Phone number</FormLabel>
                  <FormControl>
                    <Input placeholder="Another Number" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="flex flex-col gap-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="socialHandles.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://facebook.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialHandles.instagram"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Instagram</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://instagram.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialHandles.linkedin"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>LinkedIn</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://linkedin.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialHandles.twitter"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://twitter.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialHandles.whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>WhatsApp</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://whatsapp.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="socialHandles.youtube"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>YouTube</FormLabel>
                    <FormControl>
                      <Input
                        type="url"
                        placeholder="https://youtube.com"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
        </div>

        {/* Submit Button */}
        <div className="pt-4">
          {Loading ? (
            <div className="text-center">
              <div className="loader mx-auto"></div>
            </div>
          ) : (
            <Button type="submit" className="w-full sm:w-auto">
              Submit
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FooterForm;
