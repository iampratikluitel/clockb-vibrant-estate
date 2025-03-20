"use client";

import React from "react";
import LandingForm from "../../components/configuration/landingForm";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { useGetAdminConfigLandingPageQuery } from "@/store/api/Admin/adminConfiguration";

const LandingPageEditorContent = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigLandingPageQuery("");
    console.log(ConfigData)
    
  return (
    <div>
      <h1 className="flex text-4xl font-semibold pb-4 justify-center items-center">
        Landing Page Configuration
      </h1>
      <LandingForm ConfigData={ConfigData} />
    </div>
  );
};

// Wrap the entire page with Provider
const LandingPageEditor = () => (
  <Provider store={store}>
    <LandingPageEditorContent />
  </Provider>
);

export default LandingPageEditor;
