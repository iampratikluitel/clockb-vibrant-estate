"use client";

import PageLoader from "@/components/PageLoader";
import { useGetPublicConfigConditionsOfUseQuery } from "@/store/api/Public/publicConfiguration";
import React from "react";

const Page = () => {
  const { data: ExistingDetail, isLoading: Loading } =
    useGetPublicConfigConditionsOfUseQuery("");

  return (
    <main className="pt-24 pb-10"> {/* Added pb-10 for bottom spacing */}
      <div className="px-4 md:px-28 py-6 md:py-10">
        <h1 className="font-semibold text-xl mb-4 pl-2">Terms and Conditions</h1>

        {Loading ? (
          <PageLoader />
        ) : (
          <div
            dangerouslySetInnerHTML={{
              __html: ExistingDetail?.description as string,
            }}
            className="bg-white p-2 rounded-md shadow-sm"
          ></div>
        )}
      </div>
    </main>
  );
};

export default Page;
