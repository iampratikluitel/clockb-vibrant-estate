"use client"
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
import FileUpload from "@/components/ui/file-upload";

const BrochureUpload = () => {
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
            <BreadcrumbLink href={paths.admin.configuration}>
              Configuration
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Brochure Upload</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>

      <div className="p-4 space-y-8">
        <div className="border p-6 rounded-lg">
          <h2 className="text-xl font-semibold mb-4">Investment Brochure</h2>
          <FileUpload
            accept=".pdf"
            label="Upload PDF Brochure"
            onUpload={(file) => console.log('Uploaded file:', file)}
            currentFile="/current-brochure.pdf"
          />
        </div>


      </div>
    </div>
  );
};

export default BrochureUpload;