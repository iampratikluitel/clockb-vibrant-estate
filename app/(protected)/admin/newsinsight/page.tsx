"use client";

import React from "react";
import NewsTable from "../components/NewsInsightComponents/newsInsightTable";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

export default function NewsInsight() {
  return (
    <div className="p-4 bg-white">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.newsinsight}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>News Insights</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">News And Insights</h1>
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
