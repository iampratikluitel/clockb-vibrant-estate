"use client";
import React from "react";
import { useGetAdminConfigPrivacyPolicyQuery } from "@/store/api/Admin/adminConfiguration";
import PrivacyPolicyForm from "../components/PrivacyPolicy/PrivacyPolicyForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const ConditionsOfUse = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigPrivacyPolicyQuery("");

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
            <BreadcrumbLink href={paths.admin.configuration}>
              Configurations
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Privacy Policy</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <PrivacyPolicyForm ConfigData={ConfigData} />
      )}
    </>
  );
};

export default ConditionsOfUse;
