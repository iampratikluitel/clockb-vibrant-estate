"use client"
import { useGetAdminFaqsByIdQuery } from "@/store/api/Admin/adminFaqs";
import React from "react";
import FAQForm from "./FAQForm";

interface props {
  type: "Add" | "Edit";
  id: string;
}

const FAQBeforeForm = ({ type, id }: props) => {
  const { data: ExistingDetail, isLoading: Loading } =
    useGetAdminFaqsByIdQuery(id);
  return (
    <>
      {Loading ? (
        <div className="h-[100vh] w-full flex justify-center items-center">
          <p className="loader"></p>
        </div>
      ) : (
        <FAQForm type={type} ExistingDetail={ExistingDetail} />
      )}
    </>
  );
};

export default FAQBeforeForm;
