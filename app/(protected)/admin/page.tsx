"use client";
import React from "react";
import { BrowserRouter, Outlet } from "react-router-dom";
import DashboardSidebar from "./components/dashboard/DashboardSidebar";
import DashboardHeader from "./components/dashboard/DashboardHeader";
import DashboardWelcome from "./dashboard/page";

const Dashboard = () => {
  return (
    <div><DashboardWelcome /></div>
  );
};

export default Dashboard;
