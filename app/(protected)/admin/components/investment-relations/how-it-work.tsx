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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "@/hooks/use-toast";
import {
  BarChart3,
  TrendingUp,
  PieChart,
  FileText,
  Users,
  Briefcase,
  LineChart,
  DollarSign,
  Award,
  Target,
} from "lucide-react";

// Available icons for selection
const availableIcons = [
  { name: "BarChart3", component: <BarChart3 className="h-6 w-6" /> },
  { name: "TrendingUp", component: <TrendingUp className="h-6 w-6" /> },
  { name: "PieChart", component: <PieChart className="h-6 w-6" /> },
  { name: "FileText", component: <FileText className="h-6 w-6" /> },
  { name: "Users", component: <Users className="h-6 w-6" /> },
  { name: "Briefcase", component: <Briefcase className="h-6 w-6" /> },
  { name: "LineChart", component: <LineChart className="h-6 w-6" /> },
  { name: "DollarSign", component: <DollarSign className="h-6 w-6" /> },
  { name: "Award", component: <Award className="h-6 w-6" /> },
  { name: "Target", component: <Target className="h-6 w-6" /> },
];

export default function HowItWorksEditor() {
  const [steps, setSteps] = useState([
    {
      id: 1,
      title: "Initial Assessment",
      description: "We evaluate your investment goals and risk tolerance.",
      icon: "FileText",
    },
    {
      id: 2,
      title: "Market Analysis",
      description: "Our team analyzes current market conditions and trends.",
      icon: "BarChart3",
    },
    {
      id: 3,
      title: "Strategy Development",
      description: "We develop a customized investment strategy for you.",
      icon: "Target",
    },
    {
      id: 4,
      title: "Portfolio Construction",
      description: "Building a diversified portfolio aligned with your goals.",
      icon: "Briefcase",
    },
    {
      id: 5,
      title: "Risk Management",
      description: "Implementing safeguards to protect your investments.",
      icon: "LineChart",
    },
    {
      id: 6,
      title: "Execution",
      description:
        "Executing trades and investments according to the strategy.",
      icon: "DollarSign",
    },
    {
      id: 7,
      title: "Monitoring",
      description: "Continuous monitoring of portfolio performance.",
      icon: "TrendingUp",
    },
    {
      id: 8,
      title: "Reporting",
      description: "Regular reporting on investment performance and metrics.",
      icon: "PieChart",
    },
    {
      id: 9,
      title: "Review & Adjust",
      description: "Periodic review and adjustment of investment strategy.",
      icon: "Award",
    },
    {
      id: 10,
      title: "Client Support",
      description: "Ongoing support and guidance from our investment team.",
      icon: "Users",
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const handleTitleChange = (id: number, value: string) => {
    setSteps((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: value } : item))
    );
  };

  const handleDescriptionChange = (id: number, value: string) => {
    setSteps((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, description: value } : item
      )
    );
  };

  const handleIconChange = (id: number, value: string) => {
    setSteps((prev) =>
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
          "Your changes to the 'How It Works' section have been saved successfully.",
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

  // Calculate pagination
  const totalPages = Math.ceil(steps.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = steps.slice(startIndex, endIndex);

  return (
    <Card>
      <CardHeader>
        <CardTitle>Edit How It Works Section</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {currentItems.map((step) => (
            <div key={step.id} className="p-4 border rounded-md space-y-4">
              <div className="flex items-center gap-4">
                <div className="p-3 border rounded-md">
                  {renderIconPreview(step.icon)}
                </div>
                <h3 className="text-lg font-medium">Step {step.id}</h3>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`title-${step.id}`}>Title</Label>
                <Input
                  id={`title-${step.id}`}
                  value={step.title}
                  onChange={(e) => handleTitleChange(step.id, e.target.value)}
                  placeholder="Enter title"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`description-${step.id}`}>Description</Label>
                <Textarea
                  id={`description-${step.id}`}
                  value={step.description}
                  onChange={(e) =>
                    handleDescriptionChange(step.id, e.target.value)
                  }
                  placeholder="Enter description"
                  rows={2}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor={`icon-${step.id}`}>Icon</Label>
                <Select
                  value={step.icon}
                  onValueChange={(value) => handleIconChange(step.id, value)}
                >
                  <SelectTrigger id={`icon-${step.id}`}>
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
            </div>
          ))}

          {/* Pagination */}
          <div className="flex justify-center gap-2 mt-4">
            <Button
              variant="outline"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={currentPage === 1}
            >
              Previous
            </Button>
            <div className="flex items-center px-4">
              Page {currentPage} of {totalPages}
            </div>
            <Button
              variant="outline"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={currentPage === totalPages}
            >
              Next
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <Button onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "Saving..." : "Save All Changes"}
        </Button>
      </CardFooter>
    </Card>
  );
}
