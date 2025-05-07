"use client";

import React from "react";
import { useGetAdminDevelopmentPhaseQuery } from "@/store/api/Admin/adminDevelopmentPhase";
import DevelopmentPhaseForm from "../components/phases/DevelopmentPhaseForm";

const DevelopmentPhase = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminDevelopmentPhaseQuery("");
  console.log(ConfigData);

  return (
    <div>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <DevelopmentPhaseForm ExistingDetail={ConfigData} />
      )}
      </div>
  );
};

export default DevelopmentPhase;
