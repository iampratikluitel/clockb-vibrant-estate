import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import Link from "next/link";
import React from "react";

const Configuration = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-800 mb-6">Configurations</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {configLinks.map((item) => (
          <Link
            key={item.path}
            href={item.path}
            className="group block p-6 bg-white border border-gray-300 rounded-xl shadow-sm hover:shadow-md hover:border-gray-400 transition-all"
          >
            <h2 className="text-xl font-semibold text-gray-900 group-hover:text-blue-600">
              {item.name}
            </h2>
            <p className="text-sm text-gray-600 mt-1">{item.description}</p>
          </Link>
        ))}
      </div>
    </div>
  );
};

const configLinks = [
  {
    name: "Landing Page",
    path: "/admin/configuration/landingpage",
    description: "Manage and customize your landing page content.",
  },
  {
    name: "Download Brochure",
    path: "/admin/configuration/download-brochure",
    description: "Download the Brochure",
  },
  {
    name: "Footer",
    path: "/admin/configuration/footer",
    description: "Edit footer links, design, and information.",
  },
];

export default Configuration;
