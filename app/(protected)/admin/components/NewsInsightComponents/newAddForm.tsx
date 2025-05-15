"use client";

import { ApiResponse, NEWSINSIGHT } from "@/lib/types";
import { useAdminAddUpdateNewsInsightMutation } from "@/store/api/Admin/adminNewsInsight";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { NewsSchema } from "./NewsSchema";
import { zodResolver } from "@hookform/resolvers/zod";
import { MINIOURL } from "@/lib/constants";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import AddNewsCategory from "./newsCategory";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrashIcon, Plus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { toast } from "sonner";
import { deleteNewsCategory } from "@/action/news-category";
import { uploadToMinIO } from "@/lib/helper";
import { paths } from "@/lib/paths";
import { Textarea } from "@/components/ui/textarea";

interface props {
  type: "Add" | "Edit";
  ExistingDetails?: any;
  newsCategory: any[];
}

const NewsForm = ({ type, ExistingDetails, newsCategory }: props) => {
  const [Loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  const router = useRouter();
  const [AdminAddUpdateNews] = useAdminAddUpdateNewsInsightMutation();

  const form = useForm<z.infer<typeof NewsSchema>>({
    resolver: zodResolver(NewsSchema),
    defaultValues: {
      title: ExistingDetails?.title ?? "",
      description: ExistingDetails?.description ?? "",
      author: ExistingDetails?.author ?? "",
      image: ExistingDetails?.image
        ? `/api/resources/download?filename=${encodeURIComponent(
            ExistingDetails?.image
          )}`
        : null,
      overview: ExistingDetails?.overview ?? "",
      categoryId: ExistingDetails?.categoryId ?? "",
    },
  });

  async function onSubmit(data: z.infer<typeof NewsSchema>) {
    try {
      if (type == "Add") {
        setLoading(true);
        if (!data.image) {
          toast.error("Please select Image");
          return;
        }
        let uploadedFileName;
        if (data.image) {
          uploadedFileName = await uploadToMinIO(data.image, "newsinsight");
          if (uploadedFileName === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }
        const formData = {
          ...data,
          image: uploadedFileName,
        };
        const response = await AdminAddUpdateNews({
          ...formData,
        }).unwrap();
        if (response) {
          const responseData = response as ApiResponse;
          toast.success(responseData.message);
          router.push(`${paths.admin.newsinsight}?id=${responseData.data}`);
          setLoading(false);
        } else {
          toast.error(`Couldn't Add`);
          setLoading(false);
        }
      } else if (type == "Edit") {
        setLoading(true);
        let ImageUrl = null;

        if (
          data.image !=
          `/api/resources/download?filename=${encodeURIComponent(
            ExistingDetails?.image ?? ""
          )}`
        ) {
          ImageUrl = await uploadToMinIO(data.image, "newsinsight");
          if (ImageUrl === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          _id: ExistingDetails?._id,
          ...data,
          image: ImageUrl ?? ExistingDetails?.image,
        };
        const response = await AdminAddUpdateNews({
          ...formData,
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
          router.push(`${paths.admin.newsinsight}`);
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

  const handleCategoryDelete = async (id: string) => {
    toast.promise(
      deleteNewsCategory(
        id,
        type == "Add"
          ? "/admin/news/add"
          : `admin/news/edit?id=${ExistingDetails?._id}`
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
            <AddNewsCategory type={type} setIsOpen={setIsOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6 p-4 bg-white"
        >
          <div className="flex w-full gap-4 flex-col md:flex-row">
            <div className="w-full md:w-1/2 flex flex-col gap-2">
              <div className="text-2xl font-semibold">Add News and Insights</div>
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>News Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter News Title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="author"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Author</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter the author name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="description"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>News Description</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter Short Description"
                        {...field}
                      />
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
                          {newsCategory && newsCategory.length > 0 ? (
                            newsCategory.map((element, index) => (
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

              <ReactQuillEditor name="overview" label="News Overview" />
            </div>
            <div className="w-1/2 space-y-2">
              <SCNSingleImagePicker
                name="NewsInsight Image"
                variant="imageBox"
                schemaName="image"
              ></SCNSingleImagePicker>
              {/* <ReactQuillEditor name="overview" label="News Overview" /> */}
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

export default NewsForm;
