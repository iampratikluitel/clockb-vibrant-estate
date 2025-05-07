'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { format } from "date-fns";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface SiteVisit {
  id: string;
  name: string;
  email: string;
  phone: string;
  preferredDate: string;
  message?: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
}

export default function SiteVisitsAdmin() {
  const [siteVisits, setSiteVisits] = useState<SiteVisit[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedVisit, setSelectedVisit] = useState<SiteVisit | null>(null);
  const [isViewDialogOpen, setIsViewDialogOpen] = useState(false);

  useEffect(() => {
    fetchSiteVisits();
  }, []);

  const fetchSiteVisits = async () => {
    try {
      const response = await fetch('/api/site-visits');
      if (!response.ok) throw new Error('Failed to fetch site visits');
      const data = await response.json();
      setSiteVisits(data);
    } catch (error) {
      console.error('Error fetching site visits:', error);
      toast.error('Failed to load site visits');
    } finally {
      setIsLoading(false);
    }
  };

  const handleStatusChange = async (id: string, newStatus: 'pending' | 'approved' | 'rejected') => {
    try {
      const response = await fetch(`/api/site-visits/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ status: newStatus }),
      });

      if (!response.ok) throw new Error('Failed to update status');

      await fetchSiteVisits();
      toast.success('Status updated successfully');
    } catch (error) {
      console.error('Error updating status:', error);
      toast.error('Failed to update status');
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this site visit request?')) return;

    try {
      const response = await fetch(`/api/site-visits/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete site visit');

      await fetchSiteVisits();
      toast.success('Site visit request deleted successfully');
    } catch (error) {
      console.error('Error deleting site visit:', error);
      toast.error('Failed to delete site visit request');
    }
  };

  if (isLoading) {
    return (
      <Card>
        <CardContent className="flex items-center justify-center h-32">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-estates-primary"></div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Site Visit Requests</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {siteVisits.length === 0 ? (
            <p className="text-center text-gray-500 py-4">No site visit requests found</p>
          ) : (
            siteVisits.map((visit) => (
              <div key={visit.id} className="bg-gray-50 rounded-lg p-4">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <h3 className="font-semibold">{visit.name}</h3>
                    <p className="text-sm text-gray-600">{visit.email}</p>
                    <p className="text-sm text-gray-600">{visit.phone}</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Select
                      value={visit.status}
                      onValueChange={(value) => handleStatusChange(visit.id, value as 'pending' | 'approved' | 'rejected')}
                    >
                      <SelectTrigger className="w-[120px]">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="pending">Pending</SelectItem>
                        <SelectItem value="approved">Approved</SelectItem>
                        <SelectItem value="rejected">Rejected</SelectItem>
                      </SelectContent>
                    </Select>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => {
                        setSelectedVisit(visit);
                        setIsViewDialogOpen(true);
                      }}
                    >
                      View
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      onClick={() => handleDelete(visit.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      Delete
                    </Button>
                  </div>
                </div>
                <div className="text-sm text-gray-600">
                  <p>Preferred Date: {format(new Date(visit.preferredDate), 'PPP')}</p>
                  <p>Requested: {format(new Date(visit.createdAt), 'PPP')}</p>
                </div>
              </div>
            ))
          )}
        </div>
      </CardContent>

      <Dialog open={isViewDialogOpen} onOpenChange={setIsViewDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Site Visit Request Details</DialogTitle>
          </DialogHeader>
          {selectedVisit && (
            <div className="space-y-4">
              <div>
                <h4 className="font-semibold">Contact Information</h4>
                <p>Name: {selectedVisit.name}</p>
                <p>Email: {selectedVisit.email}</p>
                <p>Phone: {selectedVisit.phone}</p>
              </div>
              <div>
                <h4 className="font-semibold">Visit Details</h4>
                <p>Preferred Date: {format(new Date(selectedVisit.preferredDate), 'PPP')}</p>
                <p>Status: {selectedVisit.status}</p>
                <p>Requested: {format(new Date(selectedVisit.createdAt), 'PPP')}</p>
              </div>
              {selectedVisit.message && (
                <div>
                  <h4 className="font-semibold">Message</h4>
                  <p className="whitespace-pre-wrap">{selectedVisit.message}</p>
                </div>
              )}
            </div>
          )}
        </DialogContent>
      </Dialog>
    </Card>
  );
} 