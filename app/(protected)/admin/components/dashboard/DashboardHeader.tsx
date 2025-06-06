"use client";
import React from "react";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { logout } from "@/action/logout";

const DashboardHeader = () => {
  const handleLogout = async () => {
    await logout();
  }

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-background px-4 md:px-6">
      <div className="flex flex-1 items-center justify-between">
        <div className="flex items-center gap-2 md:gap-4">
          <span className="font-bold text-xl hidden md:inline-block">
            Project Estates Admin
          </span>
        </div>

        <div className="flex items-center gap-4">
          <Button variant="ghost" size="icon" onClick={handleLogout}>
            <LogOut className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </header>
  );
};

export default DashboardHeader;
