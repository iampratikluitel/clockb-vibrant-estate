"use client";

import React, { useState } from "react";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { LandingPageSchema } from "./landingPageSchema";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useAdminAddUpdateLandingPageConfigMutation } from "@/store/api/Admin/adminConfiguration";
import { uploadToMinIO } from "@/lib/helper";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/paths";

interface props {
  ConfigData: any | undefined;
}

const getDefaultValues = (ConfigData: any) => {
  return {
    name: ConfigData?.name ?? "",
    description: ConfigData?.description ?? "",
    card4icon: ConfigData?.card4icon ?? null,
    card5icon: ConfigData?.card4icon ?? null,
    card6icon: ConfigData?.card4icon ?? null,
    card7icon: ConfigData?.card4icon ?? null,
    card1name: ConfigData?.card1name ?? "",
    card2name: ConfigData?.card2name ?? "",
    card3name: ConfigData?.card3name ?? "",
    card4name: ConfigData?.card4name ?? "",
    card5name: ConfigData?.card5name ?? "",
    card6name: ConfigData?.card6name ?? "",
    card7name: ConfigData?.card7name ?? "",
    card8name: ConfigData?.card8name ?? "",
    card9name: ConfigData?.card9name ?? "",
    card10name: ConfigData?.card10name ?? "",
    card1description: ConfigData?.card1description ?? "",
    card2description: ConfigData?.card2description ?? "",
    card3description: ConfigData?.card3description ?? "",
    card4description: ConfigData?.card4description ?? "",
    card5description: ConfigData?.card5description ?? "",
    card6description: ConfigData?.card6description ?? "",
    card7description: ConfigData?.card7description ?? "",
    card8description: ConfigData?.card8description ?? "",
    card9description: ConfigData?.card9description ?? "",
    card10description: ConfigData?.card10description ?? "",
    backgroundImage: ConfigData?.backgroundImage ?? null,
  };
};

const LandingForm = ({ ConfigData }: props) => {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [Loading, setLoading] = useState(false);
  const [AddUpadateLandingPageConfig] =
    useAdminAddUpdateLandingPageConfigMutation();

    const router = useRouter();

  const form = useForm<z.infer<typeof LandingPageSchema>>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues: getDefaultValues(ConfigData),
  });

  // async function onSubmit(data: z.infer<typeof LandingPageSchema>) {
  //   try {
  //     setLoading(true);
  //     console.log
  //     const formData = {
  //       _id: ConfigData?._id,
  //       ...data,
  //     }

  //     let ImageUrl1 = null;
  //     let ImageUrl2 = null;
  //     let ImageUrl3 = null;
  //     let ImageUrl4 = null;
  //     let ImageUrl5 = null;
  //     let ImageUrl6 = null;
  //     let ImageUrl7 = null;
  //     let backgroundImage = null;

  //     if (data.card4icon != ConfigData?.card4icon){
  //       ImageUrl1 = await uploadToMinIO(data.card4icon, "landingpageConfig");
  //       if (ImageUrl1 === "") {
  //         toast.error("Icon 1 upload failed Please try again");
  //         return;
  //       }
  //     }

  //     if (data.card5icon != ConfigData?.card5icon){
  //       ImageUrl2 = await uploadToMinIO(data.card5icon, "landingpageConfig");
  //       if (ImageUrl2 === "") {
  //         toast.error("Icon 1 upload failed Please try again");
  //         return;
  //       }
  //     }

  //     if (data.card6icon != ConfigData?.card6icon){
  //       ImageUrl3 = await uploadToMinIO(data.card6icon, "landingpageConfig");
  //       if (ImageUrl3 === "") {
  //         toast.error("Icon 1 upload failed Please try again");
  //         return;
  //       }
  //     }

  //     const response = await AddUpadateLandingPageConfig({
  //       ...formData,
  //       card4icon: ImageUrl1 ?? ConfigData?.card4icon,
  //       card5icon: ImageUrl2 ?? ConfigData?.card5icon,
  //       card6icon: ImageUrl3 ?? ConfigData?.card6icon,
  //       card7icon: ImageUrl4 ?? ConfigData?.card7icon,
  //       card8icon: ImageUrl5 ?? ConfigData?.card8icon,
  //       card9icon: ImageUrl6 ?? ConfigData?.card9icon,
  //       card10icon: ImageUrl7 ?? ConfigData?.card10icon,
  //       backgroundImage: backgroundImage ?? ConfigData?.backgroundImage,
  //     }).unwrap();
  //     if (response) {
  //       toast.success(`${response.message}`);
  //       setLoading(false);
  //       router.push(paths.admin.configuration);
  //     } else {
  //       toast.error(`Couldn't Update`);
  //       setLoading(false);
  //     }
  //   } catch (error) {
  //     toast.error(`Failed`);
  //     setLoading(false);
  //   } finally {
  //     setLoading(false);
  //   }
  // }

  async function handleSubmit(data: z.infer<typeof LandingPageSchema>) {
    setIsSubmitting(true);

    try{ 
      const response = await fetch(`/api/admin/configuration/landingpage`, {
        method: "POST",
        headers: {
          "Content- Type" : "application/json",
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) throw new Error("Failed to submit");

      toast.success("Configuration updated successfully.");
    } catch (error) {
      toast.error("Failed to update configuration. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <div className="space-y-2">
          <Card>
            <CardTitle className="text-2xl font-semibold m-4">
              Section 1: Title
            </CardTitle>
            <CardContent>
              <div className="flex w-full gap-4">
                {/* Left Side - Title and Description */}
                <div className="w-1/2 space-y-4">
                  <h1 className="font-semibold text-2xl">Top Section</h1>
                  <FormField
                    name="name"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter title"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    name="description"
                    control={form.control}
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Input
                            type="text"
                            placeholder="Enter description"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                {/* Right Side - Image Picker */}
                <div className="w-1/2 flex items-center justify-center">
                  <SCNSingleImagePicker
                    name="Image"
                    variant="imageBox"
                    schemaName="righBottomSection.image"
                  />
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="text-2xl font-semibold m-4">
              Section 2: First Page Cards
            </CardTitle>
            <CardContent>
              <div className="flex w-full gap-4">
                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 1:</h1>
                    <FormField
                      control={form.control}
                      name="card1name"
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
                      name="card1description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card1icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 2:</h1>
                    <FormField
                      control={form.control}
                      name="card2name"
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
                      name="card2description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card2icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 3:</h1>
                    <FormField
                      control={form.control}
                      name="card3name"
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
                      name="card3description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card3icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>

                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 4:</h1>
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
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card3icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="text-2xl font-semibold m-4">
              Section 3: Why Choose Us ?
            </CardTitle>
            <CardContent>
              <div className="flex w-full gap-4">
                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 1:</h1>
                    <FormField
                      control={form.control}
                      name="card1name"
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
                      name="card1description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card1icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 2:</h1>
                    <FormField
                      control={form.control}
                      name="card2name"
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
                      name="card2description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card2icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 3:</h1>
                    <FormField
                      control={form.control}
                      name="card3name"
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
                      name="card3description"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Description</FormLabel>
                          <FormControl>
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card3icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>

                <div className="w-1/4 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 4:</h1>
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
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card3icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardTitle className="text-2xl font-semibold m-4">
              Section 4: Why Invest With Us ?
            </CardTitle>
            <CardContent>
              <div className="flex w-full gap-4">
                <div className="w-1/3 space-y-2">
                  <div className="space-y-2">
                    <h1 className="font-semibold text-2xl">Card 1:</h1>
                    <FormField
                      control={form.control}
                      name="card8name"
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
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card1icon"
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
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card2icon"
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
                            <Input  {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <SCNSingleImagePicker
                      name="Icon"
                      variant="avatar"
                      schemaName="card3icon"
                    ></SCNSingleImagePicker>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex items-end justify-end pt-4">
        {Loading ? (
          <div className="loader"></div>
        ):(
          
          <Button type="submit">Submit</Button>
        )}
        </div>
      </form>
    </Form>
  );
};

export default LandingForm;