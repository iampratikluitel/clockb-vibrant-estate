// "use client"

// import { useState } from "react"
// import { useToast } from "@/hooks/use-toast"
// import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
// import LandingMainConfig from "./landing-main-section"
// import LandingSecondSection from "./Landing-why-choose-use-card"
// import LandingThirdSection from "./landing-why-invest-with-us"

// export default function LandingConfigTab() {
//   const { toast } = useToast()
//   const [activeTab, setActiveTab] = useState("general")

//   const saveChanges = () => {
//     toast({
//       title: "Changes saved",
//       description: "Your changes have been saved successfully.",
//     })
//   }

//   return (
//     <div className="container mx-auto py-8">
//       <div className="flex justify-between items-center mb-6">
//         <h1 className="text-3xl font-bold text-gray-800">About Page Management</h1>
//       </div>

//       <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
//         <TabsList className="grid grid-cols-3 mb-8 gap-4">
//           <TabsTrigger
//             value="general"
//             className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
//           >
//             Main Section
//           </TabsTrigger>
//           <TabsTrigger
//             value="team"
//             className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
//           >
//             Why Choose us
//           </TabsTrigger>
//           <TabsTrigger
//             value="partners"
//             className="py-2 px-4 text-center font-semibold border bg-white rounded-2xl hover:bg-blue-200 transition-all"
//           >
//            Why Invest With us
//           </TabsTrigger>
//         </TabsList>

//         {/* Tab Components */}
//         <TabsContent value="general">
//           <LandingMainConfig ConfigData={undefined} />
//         </TabsContent>

//         <TabsContent value="team">
//           <LandingSecondSection ConfigData={undefined} />
//         </TabsContent>

//         <TabsContent value="partners">
//           <LandingThirdSection ConfigData={undefined} />
//         </TabsContent>
//       </Tabs>
//     </div>
//   )
// }

import React from "react";

export default function LandingConfiguration() {
  return (
    <div>
      <div>
        <h1 className="text-2xl font-semibold">Project Journey</h1>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 p-6 justify-center">
        {[...Array(5)].map((_, index) => (
          <div
            key={index}
            className="w-full p-6 bg-white rounded-2xl shadow-md"
          >
            <h3 className="text-lg font-semibold">Card {index + 1}</h3>
            <form className="mt-2">
              <label className="block text-sm font-medium text-gray-700">
                Title
              </label>
              <input
                type="text"
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter title"
              />

              <label className="block mt-2 text-sm font-medium text-gray-700">
                Date
              </label>
              <input
                type="date"
                className="w-full p-2 mt-1 border rounded-md"
              />

              <label className="block mt-2 text-sm font-medium text-gray-700">
                Description
              </label>
              <textarea
                className="w-full p-2 mt-1 border rounded-md"
                placeholder="Enter description"
              ></textarea>

              <button
                type="submit"
                className="w-full mt-3 p-2 bg-blue-500 text-white rounded-md"
              >
                Submit
              </button>
            </form>
          </div>
        ))}
      </div>
    </div>
  );
}
