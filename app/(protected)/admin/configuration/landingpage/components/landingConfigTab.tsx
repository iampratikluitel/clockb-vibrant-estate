"use client"

import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import LandingMainConfig from "./landing-main-section"
import LandingSecondSection from "./Landing-why-choose-use-card"
import LandingThirdSection from "./landing-why-invest-with-us"

export default function LandingConfigTab() {
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
            Main Section
          </TabsTrigger>
          <TabsTrigger 
            value="team" 
            className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
            Why Choose us
          </TabsTrigger>
          <TabsTrigger 
            value="partners" 
            className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
          >
           Why Invest With us
          </TabsTrigger>
        </TabsList>

        {/* Tab Components */}
        <TabsContent value="general">
          <LandingMainConfig />
        </TabsContent>

        <TabsContent value="team">
          <LandingSecondSection />
        </TabsContent>

        <TabsContent value="partners">
          <LandingThirdSection />
        </TabsContent>
      </Tabs>
    </div>
  )
}
