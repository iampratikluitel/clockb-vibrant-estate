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
import AddProjectForm from "../../components/projectDescription/projectForm";

const AddProject = () => {
  return (
    <div className="px-5 py-10">
      <Breadcrumb className="mb-2">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.news}>
              Project Description
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AddProjectForm type={"Add"} />
    </div>
  );
};

export default AddProject;
