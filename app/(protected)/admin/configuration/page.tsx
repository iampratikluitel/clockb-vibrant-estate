import { paths } from "@/lib/paths";
import Link from "next/link";
import React from "react";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const Configuration = () => {
  return (
    <div>
      <Breadcrumb className="p-4">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.dashboard}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Configurations</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <h1 className="p-2 text-2xl font-semibold">Configurations</h1>

      <div className="flex gap-4 flex-wrap">
        <Link
          href={paths.admin.landingpage}
          className="m-2 p-2 border border-black bg-slate-200 hover:bg-slate-100"
        >
          Landing Page
        </Link>
        <Link
          href={paths.admin.brochureUpload}
          className="m-2 p-2 border border-black bg-slate-200 hover:bg-slate-100"
        >
          Brochure Upload
        </Link>
        <Link
          href={paths.admin.footer}
          className="m-2 p-2 border border-black bg-slate-200 hover:bg-slate-100"
        >
          Footer
        </Link>
      </div>
    </div>
  );
};

export default Configuration;