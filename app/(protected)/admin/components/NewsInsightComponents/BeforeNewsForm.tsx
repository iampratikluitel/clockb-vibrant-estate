"use client";

import { useGetAdminNewsInsightByIdQuery } from "@/store/api/Admin/adminNewsInsight";
import React from "react";
import NewsForm from "./newAddForm";

interface Props {
  type: "Add" | "Edit";
  newsCategory: any[];
  id: string;
}

export default function BeforeNewsForm({ type, newsCategory, id }: Props) {
  const { data: NewsInsights, isLoading: NewsInsightsLoading } =
    useGetAdminNewsInsightByIdQuery(id);

  return (
    <>
      {NewsInsightsLoading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader animate-pulse"></p>
        </div>
      ) : (
        <NewsForm
          type={type}
          ExistingDetails={NewsInsights}
          newsCategory={newsCategory}
        />
      )}
    </>
  );
}