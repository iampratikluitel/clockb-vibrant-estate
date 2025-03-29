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
  card8icon: z.any(),
  card8name: z.string(),
  card8description: z.string(),
  card9icon: z.any(),
  card9name: z.string(),
  card9description: z.string(),
  card10icon: z.any(),
  card10name: z.string(),
  card10description: z.string(),
});

interface props {
  ConfigData: any | undefined;
}

export default function LandingSecondSection({ ConfigData }: props) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      card8icon: ConfigData?.card8icon
        ? `${MINIOURL}${ConfigData?.card8icon}`
        : "",
      card8name: ConfigData?.card8icon ?? "",
      card8description: ConfigData?.card8description ?? "",
      card9icon: ConfigData?.card9icon
        ? `${MINIOURL}${ConfigData?.card9icon}`
        : "",
      card9name: ConfigData?.card9icon ?? "",
      card9description: ConfigData?.card9description ?? "",
      card10icon: ConfigData?.card10icon
        ? `${MINIOURL}${ConfigData?.card10icon}`
        : "",
      card10name: ConfigData?.card10name ?? "",
      card10description: ConfigData?.card10description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (data.card8icon != `${MINIOURL}${ConfigData?.card8icon}`) {
        data.card8icon = await uploadToMinIO(
          data.card8icon,
          "landingpageConfig"
        );
      }
      if (data.card9icon != `${MINIOURL}${ConfigData?.card9icon}`) {
        data.card9icon = await uploadToMinIO(
          data.card9icon,
          "landingpageConfig"
        );
      }
      if (data.card10icon != `${MINIOURL}${ConfigData?.card10icon}`) {
        data.card10icon = await uploadToMinIO(
          data.card10icon,
          "landingpageConfig"
        );
      }

      let image1Url = "";
      let image2Url = "";
      let image3Url = "";

      const formData = {
        ...data,
        card8icon: image1Url ?? ConfigData?.card8icon,
        card9icon: image2Url ?? ConfigData?.card9icon,
        card10icon: image3Url ?? ConfigData?.card10icon,
      };

      const response = await fetch("/api/admin/configuration/landingpage/landing-third-section", {
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
            Invest with us
          </CardTitle>
          <CardContent>
            <div className="flex w-full gap-4">
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 1:</h1>
                  <FormField
                    control={form.control}
                    name="card8icon"
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
                    name="card8description"
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
                    schemaName="card8icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 2:</h1>
                  <FormField
                    control={form.control}
                    name="card9name"
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
                    name="card9description"
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
                    schemaName="card9icon"
                  ></SCNSingleImagePicker>
                </div>
              </div>
              <div className="w-1/3 space-y-2">
                <div className="space-y-2">
                  <h1 className="font-semibold text-2xl">Card 3:</h1>
                  <FormField
                    control={form.control}
                    name="card10name"
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
                    name="card10description"
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
                    schemaName="card10icon"
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
