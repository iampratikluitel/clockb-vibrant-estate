"use client";

import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import PageLoader from "@/components/PageLoader";
import { useGetPublicConfigConditionsOfUseQuery } from "@/store/api/Public/publicConfiguration";
import React from "react";

const Page = () => {
  const { data: ExistingDetail, isLoading: Loading } =
    useGetPublicConfigConditionsOfUseQuery("");

  return (
    <>
      <Header />
      {Loading ? (
        <PageLoader />
      ) : (
        <div
          dangerouslySetInnerHTML={{
            __html: ExistingDetail?.description as string,
          }}
          className="md:px-28 md:py-10 bg-white"
        ></div>
      )}
      <Footer />
    </>
  );
};

export default Page;
