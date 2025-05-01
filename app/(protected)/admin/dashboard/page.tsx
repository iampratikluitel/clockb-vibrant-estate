"use client"
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { User, Clock, BarChart4, Users } from 'lucide-react';

const DashboardWelcome = () => {
  return (
    <div className="space-y-6">
      <h1 className="text-2xl font-bold tracking-tight">Welcome to Admin Dashboard</h1>
      <p className="text-muted-foreground">
        Manage your website content and monitor performance from this control panel.
      </p>
      
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Posts</CardTitle>
            <BarChart4 className="h-4 w-4 text-estates-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">24</p>
            <p className="text-xs text-muted-foreground">+3 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Total Users</CardTitle>
            <Users className="h-4 w-4 text-estates-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">243</p>
            <p className="text-xs text-muted-foreground">+18 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Active Projects</CardTitle>
            <User className="h-4 w-4 text-estates-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">12</p>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium">Last Update</CardTitle>
            <Clock className="h-4 w-4 text-estates-primary" />
          </CardHeader>
          <CardContent>
            <p className="text-2xl font-bold">Today</p>
            <p className="text-xs text-muted-foreground">at 10:23 AM</p>
          </CardContent>
        </Card>
      </div>
      
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <Card className="md:col-span-2">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
            <CardDescription>Overview of your latest actions</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="flex items-center space-x-4 rounded-md border p-4">
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {["NewsInsight post updated", "New investor added", "FAQ added", "Privacy policy updated", "News article published"][i]}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {`${i + 1} hour${i > 0 ? 's' : ''} ago`}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>Common tasks you can perform</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors">
                <span className="font-medium">Add New Post</span>
                <span className="text-estates-primary">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors">
                <span className="font-medium">Update Projects</span>
                <span className="text-estates-primary">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors">
                <span className="font-medium">Manage FAQs</span>
                <span className="text-estates-primary">→</span>
              </button>
              <button className="w-full flex items-center justify-between p-2 hover:bg-gray-100 rounded-md transition-colors">
                <span className="font-medium">User Management</span>
                <span className="text-estates-primary">→</span>
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default DashboardWelcome;
