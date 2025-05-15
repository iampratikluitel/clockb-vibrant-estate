"use client";
import React from "react";
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
import TermsAndConditionForm from "../components/configuration/TermsAndCondition";

const TermsAndConditions = () => {
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
            <BreadcrumbPage>Terms And Conditions</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <TermsAndConditionForm ConfigData={ConfigData} />
      )}
    </>
  );
};

export default TermsAndConditions;
