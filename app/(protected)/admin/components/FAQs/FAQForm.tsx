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
import { useAdminAddUpdateFaqsMutation } from "@/store/api/Admin/adminFaqs";
import { paths } from "@/lib/paths";

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
  category: z.string().optional(),
});

const FAQForm = ({ type, ExistingDetail }: props) => {
  const [Loading, setLoading] = useState(false);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: ExistingDetail?.question ?? "",
      answer: ExistingDetail?.answer ?? "",
      category: ExistingDetail?.category ?? "",
    },
  });
  const router = useRouter();

  const [AdminAddUpdateFaqs] = useAdminAddUpdateFaqsMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      if (type == "Add") {
        setLoading(true);
        const response = await AdminAddUpdateFaqs({
          ...data,
        }).unwrap();
        if (response) {
          toast.success(response.message);
          router.push(`${paths.admin.faqs}`);
          setLoading(false);
        } else {
          toast.error(`Couldn't Add`);
          setLoading(false);
        }
      } else if (type == "Edit") {
        setLoading(true);

        const response = await AdminAddUpdateFaqs({
          _id: ExistingDetail?._id,
          ...data,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
          router.push(`${paths.admin.faqs}`);
        } else {
          toast.error(`Couldn't Edit`);
          setLoading(false);
        }
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
            <FormField
              control={form.control}
              name="category"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Category</FormLabel>
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
