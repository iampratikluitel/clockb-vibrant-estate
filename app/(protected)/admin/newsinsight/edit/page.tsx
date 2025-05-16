import React from "react";
import BeforeNewsForm from "../../components/NewsInsightComponents/BeforeNewsForm";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import { connectDb } from "@/lib/mongodb";
import NewsInsightCategory from "@/model/NewsInsights/NewsInsightCategory";

type Props = {
  params: {};
  searchParams: { id: string };
};

const Edit = async (props: Props) => {
  const { id } = props.searchParams;

  await connectDb();
  const categories = await NewsInsightCategory.find({ status: true }).lean();
  const plainCategories = categories.map((category: any) => ({
    ...category,
    _id: category._id.toString(),
  }));

  return (
    <>
      <Breadcrumb className="p-4 bg-white">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.newsinsight}>
              News and Insights
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Edit News and Insights</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <BeforeNewsForm type={"Edit"} newsCategory={plainCategories} id={id} />
    </>
  );
};

export default Edit;
