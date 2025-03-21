"use client";
import React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "lucide-react";
import { toast } from "sonner";
import { useRouter, useSearchParams } from "next/navigation";
import { LoadingButton } from "@/components/ui/loading-button";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { useResetPasswordMutation } from "@/store/api/Public/publicFunctions";

const formSchema = z.object({
  password: z.string().min(1, "Password should not be empty"),
  confirmpassword: z.string().min(1, "Conform Password should not be empty"),
});
const ResetPasswordForm = () => {
  const [ResetPassword] = useResetPasswordMutation();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const router = useRouter();

  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(data: z.infer<typeof formSchema>) {
    try {
      if (data.password !== data.confirmpassword) {
        toast.error("Password and Confirm Password donot match");
        return;
      }
      const response = await ResetPassword({
        token: token,
        password: data.password,
      }).unwrap();
      if (response.message === "Link Invalid or Expired") {
        toast.error(`${response.message}`);
      } else if (response.message === "Password Reset successfull") {
        toast.success(`${response.message}`);
        router.push(paths.public.login);
      } else {
        toast.error(`Something Went Wrong`);
      }
    } catch (error) {
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
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="*****"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmpassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirm Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        placeholder="*****"
                        type={showPassword ? "text" : "password"}
                        {...field}
                      />

                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                        onClick={() => setShowPassword((prev) => !prev)}
                      >
                        {showPassword ? (
                          <EyeIcon className="h-4 w-4" aria-hidden="true" />
                        ) : (
                          <EyeOffIcon className="h-4 w-4" aria-hidden="true" />
                        )}
                        <span className="sr-only">
                          {showPassword ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
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
            Reset
          </LoadingButton>
        </div>
      </form>
    </Form>
  );
};

export default ResetPasswordForm;
