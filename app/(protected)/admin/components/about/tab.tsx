"use client";

import { useState } from "react";
import TeamTab from "./team-member-tab";
import PartnersTab from "./partner-tab";
import InvestmentCircle from "./investmentCircleForm";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainSectionTab from "./aboutHero";

export default function AdminAboutPage() {
  const [activeTab, setActiveTab] = useState("about");

  return (
    <div className="container mx-auto py-8">
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="flex justify-between gap-4 mb-8">
          <TabsTrigger
            value="about"
            className="flex-1 py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            About
          </TabsTrigger>

          <TabsTrigger
            value="team"
            className="flex-1 py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Team
          </TabsTrigger>

          <TabsTrigger
            value="partners"
            className="flex-1 py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Partners
          </TabsTrigger>

          <TabsTrigger
            value="investmentCircle"
            className="flex-1 py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Investment Circle
          </TabsTrigger>
        </TabsList>

        <TabsContent value="about">
          <MainSectionTab />
        </TabsContent>

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
