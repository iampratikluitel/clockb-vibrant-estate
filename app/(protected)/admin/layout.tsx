"use client"; // Required for client components

import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex">
        <DashboardSidebar />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            {children} {/* This renders the nested pages */}
          </div>
        </main>
      </div>
    </div>
  );
}
