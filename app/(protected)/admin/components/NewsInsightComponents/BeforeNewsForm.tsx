import { useGetAdminNewsInsightByIdQuery, useGetAllAdminNewsInsightsQuery } from "@/store/api/Admin/adminNewsInsight";
import React from "react";
import AddNewsForm from "./newAddForm";
import PageLoader from "@/components/PageLoader";
import NewsForm from "./newAddForm";

export default function BeforeNewsForm() {
  const { data: NewsData, isLoading: NewsInsightLoading } =
    useGetAdminNewsInsightByIdQuery('id');
  return (
    <div>
      {NewsInsightLoading ? (
        <PageLoader />
      ) : (
        <NewsForm type={"Edit"} newsCategory={[]} />
      )}
    </div>
  );
}
