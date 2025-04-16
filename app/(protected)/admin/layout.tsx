"use client";

import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";

export default function DashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar remains fixed */}
      <DashboardSidebar />

      <div className="flex flex-col flex-1 min-h-screen ml-[240px]">
        {" "}
        {/* Adjust margin to match sidebar width */}
        <DashboardHeader />
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">{children}</div>
        </main>
      </div>
    </div>
  );
}
