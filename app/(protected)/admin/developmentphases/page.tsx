"use client";

import React from "react";
import { useGetAdminDevelopmentPhaseQuery } from "@/store/api/Admin/adminDevelopmentPhase";
import DevelopmentPhaseForm from "../components/phases/DevelopmentPhaseForm";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const DevelopmentPhase = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminDevelopmentPhaseQuery("");

  return (
    <div className="p-4 bg-white">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.phases}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Development Phases</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <DevelopmentPhaseForm ExistingDetail={Array.isArray(ConfigData) ? ConfigData[0] : ConfigData} />
      )}
      </div>
  );
};

export default DevelopmentPhase;
