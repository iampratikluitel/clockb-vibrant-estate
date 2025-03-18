"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import { Users, Briefcase, LineChart } from "lucide-react";

// Available icons for selection
const availableIcons = [
  { name: "Users", component: <Users className="h-6 w-6" /> },
  { name: "Briefcase", component: <Briefcase className="h-6 w-6" /> },
  { name: "LineChart", component: <LineChart className="h-6 w-6" /> },
];

export default function InvestmentCircleEditor() {
  const [circles, setCircles] = useState([
    {
      id: 1,
      title: "Investment Team",
      description:
        "Our experienced investment professionals with decades of combined experience in financial markets.",
      icon: "Users",
    },
    {
      id: 2,
      title: "Portfolio Managers",
      description:
        "Dedicated portfolio managers who oversee your investments and ensure alignment with your goals.",
      icon: "Briefcase",
    },
    {
      id: 3,
      title: "Research Analysts",
      description:
        "Market research specialists who identify opportunities and analyze market trends.",
      icon: "LineChart",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");

  const handleTitleChange = (id: number, value: string) => {
    setCircles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: value } : item))
    );
  };

  const handleDescriptionChange = (id: number, value: string) => {
    setCircles((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, description: value } : item
      )
    );
  };

  const handleIconChange = (id: number, value: string) => {
    setCircles((prev) =>
      prev.map((item) => (item.id === id ? { ...item, icon: value } : item))
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000));
      toast({
        title: "Changes saved",
        description:
          "Your changes to the investment circle section have been saved successfully.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to save changes. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const renderIconPreview = (iconName: string) => {
    const icon = availableIcons.find((i) => i.name === iconName);
    return icon ? icon.component : null;
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit Investment Circle</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            {circles.map((circle) => (
              <TabsTrigger key={circle.id} value={circle.id.toString()}>
                Card {circle.id}
              </TabsTrigger>
            ))}
          </TabsList>

          {circles.map((circle) => (
            <TabsContent
              key={circle.id}
              value={circle.id.toString()}
              className="space-y-4 mt-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 border rounded-md">
                  {renderIconPreview(circle.icon)}
                </div>

                <div className="flex-1 space-y-2">
                  <Label htmlFor={`title-${circle.id}`}>Title</Label>
                  <Input
                    id={`title-${circle.id}`}
                    value={circle.title}
                    onChange={(e) =>
                      handleTitleChange(circle.id, e.target.value)
                    }
                    placeholder="Enter title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${circle.id}`}>Description</Label>
                <Textarea
                  id={`description-${circle.id}`}
                  value={circle.description}
                  onChange={(e) =>
                    handleDescriptionChange(circle.id, e.target.value)
                  }
                  placeholder="Enter description"
                  rows={4}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`icon-${circle.id}`}>Icon</Label>
                <Select
                  value={circle.icon}
                  onValueChange={(value) => handleIconChange(circle.id, value)}
                >
                  <SelectTrigger id={`icon-${circle.id}`}>
                    <SelectValue placeholder="Select an icon" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableIcons.map((icon) => (
                      <SelectItem key={icon.name} value={icon.name}>
                        <div className="flex items-center gap-2">
                          {icon.component}
                          <span>{icon.name}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save All Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
