"use client";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import SCNSingleImagePicker from "@/components/image-picker/SCNSingleImagePicker";
import ReactQuillEditor from "@/components/ReactQuillEditor";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useRouter } from "next/navigation";
import { uploadToMinIO } from "@/lib/helper";
import { paths } from "@/lib/paths";
import { ApiResponse, PROJECTDESCRIPTION } from "@/lib/types";
import { useAdminAddUpdateProjectMutation } from "@/store/api/Admin/adminProject";
import { deleteProjectCategory } from "@/action/project-category";
import AddProjectCategory from "./ProjectCategory";
import { Dialog, DialogContent, DialogHeader } from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { TrashIcon, Plus } from "lucide-react";

interface props {
  type: "Add" | "Edit";
  ExistingDetail?: PROJECTDESCRIPTION;
  projectCategory: any[];
}

const ProjectSchema = z.object({
  title: z.string().min(2, { message: "Title should be at least 2 word" }),
  description: z
    .string()
    .min(2, { message: "Title should be at least 2 word" }),
  image: z.any(),
  addedDate: z.date().optional(),
  overview: z.string().min(10, {
    message: "Overview must be at least 10 characters.",
  }),
  categoryId: z.string().min(2, {
    message: "CategoryId is required.",
  }),
});

export default function AddProjectForm({
  type,
  ExistingDetail,
  projectCategory,
}: props) {
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();

  const [AdminUpcommingProject] = useAdminAddUpdateProjectMutation();

  const form = useForm<z.infer<typeof ProjectSchema>>({
    resolver: zodResolver(ProjectSchema),
    defaultValues: {
      title: ExistingDetail?.title ?? "",
      description: ExistingDetail?.description ?? "",
      addedDate: ExistingDetail?.addedDate
        ? new Date(ExistingDetail.addedDate)
        : undefined,
      image: ExistingDetail?.image
        ? `/api/resources/download?filename=${encodeURIComponent(ExistingDetail.image)}`
        : null,
      overview: ExistingDetail?.overview ?? "",
      categoryId: ExistingDetail?.categoryId ?? "",
    },
  });

  const onSubmit = async (data: z.infer<typeof ProjectSchema>) => {
    try {
      if (type == "Add") {
        setLoading(true);
        if (!data.image) {
          toast.error("Please select Image");
          return;
        }

        let uploadedFileName;
        if (data.image) {
          uploadedFileName = await uploadToMinIO(data.image, "project");
          if (uploadedFileName === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          ...data,
          image: uploadedFileName || "",
        };

        const response = await AdminUpcommingProject({
          ...formData,
        }).unwrap();

        if (response) {
          const responseData = response as ApiResponse;
          toast.success(responseData.message);
          router.push(`${paths.admin.project}`);
          setLoading(false);
        } else {
          toast.error("Could not Add");
          setLoading(false);
        }
      } else if (type == "Edit") {
        setLoading(true);
        let ImageUrl = null;

        if (data.image != `/api/resources/download?filename=${encodeURIComponent(ExistingDetail?.image ?? "")}`) {
          ImageUrl = await uploadToMinIO(data.image, "project");
          if (ImageUrl === "") {
            toast.error("Image Upload Failed Please try again");
            return;
          }
        }

        const formData = {
          _id: ExistingDetail?._id,
          ...data,
          image: ImageUrl ?? ExistingDetail?.image,
        };

        const response = await AdminUpcommingProject({
          ...formData,
          _id: ExistingDetail?._id || "",
          logo: formData.image || "",
        }).unwrap();
        if (response) {
          toast.success(`${response.message}`);
          setLoading(false);
          router.push(`${paths.admin.project}`);
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
  };

  const handleCategoryDelete = async (id: string) => {
    toast.promise(
      deleteProjectCategory(
        id,
        type == "Add"
          ? "/admin/projectdescription/add"
          : `admin/projectdescription/edit?id=${ExistingDetail?._id}`
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
            <AddProjectCategory type={type} setIsOpen={setIsOpen} />
          </DialogHeader>
        </DialogContent>
      </Dialog>
      <div className="w-full max-w mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">{type} Projects</h1>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              {/* Left Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter Project Title" {...field} />
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
                      <FormLabel>Description</FormLabel>
                      <FormControl>
                        <Textarea
                          placeholder="Enter project Description"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="categoryId"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <div className="flex items-center gap-2">
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {projectCategory && projectCategory.length > 0 ? (
                            projectCategory.map((element, index) => (
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

                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => setIsOpen(true)}
                      >
                        <Plus />
                      </Button>
                    </div>

                    {field.value && (
                      <div className="mt-2">
                        {projectCategory.map((cat) =>
                          cat._id === field.value ? (
                            <div
                              key={cat._id}
                              className="flex items-center gap-2 text-sm text-gray-700"
                            >
                              <span>{cat.name}</span>
                              <TrashIcon
                                className="w-4 h-4 text-red-500 hover:text-red-700 cursor-pointer"
                                onClick={() => handleCategoryDelete(cat._id)}
                              />
                            </div>
                          ) : null
                        )}
                      </div>
                    )}
                    <FormMessage />
                  </FormItem>
                )}
              />

              {/* Right Column */}
              <div className="space-y-4">
                <FormField
                  control={form.control}
                  name="image"
                  render={() => (
                    <FormItem>
                      <SCNSingleImagePicker
                        name="Project Image"
                        variant="imageBox"
                        schemaName="image"
                      />
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
            </div>

            <FormField
              control={form.control}
              name="overview"
              render={() => (
                <FormItem>
                  <FormLabel>Project Overview</FormLabel>
                  <ReactQuillEditor name="overview" />
                </FormItem>
              )}
            />

            <div className="flex justify-end">
              <Button type="submit" disabled={loading}>
                {loading ? "Saving..." : "Submit"}
              </Button>
            </div>
          </form>
        </Form>
      </div>
    </>
  );
}