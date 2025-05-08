"use client";

import Footer from "@/components/homepage/Footer";
import Header from "@/components/homepage/Header";
import PageLoader from "@/components/PageLoader";
import { useGetPublicConfigPrivacyPolicyQuery } from "@/store/api/Public/publicConfiguration";
import React from "react";

const Page = () => {
  const { data: ExistingDetail, isLoading: Loading } =
    useGetPublicConfigPrivacyPolicyQuery("");

  return (
    <>
      <Header />
      <main className="pt-24"> {/* Adjust based on header height */}
        <h1 className="md:px-28 md:py-4 font-semibold text-2xl">Privacy Policy</h1>
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
      <Footer />
    </>
  );
};

export default Page;
