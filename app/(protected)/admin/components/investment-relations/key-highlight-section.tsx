"use client";

import type React from "react";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { BarChart3, TrendingUp, PieChart } from "lucide-react";

// Available icons for selection
const availableIcons = [
  { name: "BarChart3", component: <BarChart3 className="h-6 w-6" /> },
  { name: "TrendingUp", component: <TrendingUp className="h-6 w-6" /> },
  { name: "PieChart", component: <PieChart className="h-6 w-6" /> },
];

export default function KeyHighlightsEditor() {
  const [highlights, setHighlights] = useState([
    {
      id: 1,
      title: "Strong Financial Growth",
      icon: "BarChart3",
      points: [
        "20% year-over-year revenue growth",
        "Expanding profit margins",
        "Consistent dividend payments",
      ],
    },
    {
      id: 2,
      title: "Market Leadership",
      icon: "TrendingUp",
      points: [
        "Top 3 market position",
        "Growing market share",
        "Industry recognition",
      ],
    },
    {
      id: 3,
      title: "Strategic Investments",
      icon: "PieChart",
      points: [
        "Diversified portfolio",
        "Focus on emerging markets",
        "Sustainable long-term growth",
      ],
    },
  ]);

  const [isLoading, setIsLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("1");
  const [newPoint, setNewPoint] = useState("");

  const handleTitleChange = (id: number, value: string) => {
    setHighlights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, title: value } : item))
    );
  };

  const handleIconChange = (id: number, value: string) => {
    setHighlights((prev) =>
      prev.map((item) => (item.id === id ? { ...item, icon: value } : item))
    );
  };

  const handlePointChange = (id: number, index: number, value: string) => {
    setHighlights((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newPoints = [...item.points];
          newPoints[index] = value;
          return { ...item, points: newPoints };
        }
        return item;
      })
    );
  };

  const addPoint = (id: number) => {
    if (!newPoint.trim()) return;

    setHighlights((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, points: [...item.points, newPoint] };
        }
        return item;
      })
    );
    setNewPoint("");
  };

  const removePoint = (id: number, index: number) => {
    setHighlights((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const newPoints = [...item.points];
          newPoints.splice(index, 1);
          return { ...item, points: newPoints };
        }
        return item;
      })
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
          "Your changes to the key highlights have been saved successfully.",
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
        <CardTitle>Edit Key Highlights</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-3">
            {highlights.map((highlight) => (
              <TabsTrigger key={highlight.id} value={highlight.id.toString()}>
                Card {highlight.id}
              </TabsTrigger>
            ))}
          </TabsList>

          {highlights.map((highlight) => (
            <TabsContent
              key={highlight.id}
              value={highlight.id.toString()}
              className="space-y-4 mt-4"
            >
              <div className="flex items-center gap-4">
                <div className="p-4 border rounded-md">
                  {renderIconPreview(highlight.icon)}
                </div>

                <div className="flex-1 space-y-2">
                  <Label htmlFor={`title-${highlight.id}`}>Title</Label>
                  <Input
                    id={`title-${highlight.id}`}
                    value={highlight.title}
                    onChange={(e) =>
                      handleTitleChange(highlight.id, e.target.value)
                    }
                    placeholder="Enter title"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor={`icon-${highlight.id}`}>Icon</Label>
                <Select
                  value={highlight.icon}
                  onValueChange={(value) =>
                    handleIconChange(highlight.id, value)
                  }
                >
                  <SelectTrigger id={`icon-${highlight.id}`}>
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

              <div className="space-y-2">
                <Label>Points</Label>
                <div className="space-y-2">
                  {highlight.points.map((point, index) => (
                    <div key={index} className="flex gap-2">
                      <Input
                        value={point}
                        onChange={(e) =>
                          handlePointChange(highlight.id, index, e.target.value)
                        }
                        placeholder={`Point ${index + 1}`}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="icon"
                        onClick={() => removePoint(highlight.id, index)}
                      >
                        ✕
                      </Button>
                    </div>
                  ))}
                </div>
              </div>

              <div className="flex gap-2">
                <Input
                  value={newPoint}
                  onChange={(e) => setNewPoint(e.target.value)}
                  placeholder="Add new point"
                />
                <Button type="button" onClick={() => addPoint(highlight.id)}>
                  Add
                </Button>
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
