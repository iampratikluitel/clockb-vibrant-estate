"use client";

import React from "react";
import BrochureConfigForm from "../../components/configuration/BrochureConfigForm";
import { useGetAdminConfigurationBrochureQuery } from "@/store/api/Admin/adminConfiguration";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const DownloadBrochure = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigurationBrochureQuery("");

  return (
    <div>
      {Loading ? (
        <div className="w-full h-[100vh] flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <BrochureConfigForm ConfigData={ConfigData} />
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
