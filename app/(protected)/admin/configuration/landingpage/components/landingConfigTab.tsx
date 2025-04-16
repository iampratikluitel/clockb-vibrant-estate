"use client";

import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import FormSchema, { FormSchemaType } from "./landingConfigSchema";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

interface Props {
  ExistingDetail?: Partial<FormSchemaType> & { _id?: string };
}

export default function LandingConfiguration({ ExistingDetail }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("card1");

  const form = useForm<FormSchemaType>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      card1title: ExistingDetail?.card1title ?? "",
      card1description: ExistingDetail?.card1description ?? "",
      card1Date: ExistingDetail?.card1Date ?? "",

      card2title: ExistingDetail?.card2title ?? "",
      card2description: ExistingDetail?.card2description ?? "",
      card2Date: ExistingDetail?.card2Date ?? "",

      card3title: ExistingDetail?.card3title ?? "",
      card3description: ExistingDetail?.card3description ?? "",
      card3Date: ExistingDetail?.card3Date ?? "",

      card4title: ExistingDetail?.card4title ?? "",
      card4description: ExistingDetail?.card4description ?? "",
      card4Date: ExistingDetail?.card4Date ?? "",

      card5title: ExistingDetail?.card5title ?? "",
      card5description: ExistingDetail?.card5description ?? "",
      card5Date: ExistingDetail?.card5Date ?? "",
    },
  });

  const onSubmit = async (data: FormSchemaType) => {
    try {
      setIsLoading(true);
      const formData = { _id: ExistingDetail?._id, ...data };
      const response = await fetch("/api/admin/configuration/landingpage", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save data");
      toast.success("Changes saved successfully");
    } catch (error) {
      console.error(error);
      toast.error("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  };

  const renderCardFields = (cardNumber: number) => {
    const prefix = `card${cardNumber}` as const;

    const titleKey = `${prefix}title` as keyof FormSchemaType;
    const descriptionKey = `${prefix}description` as keyof FormSchemaType;
    const dateKey = `${prefix}Date` as keyof FormSchemaType;

    return (
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Project {cardNumber}</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <FormField
            control={form.control}
            name={titleKey}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Title</FormLabel>
                <FormControl>
                  <Input placeholder="Enter Project Title" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={descriptionKey}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter project Description"
                    className="min-h-32"
                    {...field}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name={dateKey}
            render={({ field }) => (
              <FormItem>
                <FormLabel>Date</FormLabel>
                <FormControl>
                  <Input
                    type="date"
                    value={
                      field.value
                        ? new Date(field.value).toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => field.onChange(e.target.value)}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </CardContent>
      </Card>
    );
  };

  return (
    <div className="w-full max-w-6xl mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-2xl font-semibold mb-6">Projects Journey</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <Tabs
            value={activeTab}
            onValueChange={setActiveTab}
            className="w-full"
          >
            <TabsList className="grid grid-cols-5 mb-6">
              {Array.from({ length: 5 }).map((_, index) => (
                <TabsTrigger key={index} value={`card${index + 1}`}>
                  Project {index + 1}
                </TabsTrigger>
              ))}
            </TabsList>

            {Array.from({ length: 5 }).map((_, index) => (
              <TabsContent key={index} value={`card${index + 1}`}>
                {renderCardFields(index + 1)}
              </TabsContent>
            ))}
          </Tabs>

          <div className="flex justify-end mt-8">
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save All Projects"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
