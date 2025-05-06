'use client';

import { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import ProjectUpdatesAdmin from "./components/ProjectUpdatesAdmin";
import LegalDocumentsAdmin from "./components/LegalDocumentsAdmin";
import FaqsGuidesAdmin from "./components/FaqsGuidesAdmin";
import DocumentsAdmin from "./components/DocumentsAdmin";
import InvestmentDocsAdmin from "./components/InvestmentDocsAdmin";
import InvestorKitAdmin from "./components/InvestorKitAdmin";
import InvestorRelationsAdmin from "./components/InvestorRelationsAdmin";
import SiteVisitsAdmin from "./components/SiteVisitsAdmin";

export default function AdminResourcesPage() {
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-8">Manage Resources</h1>
      
      <Tabs defaultValue="investor-kit" className="space-y-6">
        <TabsList>
          <TabsTrigger value="investor-kit">Investor Kit</TabsTrigger>
          <TabsTrigger value="investment-docs">Investment Documents</TabsTrigger>
          <TabsTrigger value="project-updates">Project Updates</TabsTrigger>
          <TabsTrigger value="legal-docs">Legal Documents</TabsTrigger>
          <TabsTrigger value="faqs">FAQs & Guides</TabsTrigger>
          <TabsTrigger value="contact-details">Contact Details</TabsTrigger>
          <TabsTrigger value="documents">Documents</TabsTrigger>
          <TabsTrigger value="site-visits">Site Visits</TabsTrigger>
        </TabsList>
        
        <TabsContent value="investor-kit">
          <InvestorKitAdmin />
        </TabsContent>
        
        <TabsContent value="investment-docs">
          <InvestmentDocsAdmin />
        </TabsContent>
        
        <TabsContent value="project-updates">
          <ProjectUpdatesAdmin />
        </TabsContent>
        
        <TabsContent value="legal-docs">
          <LegalDocumentsAdmin />
        </TabsContent>
        
        <TabsContent value="faqs">
          <FaqsGuidesAdmin />
        </TabsContent>
        
        <TabsContent value="contact-details">
          <InvestorRelationsAdmin />
        </TabsContent>
        
        <TabsContent value="documents">
          <DocumentsAdmin />
        </TabsContent>
        
        <TabsContent value="site-visits">
          <SiteVisitsAdmin />
        </TabsContent>
      </Tabs>
    </div>
  );
} 