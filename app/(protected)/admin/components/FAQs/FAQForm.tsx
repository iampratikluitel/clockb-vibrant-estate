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
import { FAQ } from "@/lib/types";
import { deleteFaqCategory } from "@/action/faq-category";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import AddfaqCategory from "./faqCategory";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { TrashIcon, Plus } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: FAQ;
  faqCategory: any[];
}

const FormSchema = z.object({
  question: z.string().min(2, {
    message: "Question must be at least 2 characters.",
  }),
  answer: z.string().min(2, {
    message: "Answer must be at least 2 characters.",
  }),
  categoryId: z.string().min(2, {
    message: "CategoryId is required.",
  }),
});

const FAQForm = ({ type, ExistingDetail, faqCategory }: props) => {
  const [Loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const [AdminAddUpdateFaqs] = useAdminAddUpdateFaqsMutation();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      question: ExistingDetail?.question ?? "",
      answer: ExistingDetail?.answer ?? "",
      categoryId: ExistingDetail?.categoryId ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof FormSchema>) {
    try {
      setLoading(true);

      if (type === "Add") {
        const response = await AdminAddUpdateFaqs({ ...data }).unwrap();
        if (response) {
          toast.success(response.message);
          router.push(`${paths.admin.faqs}`);
        } else {
          toast.error(`Couldn't Add`);
        }
      } else if (type === "Edit") {
        const response = await AdminAddUpdateFaqs({
          _id: ExistingDetail?._id,
          ...data,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          router.push(`${paths.admin.faqs}`);
        } else {
          toast.error(`Couldn't Edit`);
        }
      }
    } catch (error) {
      console.log(error);
      toast.error(`Failed`);
    } finally {
      setLoading(false);
    }
  }

  const handleCategoryDelete = async (id: string) => {
    toast.promise(
      deleteFaqCategory(
        id,
        type == "Add"
          ? "/admin/faqs/add"
          : `admin/faqs/edit?id=${ExistingDetail?._id}`
      ),
      {
        loading: "Deleting...",
        success: <b>Deleted</b>,
        error: <b>Error while deleting</b>,
      }
    );
  };

  return (
    <>
       <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="">
          <DialogHeader className="">
            <DialogTitle>Add FAQ Category</DialogTitle>
            <AddfaqCategory type={type} setIsOpen={setIsOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
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
                      <Textarea placeholder="Enter Faq Answer" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="relative flex items-center justify-start">
                <FormField
                  control={form.control}
                  name="categoryId"
                  render={({ field }) => (
                    <FormItem className="w-full md:w-[15rem]">
                      <FormLabel>Category</FormLabel>
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category to display" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {faqCategory && faqCategory.length > 0 ? (
                            faqCategory.map((element, index) => (
                              <div
                                key={index}
                                className="flex gap-x-2 items-center"
                              >
                                <SelectItem key={index} value={element._id}>
                                  <div className="flex items-center justify-between space-x-2">
                                    <p>{element.name}</p>
                                  </div>
                                </SelectItem>
                                <TrashIcon
                                  className="text-red-500 hover:text-red-800 cursor-pointer duration-300"
                                  onClick={(e) => {
                                    e.preventDefault();
                                    handleCategoryDelete(element._id);
                                  }}
                                />
                              </div>
                            ))
                          ) : (
                            <SelectItem value="no-options" disabled>
                              No categories available
                            </SelectItem>
                          )}
                        </SelectContent>
                      </Select>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <div
                  className="absolute top-10 right-0 md:left-72 cursor-pointer"
                  onClick={() => setIsOpen(true)}
                >
                  <Plus />
                </div>
              </div>
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
    </>
  );
};

export default FAQForm;
