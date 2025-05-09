import Link from "next/link";
import React from "react";
import FaqTable from "../components/FAQs/FaqTable";
import { Button } from "@/components/ui/button";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";

const Faqs = () => {
  return (
    <div className="p-4 bg-white">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.faqs}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>FAQ</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">FAQs</h1>
        <div className="flex justify-end">
          <Link href="/admin/faqs/add" className="self-end">
            <Button variant="default" className="m-4">
              Add FAQ
            </Button>
          </Link>
        </div>
      </div>

      <FaqTable />
    </div>
  );
};

export default Faqs;
