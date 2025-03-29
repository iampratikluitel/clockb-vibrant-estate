import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
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
import { MINIOURL } from "@/lib/constants";
import { uploadToMinIO } from "@/lib/helper";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  card4icon: z.any(),
  card4name: z.string(),
  card4description: z.string(),
  card5icon: z.any(),
  card5name: z.string(),
  card5description: z.string(),
  card6icon: z.any(),
  card6name: z.string(),
  card6description: z.string(),
  card7icon: z.any(),
  card7name: z.string(),
  card7description: z.string(),
});

interface props {
  ConfigData: any | undefined;
}

export default function LandingSecondSection({ ConfigData }: props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      card4icon: ConfigData?.card4icon
        ? `${MINIOURL}${ConfigData?.card4icon}`
        : "",
      card4name: ConfigData?.card4name ?? "",
      card4description: ConfigData?.card4description ?? "",
      card5icon: ConfigData?.card5icon
        ? `${MINIOURL}${ConfigData?.card5icon}`
        : "",
      card5name: ConfigData?.card5name ?? "",
      card5description: ConfigData?.card5description ?? "",
      card6icon: ConfigData?.card6icon
        ? `${MINIOURL}${ConfigData?.card6icon}`
        : "",
      card6name: ConfigData?.card6name ?? "",
      card6description: ConfigData?.card6description ?? "",
      card7icon: ConfigData?.card7icon
        ? `${MINIOURL}${ConfigData?.card7icon}`
        : "",
      card7name: ConfigData?.card7name ?? "",
      card7description: ConfigData?.card7description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (data.card4icon != `${MINIOURL}${ConfigData?.card4icon}`) {
        data.card4icon = await uploadToMinIO(
          data.card4icon,
          "landingpageConfig"
        );
      }
      if (data.card5icon != `${MINIOURL}${ConfigData?.card5icon}`) {
        data.card5icon = await uploadToMinIO(
          data.card5icon,
          "landingpageConfig"
        );
      }
      if (data.card6icon != `${MINIOURL}${ConfigData?.card6icon}`) {
        data.card6icon = await uploadToMinIO(
          data.card6icon,
          "landingpageConfig"
        );
      }
      if (data.card7icon != `${MINIOURL}${ConfigData?.card7icon}`) {
        data.card7icon = await uploadToMinIO(
          data.card7icon,
          "landingpageConfig"
        );
      }

      let image1Url = "";
      let image2Url = "";
      let image3Url = "";
      let image4Url = "";

      const formData = {
        ...data,
        card4icon: image1Url ?? ConfigData?.card4icon,
        card5icon: image2Url ?? ConfigData?.card5icon,
        card6icon: image3Url ?? ConfigData?.card6icon,
        card7icon: image4Url ?? ConfigData?.card7icon,
      };

      const response = await fetch("/api/admin/configuration/landingpage/landing-second-section", {
        method: "POST",
        body: JSON.stringify(formData),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (error) {}
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <Card>
          <CardTitle className="text-2xl font-semibold m-4">
            Why Choose us 
          </CardTitle>
          <CardContent>
            <div className="flex w-full gap-4">
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 1:</h1>
                  <FormField
                    control={form.control}
                    name="card4name"
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
                    name="card4description"
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
                    schemaName="card4icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 2:</h1>
                  <FormField
                    control={form.control}
                    name="card5name"
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
                    name="card5description"
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
                    schemaName="card5icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 3:</h1>
                  <FormField
                    control={form.control}
                    name="card6name"
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
                    name="card6description"
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
                    schemaName="card6icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 4:</h1>
                  <FormField
                    control={form.control}
                    name="card7name"
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
                    name="card7description"
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
                    schemaName="card7icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
        <div className="flex items-end justify-end pt-4">
          <Button type="submit">Submit</Button>
        </div>
      </form>
    </Form>
  );
}
