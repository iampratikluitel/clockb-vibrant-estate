"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Button } from "@/components/ui/button"
import { Eye, Save } from "lucide-react"
import GeneralTab from "./general-tab"
import TeamTab from "./team-tab"
import PartnersTab from "./partner-tab"
// import PreviewTab from "./PreviewTab"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Manage from "./manage-investment-circle"

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
        <h1 className="text-3xl font-bold">About Page Management</h1>
        <div className="flex gap-2">
          {/* <Button variant="outline" onClick={() => setActiveTab("preview")}>
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button> */}
          <Button onClick={saveChanges}>
            <Save className="mr-2 h-4 w-4" />
            Save All Changes
          </Button>
        </div>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-8">
          <TabsTrigger value="general">General</TabsTrigger>
          <TabsTrigger value="team">Team Members</TabsTrigger>
          <TabsTrigger value="partners">Partners</TabsTrigger>
          <TabsTrigger value="managed">Manage</TabsTrigger>
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

        <TabsContent value="preview">
          <Manage />
        </TabsContent>
      </Tabs>
    </div>
  )
}
