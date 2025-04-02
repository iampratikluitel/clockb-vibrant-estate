"use client";

import React from "react";
import { useGetAdminConfigLandingPageQuery } from "@/store/api/Admin/adminConfiguration";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import LandingConfigTab from "./components/landingConfigTab";
import LandingConfiguration from "./components/landingConfigTab";

const LandingPageConfig = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigLandingPageQuery("");
  console.log(ConfigData);

  return (
    <div>
      <Breadcrumb className="p-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashbord
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.configuration}>
              Configuration
            </BreadcrumbLink>
            <BreadcrumbSeparator />
          </BreadcrumbItem>
          <BreadcrumbItem>
            <BreadcrumbPage>LandingPage</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <LandingConfiguration />
      )}
      </div>
  );
};

export default LandingPageConfig;
