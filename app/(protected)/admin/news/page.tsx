import React from "react";
import NewsTable from "../components/NewsInsightComponents/newsTable";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function NewsInsight() {
  return (
    <div className="px-5 py-10">
    <Breadcrumb className="">
      <BreadcrumbList>
        <BreadcrumbItem>
          <BreadcrumbLink href={paths.admin.news}>Dashboard</BreadcrumbLink>
        </BreadcrumbItem>
        <BreadcrumbSeparator />
        <BreadcrumbItem>
          <BreadcrumbPage>News</BreadcrumbPage>
        </BreadcrumbItem>
      </BreadcrumbList>
    </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">News And Insight</h1>
        <div className="flex justify-end">
          <Link href={paths.admin.addNews} className="self-end">
            <Button className="m-4">Add News </Button>
          </Link>
        </div>
      </div>
      <NewsTable />
    </div>
  );
}
