"use client"

import React from 'react';
import { BrowserRouter, Outlet } from 'react-router-dom';
import DashboardSidebar from '@/components/dashboard/DashboardSidebar';
import DashboardHeader from '@/components/dashboard/DashboardHeader';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      <DashboardHeader />
      <div className="flex">
        <BrowserRouter>
        <DashboardSidebar />
        </BrowserRouter>
        <main className="flex-1 p-6 overflow-y-auto">
          <div className="container mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
};

export default Dashboard;
