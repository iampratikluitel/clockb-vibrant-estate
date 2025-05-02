import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import { connectDb } from "@/lib/mongodb";
import ProjectCategory from "@/model/Projects/ProjectCategory";
import AddProjectForm from "../../components/projectDescription/projectForm";

type Props = {
  params: {};
  searchParams: { id: string };
};

const Edit = async (props: Props) => {
  const { id } = props.searchParams;

  await connectDb();
  const categories = await ProjectCategory.find({ status: true }).lean();
  const plainCategories = categories.map((category: any) => ({
    ...category,
    _id: category._id.toString(),
  }));

  return (
    <>
      <Breadcrumb className="px-5 py-10 bg-white">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.projectdescription}>
              Project Description
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AddProjectForm type={"Edit"} projectCategory={plainCategories} />
    </>
  );
};

export default Edit;
