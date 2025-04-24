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
import AddNewsForm from "../../components/news/newAddForm";

const AddNews = () => {
  return (
    <div className="px-5 py-10">
      <AddNewsForm type={"Add"} />
    </div>
  );
};

export default AddNews;
