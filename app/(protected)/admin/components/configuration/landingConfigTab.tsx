"use client";

import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
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
import { useAdminAddUpdateLandingPageConfigMutation } from "@/store/api/Admin/adminConfiguration";
import { PROJECTJOURNEY } from "@/lib/types";
import LandingConfigSchema from "./landingConfigSchema";
import { z } from "zod";
import { paths } from "@/lib/paths";
import { useRouter } from "next/navigation";

interface Props {
  ExistingDetail: PROJECTJOURNEY;
}

// Helper function to format date string to YYYY-MM-DD for input[type="date"]
const formatDateForInput = (dateString: string | undefined): string => {
  if (!dateString) return "";
  try {
    const date = new Date(dateString);
    if (isNaN(date.getTime())) return ""; // Invalid date
    return date.toISOString().split("T")[0];
  } catch (error) {
    return "";
  }
};

export default function LandingConfiguration({ ExistingDetail }: Props) {
  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("card1");
  
  const router = useRouter();

  const [AdminLandingConfig] = useAdminAddUpdateLandingPageConfigMutation();

  // Prepare default values, ensuring they're never undefined
  const defaultValues = {
    card1title: ExistingDetail?.card1title || "",
    card1description: ExistingDetail?.card1description || "",
    card1Date: ExistingDetail?.card1Date || "",

    card2title: ExistingDetail?.card2title || "",
    card2description: ExistingDetail?.card2description || "",
    card2Date: ExistingDetail?.card2Date || "",

    card3title: ExistingDetail?.card3title || "",
    card3description: ExistingDetail?.card3description || "",
    card3Date: ExistingDetail?.card3Date || "",

    card4title: ExistingDetail?.card4title || "",
    card4description: ExistingDetail?.card4description || "",
    card4Date: ExistingDetail?.card4Date || "",

    card5title: ExistingDetail?.card5title || "",
    card5description: ExistingDetail?.card5description || "",
    card5Date: ExistingDetail?.card5Date || "",
  };

  const form = useForm<z.infer<typeof LandingConfigSchema>>({
    resolver: zodResolver(LandingConfigSchema),
    defaultValues,
  });

  useEffect(() => {
    if (ExistingDetail) {
      Object.entries(defaultValues).forEach(([key, value]) => {
        form.setValue(key as any, value);
      });
    }
  }, [ExistingDetail, form]);

  async function onSubmit(data: z.infer<typeof LandingConfigSchema>) {
    try {
      setIsLoading(true);
      
      // Create milestones array from card data
      const milestones = [];
      for (let i = 1; i <= 5; i++) {
        const title = data[`card${i}title` as keyof typeof data];
        const description = data[`card${i}description` as keyof typeof data];
        const period = data[`card${i}Date` as keyof typeof data];
        
        // Only add milestone if title exists
        if (title) {
          milestones.push({ title, description, period });
        }
      }
      
      // Include both old card format and new milestones array
      const formData = { 
        _id: ExistingDetail?._id || ExistingDetail, 
        ...data,
        milestones
      };
      
      const response = await AdminLandingConfig(formData).unwrap();
      
      if (response) {
        toast.success(response.message || "Changes saved successfully");
        router.push(paths.admin.configuration);
      } else {
        toast.error("Couldn't update configuration");
      }
    } catch (error) {
      console.error("Error saving configuration:", error);
      toast.error("Failed to save changes");
    } finally {
      setIsLoading(false);
    }
  }

  const renderCardFields = (cardNumber: number) => {
    const prefix = `card${cardNumber}` as const;

    const titleKey = `${prefix}title` as keyof z.infer<typeof LandingConfigSchema>;
    const descriptionKey = `${prefix}description` as keyof z.infer<typeof LandingConfigSchema>;
    const dateKey = `${prefix}Date` as keyof z.infer<typeof LandingConfigSchema>;

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
                    value={formatDateForInput(field.value)}
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
    <div className="w-full max-w-6xl mx-auto">
      <h1 className="text-2xl font-semibold mb-6 p-4">Projects Journey</h1>

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
                  Card {index + 1}
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