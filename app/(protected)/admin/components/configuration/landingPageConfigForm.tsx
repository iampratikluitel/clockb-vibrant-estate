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
import { MINIOURL } from "@/lib/constants";

interface props {
  ConfigData: any | undefined;
}

const getDefaultValues = (ConfigData: any) => {
  return {
    name: ConfigData?.name ?? "",
    description: ConfigData?.description ?? "",
    backgroundImage: ConfigData?.backgroundImage ?? "",
    card4icon: ConfigData?.card4icon
      ? `${MINIOURL}${ConfigData?.card4icon}`
      : null,
    card5icon: ConfigData?.card5icon
      ? `${MINIOURL}${ConfigData?.card5icon}`
      : null,
    card6icon: ConfigData?.card6icon
      ? `${MINIOURL}${ConfigData?.card6icon}`
      : null,
    card7icon: ConfigData?.card7icon
      ? `${MINIOURL}${ConfigData?.card7icon}`
      : null,
    card8icon: ConfigData?.card8icon
      ? `${MINIOURL}${ConfigData?.card8icon}`
      : null,
    card9icon: ConfigData?.card9icon
      ? `${MINIOURL}${ConfigData?.card9icon}`
      : null,
    card10icon: ConfigData?.card10icon
      ? `${MINIOURL}${ConfigData?.card10icon}`
      : null,
    card11icon: ConfigData?.card11icon
      ? `${MINIOURL}${ConfigData?.card11icon}`
      : null,
    card12icon: ConfigData?.card12icon
      ? `${MINIOURL}${ConfigData?.card12icon}`
      : null,
    card13icon: ConfigData?.card13icon
      ? `${MINIOURL}${ConfigData?.card13icon}`
      : null,

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
    card11name: ConfigData?.card11name ?? "",
    card12name: ConfigData?.card12name ?? "",
    card13name: ConfigData?.card13name ?? "",

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
    card11description: ConfigData?.card11description ?? "",
    card12description: ConfigData?.card12description ?? "",
    card13description: ConfigData?.card13description ?? "",
  };
};

const LandingPageConfigForm = ({ ConfigData }: props) => {
  const [Loading, setLoading] = useState(false);

  const router = useRouter();

  const form = useForm<z.infer<typeof LandingPageSchema>>({
    resolver: zodResolver(LandingPageSchema),
    defaultValues: getDefaultValues(ConfigData),
  });

  async function onSubmit(data: z.infer<typeof LandingPageSchema>) {
    console.log("Submit", data);
    try {
      setLoading(true);
      console.log("Submitting form...");

      let ImageUrl1 = null;
      let ImageUrl2 = null;
      let ImageUrl3 = null;
      let ImageUrl4 = null;
      let ImageUrl5 = null;
      let ImageUrl6 = null;
      let ImageUrl7 = null;
      let ImageUrl8 = null;
      let ImageUrl9 = null;
      let ImageUrl10 = null;
      let backgroundImage = null;

      if (data.card4icon != `${MINIOURL}${ConfigData?.card4icon}`) {
        ImageUrl1 = await uploadToMinIO(data.card4icon, "landingpageConfig");
        if (ImageUrl1 === "") {
          toast.error("Icon 4 upload failed Please try again");
          return;
        }
      }

      if (data.card5icon != `${MINIOURL}${ConfigData?.card5icon}`) {
        ImageUrl2 = await uploadToMinIO(data.card5icon, "landingpageConfig");
        if (ImageUrl2 === "") {
          toast.error("Icon 4 upload failed Please try again");
          return;
        }
      }

      if (data.card6icon != `${MINIOURL}${ConfigData?.card6icon}`) {
        ImageUrl3 = await uploadToMinIO(data.card6icon, "landingpageConfig");
        if (ImageUrl3 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card7icon != `${MINIOURL}${ConfigData?.card7icon}`) {
        ImageUrl4 = await uploadToMinIO(data.card7icon, "landingpageConfig");
        if (ImageUrl4 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card8icon != `${MINIOURL}${ConfigData?.card8icon}`) {
        ImageUrl5 = await uploadToMinIO(data.card8icon, "landingpageConfig");
        if (ImageUrl5 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card9icon != `${MINIOURL}${ConfigData?.card9icon}`) {
        ImageUrl6 = await uploadToMinIO(data.card6icon, "landingpageConfig");
        if (ImageUrl6 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card10icon != `${MINIOURL}${ConfigData?.card10icon}`) {
        ImageUrl7 = await uploadToMinIO(data.card6icon, "landingpageConfig");
        if (ImageUrl7 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card11icon != `${MINIOURL}${ConfigData?.card11icon}`) {
        ImageUrl8 = await uploadToMinIO(data.card6icon, "landingpageConfig");
        if (ImageUrl8 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card12icon != `${MINIOURL}${ConfigData?.card12icon}`) {
        ImageUrl9 = await uploadToMinIO(data.card12icon, "landingpageConfig");
        if (ImageUrl9 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      if (data.card13icon != `${MINIOURL}${ConfigData?.card13icon}`) {
        ImageUrl10 = await uploadToMinIO(data.card13icon, "landingpageConfig");
        if (ImageUrl10 === "") {
          toast.error("Icon 1 upload failed Please try again");
          return;
        }
      }

      const formData = {
        ...data,
        card4icon: ImageUrl1 ?? ConfigData?.card4icon,
        card5icon: ImageUrl2 ?? ConfigData?.card5icon,
        card6icon: ImageUrl3 ?? ConfigData?.card6icon,
        card7icon: ImageUrl4 ?? ConfigData?.card7icon,
        card8icon: ImageUrl5 ?? ConfigData?.card8icon,
        card9icon: ImageUrl6 ?? ConfigData?.card9icon,
        card10icon: ImageUrl7 ?? ConfigData?.card10icon,
        backgroundImage: backgroundImage ?? ConfigData?.backgroundImage,
      };

      const response = await fetch("/api/admin/configuration/landingpage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const responseData = await response.json();
        toast.success(`${responseData.message}`);
        setLoading(false);
        router.push(paths.admin.configuration);
      } else {
        toast.error(`Couldn't Update`);
        setLoading(false);
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
      <form onSubmit={form.handleSubmit(onSubmit)}>
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
                <div className="w-1/3 space-y-2">
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
                  </div>
                </div>
                <div className="w-1/3 space-y-2">
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
                            <Input {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <div className="w-1/3 space-y-2">
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
                            <Input {...field} />
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
                <div className="w-1/4 space-y-2">
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
                            <Input {...field} />
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
                <div className="w-1/4 space-y-2">
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
                            <Input {...field} />
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

                <div className="w-1/4 space-y-2">
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
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
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
                            <Input {...field} />
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
        </div>
        <div className="flex items-end justify-end pt-4">
          {Loading ? (
            <div className="loader"></div>
          ) : (
            <Button type="submit">Submit</Button>
          )}
        </div>
      </form>
    </Form>
  );
};

export default LandingPageConfigForm;
