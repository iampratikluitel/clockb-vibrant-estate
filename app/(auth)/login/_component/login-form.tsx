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
import { login } from "@/action/login/index";
import { LoadingButton } from "@/components/ui/loading-button";
import { paths } from "@/lib/paths";
import Link from "next/link";

const registerSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
  password: z.string().min(1, "Password should not be empty"),
});
const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl");

  const [showPassword, setShowPassword] = React.useState(false);

  const form = useForm<z.infer<typeof registerSchema>>({
    resolver: zodResolver(registerSchema),
  });

  async function onSubmit(values: z.infer<typeof registerSchema>) {
    console.log("values",values)
    try {
      await login(values, callbackUrl).then((response) => {
        if(!response){
        toast.success("Welcome to Project Estate");
        }
        if (response?.error) {
          toast.error(response.error);
        }
      });
    } catch (error: any) {
      toast.error(`${error.message}`);
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
                    <Input placeholder="john@gmail.com" {...field} value={field.value || ''} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
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
          </div>
        </div>
        <Link
          href={paths.public.forgotpassword}
          className="underline text-primary"
        >
          Forgot Password?
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

export default LoginForm;
