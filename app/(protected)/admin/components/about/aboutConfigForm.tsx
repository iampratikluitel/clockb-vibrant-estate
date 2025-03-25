"use client";

import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import { Card, CardContent } from "@/components/ui/card";
import { Member } from "@/lib/types";

const FormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  image: z.any(),
});

interface TeamData {
  name: string;
  description: string;
  image?: any;
}

interface Props {
  type: "Add" | "Edit";
  ExistingDetail?: Member | null;
}

const AboutConfigForm: React.FC<Props> = ({ type, ExistingDetail }) => {
  const [heading, setHeading] = useState("About Project Etates");
  const [content, setContent] = useState(
    "This is the default content for the landing page."
  );

  const form = useForm<TeamData>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      name: ExistingDetail?.name || "",
      description: ExistingDetail?.description || "",
      image: ExistingDetail?.image || null,
    },
  });

  const onSubmit: SubmitHandler<TeamData> = (data) => {
    console.log(data);
  };

  return (
    <div>
      <div className="w-[100%] mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          About Page Editor
        </h1>
        <div className="space-y-4">
          <Card>
            <CardContent>
              {/* Heading Input */}
              <div className="my-4">
                <label className="block font-semibold text-gray-700">
                  Title
                </label>
                <Input
                  type="text"
                  value={heading}
                  onChange={(e) => setHeading(e.target.value)}
                  className="mt-2"
                />
              </div>

              <div className="mb-4">
                <label className="block font-semibold text-gray-700">
                  Content
                </label>
                <Input
                  type="text"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="mt-2"
                />
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="my-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <h1 className="font-semibold text-2xl">Meet the Team</h1>
                  <div className="flex gap-4">
                    <div className="w-1/2 flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Team Member Name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Member Name"
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
                            <FormLabel>Team Member Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter Member Description"
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
                        name="image"
                        variant="avatar"
                        schemaName="image"
                      />
                    </div>
                  </div>
                </form>
              </Form>
              <div className="flex justify-end items-end">
                <Button variant="default">Edit</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="my-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <h1 className="font-semibold text-2xl">
                    Engineering and Planning Partner's
                  </h1>
                  <div className="flex gap-4">
                    <div className="w-1/2 flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Partner's company name</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Member Name"
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
                            <FormLabel>Partner's logo Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter partners Description"
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
                        name="image"
                        variant="avatar"
                        schemaName="image"
                      />
                    </div>
                  </div>
                </form>
              </Form>
              <div className="flex justify-end items-end">
                <Button variant="default">Edit</Button>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardContent className="my-4">
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)}>
                  <h1 className="font-semibold text-2xl">
                    Managed by Investment Circle
                  </h1>
                  <div className="flex gap-4">
                    <div className="w-1/2 flex flex-col gap-2">
                      <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Description</FormLabel>
                            <FormControl>
                              <Input
                                placeholder="Enter Member Name"
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
                            <FormLabel>Partner's logo Description</FormLabel>
                            <FormControl>
                              <Textarea
                                placeholder="Enter partners Description"
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
                        name="image"
                        variant="avatar"
                        schemaName="image"
                      />
                    </div>
                  </div>
                </form>
              </Form>
              <div className="flex justify-end items-end">
                <Button variant="default">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </div>
        <div className="flex justify-end items-end">
          <Button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white mt-4"
          >
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AboutConfigForm;
