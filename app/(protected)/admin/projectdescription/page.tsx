import React from "react";
import { paths } from "@/lib/paths";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import ProjectTable from "../components/projectDescription/projectTable";
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from "@/components/ui/breadcrumb";

export default function UpcommingProjects() {
  return (
    <div className="p-4 bg-white">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>Dashboard</BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Add Projects</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="flex items-center justify-between">
        <h1 className="font-semibold text-2xl">Upcomming Project</h1>
        <div className="flex justify-end">
          <Link href={paths.admin.addproject} className="self-end">
            <Button className="m-4">Add Project </Button>
          </Link>
        </div>
      </div>
      <ProjectTable />
    </div>
  );
}
