"use client";
import React from "react";
import ConditionsOfUseForm from "../components/configuration/ConditionsOfUseForm";
import { useGetAdminConfigConditionsOfUseQuery } from "@/store/api/Admin/adminConfiguration";
import { paths } from "@/lib/paths";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const ConditionsOfUse = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigConditionsOfUseQuery("");

  return (
    <>
      <Breadcrumb className="p-4 bg-white">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Conditions Of Use</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <ConditionsOfUseForm ConfigData={ConfigData} />
      )}
    </>
  );
};

export default ConditionsOfUse;
