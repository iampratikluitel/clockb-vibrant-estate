"use client";

import PageLoader from "@/components/PageLoader";
import { useGetPublicConfigPrivacyPolicyQuery } from "@/store/api/Public/publicConfiguration";
import React from "react";

const Page = () => {
  const { data: ExistingDetail, isLoading: Loading } =
    useGetPublicConfigPrivacyPolicyQuery("");

  return (
    <main className="pt-24 pb-10"> {/* Added bottom padding */}
      <div className="px-4 md:px-28 py-6 md:py-10">
        <h1 className="font-semibold text-xl mb-4 pl-4">Privacy Policy</h1>

        {Loading ? (
          <PageLoader />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: ExistingDetail?.description as string,
            }}
            className="bg-white p-4 rounded-md shadow-sm"
          ></div>
        )}
      </div>
    </main>
  );
};

export default Page;
