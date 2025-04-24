"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  ChevronLeft,
  ChevronRight,
  Home,
  Info,
  FileText,
  Users,
  BookOpen,
  HelpCircle,
  Newspaper,
  FolderOpen,
  Link as LinkIcon,
  FileQuestion,
  Shield,
  Briefcase,
  Mail,
  Settings,
  User,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";

const DashboardSidebar = () => {
  const [collapsed, setCollapsed] = useState(false);
  const pathname = usePathname();

  const mainMenuItems = [
    { 
      name: "Dashboard", 
      path: "/admin/dashboard", 
      icon: Home 
    },
    { 
      name: "About", 
      path: "/admin/about", 
      icon: Info 
    },
    { 
      name: "Testimonial", 
      path: "/admin/testimonial", 
      icon: User 
    },

    {
      name: "Project Description",
      path: "/admin/projectdescription",
      icon: FileText,
    },
    {
      name: "Investor Relations",
      path: "/admin/investor-relations",
      icon: Users,
    },
    { 
      name: "Blog", 
      path: "/admin/blog", 
      icon: BookOpen 
    },
    { 
      name: "FAQs", 
      path: "/admin/faqs", 
      icon: HelpCircle 
    },
    { 
      name: "News & Insights", 
      path: "/admin/news", 
      icon: Newspaper 
    },
    { 
      name: "Resources", 
      path: "/admin/resources", 
      icon: FolderOpen 
    },
  ];

  const moreLinks = [
    {
      name: "Terms & Conditions",
      path: "/admin/termsAndCondition",
      icon: FileQuestion,
    },
    { 
      name: "Privacy Policy", 
      path: "/admin/privacy-policy", 
      icon: Shield 
    },
    { 
      name: "Configuration", 
      path: "/admin/configuration", 
      icon: Settings 
    },
    { 
      name: "Careers", 
      path: "/admin/careers", 
      icon: Briefcase 
    },
    { 
      name: "Contact Us", 
      path: "/admin/contact", 
      icon: Mail 
    },
  ];

  return (
    <div
      className={`fixed left-0 top-0 h-screen border-r bg-background transition-all duration-300 ${
        collapsed ? "w-[80px]" : "w-[240px]"
      }`}
    >
      <div className="flex h-16 items-center justify-between border-b px-4">
        {!collapsed && (
          <span className="font-bold text-estates-primary">Admin Panel</span>
        )}
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          onClick={() => setCollapsed(!collapsed)}
        >
          {collapsed ? (
            <ChevronRight className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </div>

      <ScrollArea className="h-[calc(100vh-4rem)]">
        <div className="p-4">
          <nav className="space-y-2">
            {mainMenuItems.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-colors ${
                  pathname === item.path
                    ? "bg-estates-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${collapsed ? "mx-auto" : ""}`}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>

          <Separator className="my-6" />

          <div
            className={`text-xs font-medium ${collapsed ? "text-center" : ""}`}
          >
            {!collapsed ? (
              "MORE LINKS"
            ) : (
              <LinkIcon className="h-4 w-4 mx-auto" />
            )}
          </div>

          <nav className="mt-3 space-y-2">
            {moreLinks.map((item) => (
              <Link
                key={item.path}
                href={item.path}
                className={`flex items-center space-x-2 py-2 px-3 rounded-md transition-colors ${
                  pathname === item.path
                    ? "bg-estates-primary text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                <item.icon
                  className={`h-5 w-5 ${collapsed ? "mx-auto" : ""}`}
                />
                {!collapsed && <span>{item.name}</span>}
              </Link>
            ))}
          </nav>
        </div>
      </ScrollArea>
    </div>
  );
};

export default DashboardSidebar;
