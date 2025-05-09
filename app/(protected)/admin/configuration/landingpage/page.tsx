"use client";

import React from "react";
import { useGetAdminConfigLandingPageQuery } from "@/store/api/Admin/adminConfiguration";
import LandingConfiguration from "../../components/configuration/landingConfigTab";
import { Breadcrumb, BreadcrumbList, BreadcrumbItem, BreadcrumbLink, BreadcrumbSeparator, BreadcrumbPage } from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const LandingPageConfig = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigLandingPageQuery("");
  console.log(ConfigData);

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
            <BreadcrumbLink href={paths.admin.projectjourney}>
              ProjectJourney
            </BreadcrumbLink>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <LandingConfiguration ExistingDetail={ConfigData}/>
      )}
      </div>
  );
};

export default LandingPageConfig;
