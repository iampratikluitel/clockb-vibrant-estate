"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { usePublicSubscribeNewsLetterMutation } from "@/store/api/Public/publicFunctions";
import { zodResolver } from "@hookform/resolvers/zod";
import React from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

const FormSchema = z.object({
  email: z.string().email(),
});

export default function CallToAction() {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const [SubscribeNewsLetter] = usePublicSubscribeNewsLetterMutation();

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      const response = await SubscribeNewsLetter({
        ...data,
      }).unwrap();
      if (response) {
        toast.success(`${response.message}`);
        form.reset(); // reset the form after successful submission
      } else {
        toast.error(`Couldn't Subscribe`);
      }
    } catch (error) {
      toast.error(`Failed`);
    }
  }

  return (
    <section className="py-16 bg-estates-primary text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6 tracking-tight">
            Join Our Growing Investment Network
          </h2>
          <p className="text-lg text-white/90 mb-8 max-w-3xl mx-auto">
            Be part of Nepal&apos;s next major real estate success story.
            Invest in Saukhel Real Estate and secure long-term financial
            growth.
          </p>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-3 max-w-lg mx-auto mb-8"
          >
            <Input
              {...form.register("email")}
              type="email"
              placeholder="Your email address"
              className="bg-white/10 text-white border-white/20 placeholder:text-white/50"
              required
            />
            <Button
              type="submit"
              variant="default"
              className="bg-white text-estates-primary hover:bg-white/90"
              disabled={form.formState.isSubmitting} // disable button while submitting
            >
              {form.formState.isSubmitting ? "Submitting..." : "Request Information"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}