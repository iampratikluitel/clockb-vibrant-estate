import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import MainSectionEditor from "./main-section";
import KeyHighlightsEditor from "./key-highlight-section";
import HowItWorksEditor from "./how-it-work";
import InvestmentCircleEditor from "./investment-circle-section";

export default function InvestorRelationsTabs() {
  return (
    <div className="container mx-auto py-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Investor Relations Admin</h1>
        <p className="text-muted-foreground">
          Manage investor relations content
        </p>
      </div>

      <Tabs defaultValue="main" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="main">Main Section</TabsTrigger>
          <TabsTrigger value="highlights">Key Highlights</TabsTrigger>
          <TabsTrigger value="how-it-works">How It Works</TabsTrigger>
          <TabsTrigger value="investment-circle">Investment Circle</TabsTrigger>
        </TabsList>
        <TabsContent value="main" className="p-4 border rounded-md mt-4">
          <MainSectionEditor />
        </TabsContent>
        <TabsContent value="highlights" className="p-4 border rounded-md mt-4">
          <KeyHighlightsEditor />
        </TabsContent>
        <TabsContent
          value="how-it-works"
          className="p-4 border rounded-md mt-4"
        >
          <HowItWorksEditor />
        </TabsContent>
        <TabsContent
          value="investment-circle"
          className="p-4 border rounded-md mt-4"
        >
          <InvestmentCircleEditor />
        </TabsContent>
      </Tabs>
    </div>
  );
}
