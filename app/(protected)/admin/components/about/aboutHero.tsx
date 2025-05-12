import { Button } from "@/components/ui/button";
import Link from "next/link";
import React from "react";
import AboutForm from "./aboutHeroForm";
import { useGetAllAdminAboutHeroQuery } from "@/store/api/Admin/adminAboutPage";

const AboutSectionTab = () => {
  const { data: ConfigData, isLoading: Loading } =
      useGetAllAdminAboutHeroQuery("");

  return (
    <div className="flex justify-end">
      <AboutForm  ExistingDetail={ConfigData}/>
    </div>
  );
};

export default AboutSectionTab;
