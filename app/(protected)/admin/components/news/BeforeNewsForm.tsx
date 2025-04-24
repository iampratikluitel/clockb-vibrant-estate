import { useGetAdminNewsInsightByIdQuery, useGetAllAdminNewsInsightsQuery } from "@/store/api/Admin/adminNewsInsight";
import React from "react";
import AddNewsForm from "./newAddForm";
import PageLoader from "@/components/PageLoader";

export default function BeforeNewsForm() {
  const { data: NewsData, isLoading: NewsInsightLoading } =
    useGetAdminNewsInsightByIdQuery('id');
  return (
    <div>
      {NewsInsightLoading ? (
        <PageLoader />
      ) : (
        <AddNewsForm type={"Edit"} ExistingDetail={NewsData} />
      )}
    </div>
  );
}
