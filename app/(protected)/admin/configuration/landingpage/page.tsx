"use client";

import React from "react";
import { useGetAdminConfigLandingPageQuery } from "@/store/api/Admin/adminConfiguration";
import LandingConfiguration from "./components/landingConfigTab";

const LandingPageConfig = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigLandingPageQuery("");
  console.log(ConfigData);

  return (
    <div>
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
