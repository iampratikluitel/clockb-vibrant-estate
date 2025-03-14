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

const socialLink = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  whatsapp: z.string().optional(),
  youtube: z.string().optional(),
});

const FormSchema = z.object({
  logo: z.any(),
  email: z.string().email(),
  about: z.string().min(2, {
    message: "About must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  phone: z.string().min(2, {
    message: "Phone must be at least 2 characters.",
  }),
  socialHandles: socialLink,
});

interface props {
  ConfigData: FOOTER | undefined;
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
  return (
    <Form {...form}>
      <form
        // onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-4 bg-gray-100"
      >
        <h1 className="font-semibold text-2xl">Footer Configuration</h1>
        <div className="flex w-full gap-4">
          <div className="w-1/2 flex flex-col gap-2">
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
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="socialHandles.facebook"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Facebook URL</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="url"
                        placeholder="Eg: https://www.facebook.com/"
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
                    <FormLabel>Twitter Link</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="url"
                        placeholder="Eg: https://www.x.com"
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
                    <FormLabel>LinkedIn Link</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="url"
                        placeholder="Eg: https://www.linkedin.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            <div className="flex gap-4">
              <FormField
                control={form.control}
                name="socialHandles.whatsapp"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Whatsapp Link</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="url"
                        placeholder="Eg: https://www.whatsapp.com"
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
                    <FormLabel>Youtube Link</FormLabel>
                    <FormControl>
                      <Input
                        className=""
                        type="url"
                        placeholder="Eg: https://www.youtube.com"
                        {...field}
                      />
                    </FormControl>

                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>
          <div className="w-1/2">
            <SCNSingleImagePicker
              name="Logo"
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
};

export default FooterForm;
