"use client";

import React from "react";
import BrochureConfigForm from "../../components/configuration/BrochureConfigForm";
import { useGetAdminConfigurationBrochureQuery } from "@/store/api/Admin/adminConfiguration";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const DownloadBrochure = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigurationBrochureQuery("");

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
            <BreadcrumbLink href={paths.admin.brochure}>
              Download Brochure
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div>
        {/* <h1 className="p-4 text-xl font-bold">Download Brochure</h1> */}
        </div>
      {Loading ? (
        <div className="w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <BrochureConfigForm />
      )}
    </div>
  );
};

const BrochurePageEditor = () => (
  <Provider store={store}>
    <DownloadBrochure />
  </Provider>
);

export default BrochurePageEditor;
