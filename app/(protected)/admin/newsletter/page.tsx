import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import NewsLetterTable from "../components/newsletter/NewsLetterTable";

const NewsLetter = () => {
  return (
    <div className="px-5 py-10">
      <Breadcrumb >
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>NewsLetter</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="font-semibold text-2xl mt-4">NewsLetter</h1>
      <div>
        <NewsLetterTable />{" "}
      </div>
    </div>
  );
};

export default NewsLetter;
