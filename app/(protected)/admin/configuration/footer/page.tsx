"use client"

import React from "react";
import FooterForm from "../../components/configuration/FooterForm";
import { useGetAdminConfigFooterQuery } from "@/store/api/Admin/adminConfiguration";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const FooterConfig = () => {
  const { data: ConfigData, isLoading: Loading } =
    useGetAdminConfigFooterQuery("");
    
  return (
    <>
    {Loading ? (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <p className="loader"></p>
      </div>
    ) : (
      <FooterForm ConfigData={ConfigData} />
    )}
    </>
  );
};

const FooterConfigEditor = () => (
  <Provider store={store}>
    <FooterConfig />
  </Provider>
);

export default FooterConfigEditor;
