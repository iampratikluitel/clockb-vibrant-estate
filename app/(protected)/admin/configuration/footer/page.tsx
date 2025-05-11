"use client";

import React from "react";
import FooterForm from "../../components/configuration/FooterForm";
import { useGetAdminConfigFooterQuery } from "@/store/api/Admin/adminConfiguration";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const FooterConfig = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigFooterQuery("");

  return (
    <div className="p-4 bg-white">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.configuration}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Configuration</BreadcrumbPage>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.footer}>Footer</BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <FooterForm ConfigData={ConfigData} />
      )}
    </div>
  );
};

export default FooterConfig;
