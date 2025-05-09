import { CONDITIONSOFUSE } from "@/lib/types";
import React, { useState } from "react";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
} from "@/components/ui/form";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import { Button } from "@/components/ui/button";
import { useAdminAddUpdateConditionsOfUseMutation } from "@/store/api/Admin/adminConfiguration";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
import { paths } from "@/lib/paths";

const FormSchema = z.object({
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
});

interface props {
  ConfigData: CONDITIONSOFUSE | undefined;
}

const ConditionsOfUseForm = ({ ConfigData }: props) => {
  const [Loading, setLoading] = useState(false);
  const [AddUpdateConditionsOfUse] = useAdminAddUpdateConditionsOfUseMutation();
  const router = useRouter();



  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      description: ConfigData?.description ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
        setLoading(true);
        const formData = {
          _id: ConfigData?._id,
          ...data,
        };
        const response = await AddUpdateConditionsOfUse({
          ...formData,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
        } else {
          toast.error(`Couldn't Update`);
          setLoading(false);
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
        <h1 className="font-semibold text-2xl">Conditions Of Use</h1>
        <ReactQuillEditor name="description" label="" />
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

export default ConditionsOfUseForm;
