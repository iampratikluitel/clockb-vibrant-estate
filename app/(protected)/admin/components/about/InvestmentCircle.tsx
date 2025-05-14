import React from "react";
import { useGetAllAdminInvestmentCircleQuery } from "@/store/api/Admin/adminAboutPage";
import InvestmentCircleForm from "./investmentCircleForm";

const InvestmentCircleTab = () => {
  const { data: ConfigData, isLoading: Loading } =
      useGetAllAdminInvestmentCircleQuery("");

  return (
    <div className="">
      <InvestmentCircleForm  ExistingDetail={ConfigData}/>
    </div>
  );
};

export default InvestmentCircleTab;
