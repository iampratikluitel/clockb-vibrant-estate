"use client"
import PageLoader from "@/components/PageLoader";
import { useGetAdminProjectByIdQuery } from "@/store/api/Admin/adminProject";
import React from "react";
import AddProjectForm from "./projectForm";

interface props {
  type: "Add" | "Edit";
  projectCategory: any[];
  id: string;
}

export default function BeforeProjectForm({
  type,
  projectCategory,
  id,
}: props) {
  const { data: Project, isLoading: ProjectLoading } =
    useGetAdminProjectByIdQuery(id);
  return (
    <div>
      {ProjectLoading ? (
        <div>
          <PageLoader />
        </div>
      ) : (
        <AddProjectForm
          type={type}
          ExistingDetail={Project}
          projectCategory={projectCategory}
        />
      )}
    </div>
  );
}
