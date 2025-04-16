import React from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Form } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import ReactQuillEditor from "@/components/ReactQuillEditor";

interface PrivacyPolicy {
  description: string;
}

interface PageProps {
  ConfigData: PrivacyPolicy;
}

const FormSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

const PrivacyPolicyForm = ({ ConfigData }: PageProps) => {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: ConfigData?.description ?? "",
    },
  });

  return (
    <Form {...form}>
      <form className="w-full space-y-6 p-4 bg-white">
        <h1 className="font-semibold text-2xl">Privacy Policy</h1>
        <ReactQuillEditor name="description" label="" />
        <div>
          <div className="loader"></div>
        </div>
        <Button type="submit" variant="default">
          Submit
        </Button>
      </form>
    </Form>
  );
};

export default PrivacyPolicyForm;
