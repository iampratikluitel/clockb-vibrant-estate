"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import GeneralTab from "./general-tab"
import TeamTab from "./team-member-tab"
import PartnersTab from "./partner-tab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function AdminAboutPage() {
  const { toast } = useToast()
  const [activeTab, setActiveTab] = useState("general")

  const saveChanges = () => {
    toast({
      title: "Changes saved",
      description: "Your changes have been saved successfully.",
    })
  }

  return (
    <div className="container mx-auto py-8">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold text-gray-800">About Page Management</h1>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-3 mb-8 gap-4">
          <TabsTrigger 
            value="general" 
            className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            General
          </TabsTrigger>
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
        </TabsList>

        {/* Tab Components */}
        <TabsContent value="general">
          <GeneralTab />
        </TabsContent>

        <TabsContent value="team">
          <TeamTab />
        </TabsContent>

        <TabsContent value="partners">
          <PartnersTab />
        </TabsContent>
      </Tabs>
    </div>
  )
}
