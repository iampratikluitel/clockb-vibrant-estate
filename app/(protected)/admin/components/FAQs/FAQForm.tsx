"use client";

import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: any;
}

const FormSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: z.string().min(2, {
    message: "Answer must be at least 2 characters.",
  }),
});

const FAQForm = ({ type, ExistingDetail }: props) => {
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: ExistingDetail?.question ?? "",
      answer: ExistingDetail?.answer ?? "",
    },
  });
  const router = useRouter();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    setLoading(true);
    try {
      const response = await fetch("/api/admin/FAQs", {
        method: type === "Edit" ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...data,
          id: ExistingDetail?._id,
        }),
      });

      const result = await response.json();

      if (!response.ok)
        throw new Error(result.message || "Something went wrong");

      toast.success(
        `FAQ ${type === "Edit" ? "updated" : "added"} successfully`
      );
      router.push("/admin/faqs");
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full space-y-6 p-4 bg-white"
      >
        <h1 className="font-semibold text-2xl">{type} FAQ</h1>
        <div className="flex w-full gap-4">
          <div className="w-1/2 flex flex-col gap-2">
            <FormField
              control={form.control}
              name="question"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Question</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Faq Question" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="answer"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Answer</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter Faq Answer" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
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

export default FAQForm;
