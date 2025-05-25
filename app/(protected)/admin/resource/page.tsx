"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
// import ProjectUpdatesAdmin from "./components/ProjectUpdatesAdmin";
// import LegalDocumentsAdmin from "./components/LegalDocumentsAdmin";
// import FaqsGuidesAdmin from "./components/FaqsGuidesAdmin";
// import InvestmentDocsAdmin from "./components/InvestmentDocsAdmin";
// import InvestorKitAdmin from "./components/InvestorKitAdmin";
// import InvestorRelationsAdmin from "./components/InvestorRelationsAdmin";
// import SiteVisitsAdmin from "./components/SiteVisitsAdmin";
import {
  Breadcrumb,
  BreadcrumbList,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbSeparator,
  BreadcrumbPage,
} from "@/components/ui/breadcrumb";
import { paths } from "@/lib/paths";
import InvestorKit from "../components/resources/InvestmentKit";

export default function AdminResourcesPage() {
  return (
    <div className="p-4 bg-white">
      <Breadcrumb className="">
        <BreadcrumbList>
          <BreadcrumbItem>
            <BreadcrumbLink href={paths.admin.resources}>
              Dashboard
            </BreadcrumbLink>
          </BreadcrumbItem>
          <BreadcrumbSeparator />
          <BreadcrumbItem>
            <BreadcrumbPage>Resources</BreadcrumbPage>
          </BreadcrumbItem>
        </BreadcrumbList>
      </Breadcrumb>
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-bold mb-8">Manage Resources</h1>

        <Tabs defaultValue="investor-kit" className="space-y-6">
          <TabsList className="w-full flex flex-wrap justify-between gap-2">
            <TabsTrigger value="investor-kit" className="flex-1 text-center">Investor Kit</TabsTrigger>
            <TabsTrigger value="investment-docs" className="flex-1 text-center">
              Investment Documents
            </TabsTrigger>
            <TabsTrigger value="project-updates" className="flex-1 text-center">Project Updates</TabsTrigger>
            <TabsTrigger value="legal-docs" className="flex-1 text-center">Legal Documents</TabsTrigger>
            <TabsTrigger value="faqs" className="flex-1 text-center">FAQs & Guides</TabsTrigger>
            <TabsTrigger value="contact-details" className="flex-1 text-center">Contact Details</TabsTrigger>
            <TabsTrigger value="site-visits" className="flex-1 text-center">Site Visits</TabsTrigger>
          </TabsList>

          <TabsContent value="investor-kit">
            <InvestorKit />
          </TabsContent>

          <TabsContent value="investment-docs">
            {/* <InvestmentDocument /> */}
          </TabsContent>

          <TabsContent value="project-updates">
            {/* <ProjectUpdatesAdmin /> */}
          </TabsContent>

          <TabsContent value="legal-docs">
            {/* <LegalDocumentsAdmin /> */}
          </TabsContent>

          <TabsContent value="faqs">
            {/* <FaqsGuidesAdmin /> */}
          </TabsContent>

          <TabsContent value="contact-details">
            {/* <InvestorRelationsAdmin /> */}
          </TabsContent>

          <TabsContent value="site-visits">
            {/* <SiteVisitsAdmin /> */}
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}
