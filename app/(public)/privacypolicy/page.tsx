"use client";

import PageLoader from "@/components/PageLoader";
import { useGetPublicConfigPrivacyPolicyQuery } from "@/store/api/Public/publicConfiguration";
import React from "react";

const Page = () => {
  const { data: ExistingDetail, isLoading: Loading } =
    useGetPublicConfigPrivacyPolicyQuery("");

  return (
    <>
      <main className="pt-24"> 
        <h1 className="px-4 md:px-28 md:py-4 font-semibold text-2xl">Privacy Policy</h1>
        {Loading ? (
          <PageLoader />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: ExistingDetail?.description as string,
            }}
            className="px-4 md:px-28 md:py-5 bg-white"
          ></div>
        )}
      </main>
    </>
  );
};

export default Page;
