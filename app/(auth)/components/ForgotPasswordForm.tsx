"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { LoadingButton } from "@/components/ui/loading-button";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { useForgotPasswordMutation } from "@/store/api/Public/publicFunctions";

const formSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});
const ForgotPasswordForm = () => {
  const [ForgotPassword] = useForgotPasswordMutation();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      const response = await ForgotPassword({
        ...data,
      }).unwrap();
      if (response) {
        toast.success(`${response.message}`);
        form.reset({ email: "" });
      } else {
        toast.error(`Couldn't Submit`);
      }
    } catch (error) {
      console.log(error)
      toast.error(`Failed`);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex gap-x-2 mb-2">
          <div className="flex flex-col gap-y-6 w-[300px]">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input placeholder="john@gmail.com" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
        <Link href={paths.public.login} className="underline text-primary">
          Back to Login?
        </Link>
        <div className="flex flex-col items-end justify-end gap-y-2 w-full">
          <LoadingButton
            className="w-full"
            type="submit"
            loading={form.formState.isSubmitting}
          >
            Login
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ForgotPasswordForm;
