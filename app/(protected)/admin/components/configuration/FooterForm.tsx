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
import { useForm, useFieldArray } from "react-hook-form";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { toast } from "sonner";
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import { Plus, Trash2 } from "lucide-react";

const socialLink = z.object({
  facebook: z.string().optional(),
  instagram: z.string().optional(),
  linkedin: z.string().optional(),
  twitter: z.string().optional(),
  whatsapp: z.string().optional(),
  youtube: z.string().optional(),
});

const emailSchema = z.object({
  label: z.string().min(1, "Label is required"),
  address: z.string().email("Invalid email address"),
});

const phoneSchema = z.object({
  label: z.string().min(1, "Label is required"),
  number: z.string().min(10, "Phone number must be at least 10 characters"),
});

const FormSchema = z.object({
  about: z.string().min(2, {
    message: "About must be at least 2 characters.",
  }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  emails: z.array(emailSchema).min(1, "At least one email is required"),
  phones: z.array(phoneSchema).min(1, "At least one phone number is required"),
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
      about: ConfigData?.about ?? "",
      address: ConfigData?.address ?? "",
      emails: ConfigData?.emails?.length
        ? ConfigData.emails
        : [{ label: "Main", address: "" }],
      phones: ConfigData?.phones?.length
        ? ConfigData.phones
        : [{ label: "Main", number: "" }],
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

  const {
    fields: emailFields,
    append: appendEmail,
    remove: removeEmail,
  } = useFieldArray({
    control: form.control,
    name: "emails",
  });

  const {
    fields: phoneFields,
    append: appendPhone,
    remove: removePhone,
  } = useFieldArray({
    control: form.control,
    name: "phones",
  });

  async function handleSubmit(data: z.infer<typeof FormSchema>) {
    setLoading(true);

    try {
      const formData = {
        _id: ConfigData?._id,
        ...data,
      };

      const response = await fetch(`/api/admin/configuration/footer`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Footer configuration updated successfully.");
    } catch (error) {
      console.error(error);
      toast.error("Failed to update configuration. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="w-full max-w-5xl mx-auto space-y-8 p-6 "
      >
        <h1 className="font-semibold text-3xl text-gray-800">
          Footer Configuration
        </h1>

        <div className="grid grid-cols-1 gap-8">
          <FormField
            control={form.control}
            name="about"
            render={({ field }) => (
              <FormItem>
                <FormLabel>About</FormLabel>
                <FormControl>
                  <Input placeholder="About your company" {...field} />
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
                  <Input placeholder="Company address" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Email Addresses</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendEmail({ label: "", address: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Email
              </Button>
            </div>

            {emailFields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                  <FormField
                    control={form.control}
                    name={`emails.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Label
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Email Label (e.g., Main, Support)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`emails.${index}.address`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Email Address
                        </FormLabel>
                        <FormControl>
                          <Input
                            type="email"
                            placeholder="Email address"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    onClick={() => removeEmail(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Phone Number Fields */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <h3 className="text-lg font-medium">Phone Numbers</h3>
              <Button
                type="button"
                variant="outline"
                size="sm"
                onClick={() => appendPhone({ label: "", number: "" })}
              >
                <Plus className="h-4 w-4 mr-2" />
                Add Phone
              </Button>
            </div>

            {phoneFields.map((field, index) => (
              <div key={field.id} className="flex items-start space-x-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 flex-grow">
                  <FormField
                    control={form.control}
                    name={`phones.${index}.label`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Label
                        </FormLabel>
                        <FormControl>
                          <Input
                            placeholder="Phone Label (e.g., Office, Mobile)"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name={`phones.${index}.number`}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className={index !== 0 ? "sr-only" : ""}>
                          Phone Number
                        </FormLabel>
                        <FormControl>
                          <Input placeholder="Phone number" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {index > 0 && (
                  <Button
                    type="button"
                    variant="ghost"
                    size="icon"
                    className="mt-6"
                    onClick={() => removePhone(index)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>
                )}
              </div>
            ))}
          </div>

          {/* Social Media Links */}
          <h3 className="text-lg font-medium">Social Media Links</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="socialHandles.facebook"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Facebook</FormLabel>
                  <FormControl>
                    <Input
                      type="url"
                      placeholder="https://facebook.com/your-page"
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
                      placeholder="https://instagram.com/your-handle"
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
                      placeholder="https://linkedin.com/company/your-company"
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
                      placeholder="https://twitter.com/your-handle"
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
                      placeholder="https://wa.me/your-number"
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
                      placeholder="https://youtube.com/c/your-channel"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
              Save Configuration
            </Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default FooterForm;
