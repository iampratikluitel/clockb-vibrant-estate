'use client';

import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Plus, Pencil, Trash2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  registrationLink: string;
}

interface InvestorRelations {
  id: string;
  events: Event[];
}

export default function InvestorRelationsAdmin() {
  const [data, setData] = useState<InvestorRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [eventFormData, setEventFormData] = useState({
    title: '',
    date: '',
    time: '',
    registrationLink: '',
  });

  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await fetch('/api/investor-relations', {
        cache: 'no-store',
        headers: {
          'Cache-Control': 'no-cache',
          'Pragma': 'no-cache'
        }
      });
      console.log("response", response)
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setData(data);
    } catch (error) {
      console.error('Error fetching data:', error);
      toast.error('Failed to load investor relations data');
    } finally {
      setIsLoading(false);
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEvent 
        ? `/api/investor-relations/events/${editingEvent.id}`
        : '/api/investor-relations/events';
      
      const method = editingEvent ? 'PUT' : 'POST';
      
      // Optimistic update
      const optimisticEvent = {
        id: editingEvent?.id || Date.now().toString(),
        ...eventFormData
      };

      // Update local state optimistically
      setData(prevData => {
        if (!prevData) return null;
        const updatedEvents = editingEvent
          ? prevData.events.map(e => e.id === editingEvent.id ? optimisticEvent : e)
          : [...prevData.events, optimisticEvent];
        return { ...prevData, events: updatedEvents };
      });
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventFormData),
      });

      if (!response.ok) {
        throw new Error('Failed to save event');
      }

      // Fetch fresh data to ensure sync with server
      await fetchData();
      setIsEventDialogOpen(false);
      setEditingEvent(null);
      setEventFormData({ title: '', date: '', time: '', registrationLink: '' });
      toast.success(`Event ${editingEvent ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
      // Revert optimistic update on error
      await fetchData();
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      // Optimistic update
      setData(prevData => {
        if (!prevData) return null;
        return {
          ...prevData,
          events: prevData.events.filter(event => event.id !== id)
        };
      });

      const response = await fetch(`/api/investor-relations/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error('Failed to delete event');
      }

      // Fetch fresh data to ensure sync with server
      await fetchData();
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
      // Revert optimistic update on error
      await fetchData();
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
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle>Upcoming Events</CardTitle>
        <Button onClick={() => {
          setEditingEvent(null);
          setEventFormData({ title: '', date: '', time: '', registrationLink: '' });
          setIsEventDialogOpen(true);
        }}>
          <Plus className="mr-2 h-4 w-4" />
          Add Event
        </Button>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {data?.events.map((event) => (
            <div key={event.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
              <div>
                <p className="font-medium">{event.title}</p>
                <p className="text-gray-600">{event.date} • {event.time}</p>
                <a href={event.registrationLink} target="_blank" rel="noopener noreferrer" className="text-estates-primary text-sm">
                  Registration Link
                </a>
              </div>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => {
                    setEditingEvent(event);
                    setEventFormData({
                      title: event.title,
                      date: event.date,
                      time: event.time,
                      registrationLink: event.registrationLink,
                    });
                    setIsEventDialogOpen(true);
                  }}
                >
                  <Pencil className="h-4 w-4" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => handleDeleteEvent(event.id)}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>

      {/* Event Dialog */}
      <Dialog open={isEventDialogOpen} onOpenChange={setIsEventDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingEvent ? 'Edit Event' : 'Add Event'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleEventSubmit} className="space-y-4">
            <div>
              <Label>Title</Label>
              <Input
                value={eventFormData.title}
                onChange={(e) => setEventFormData({ ...eventFormData, title: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Date</Label>
              <Input
                type="date"
                value={eventFormData.date}
                onChange={(e) => setEventFormData({ ...eventFormData, date: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Time</Label>
              <Input
                type="time"
                value={eventFormData.time}
                onChange={(e) => setEventFormData({ ...eventFormData, time: e.target.value })}
                required
              />
            </div>
            <div>
              <Label>Registration Link</Label>
              <Input
                type="url"
                value={eventFormData.registrationLink}
                onChange={(e) => setEventFormData({ ...eventFormData, registrationLink: e.target.value })}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsEventDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingEvent ? 'Update' : 'Add'} Event
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </Card>
  );
}