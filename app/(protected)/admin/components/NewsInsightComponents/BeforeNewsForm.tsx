"use client"
import { useGetAdminNewsInsightByIdQuery } from "@/store/api/Admin/adminNewsInsight";
import React from "react";
import NewsForm from "./newAddForm";

interface props {
  type: "Add" | "Edit"
  newsCategory: any[];
  id: string;
}

export default function BeforeNewsForm({type, newsCategory, id}: props) { 
  const { data: NewsInsight, isLoading: NewsInsightLoading } =
    useGetAdminNewsInsightByIdQuery(id);
  return (
    <>
    {NewsInsightLoading ? (
      <div className="h-[100vh] w-full flex justify-center items-center">
        <p className="loader"></p>
      </div>
    ) : (
      <>
        {NewsInsight && (
          <NewsForm
            type={type}
            ExistingDetails={NewsInsight}
            newsCategory={newsCategory}
          />
        )}
      </>
    )}
  </>
  );
}
