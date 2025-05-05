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
import AddNewsForm from "../../components/NewsInsightComponents/newAddForm";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";
import { connectDb } from "@/lib/mongodb";

const AddNews = async () => {
  await connectDb();
  const categories = await NewsInsightCategory.find({ status: true }).lean();
  const plainCategories = categories.map((category: any) => ({
    ...category,
    _id: category._id.toString(),
  }));

  return (
    <div className="px-5 py-10">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.newsinsight}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.newsinsight}>News</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>AddNews</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <AddNewsForm type={"Add"} newsCategory={plainCategories} />
    </div>
  );
};

export default AddNews;
