"use client";

import { useState } from "react";
import TeamTab from "./team-member-tab";
import PartnersTab from "./partner-tab";
import InvestmentCircle from "./investmentCircleForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState("team");

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          About Page Management
        </h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 gap-4">
          <TabsTrigger
            value="team"
            className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Team Members
          </TabsTrigger>

          <TabsTrigger
            value="partners"
            className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Partners
          </TabsTrigger>

          <TabsTrigger
            value="investmentCircle"
            className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Managed by investment Circle
          </TabsTrigger>
        </TabsList>

        {/* Tab Components */}
        <TabsContent value="team">
          <TeamTab />
        </TabsContent>

        <TabsContent value="partners">
          <PartnersTab />
        </TabsContent>

        <TabsContent value="investmentCircle">
          <InvestmentCircle />
        </TabsContent>
      </Tabs>
    </div>
  );
}
