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

interface ContactDetail {
  id: string;
  type: 'phone' | 'email';
  value: string;
}

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  registrationLink: string;
}

interface InvestorRelations {
  id: string;
  contactDetails: ContactDetail[];
  events: Event[];
}

export default function InvestorRelationsAdmin() {
  const [data, setData] = useState<InvestorRelations | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [isContactDialogOpen, setIsContactDialogOpen] = useState(false);
  const [isEventDialogOpen, setIsEventDialogOpen] = useState(false);
  const [editingContact, setEditingContact] = useState<ContactDetail | null>(null);
  const [editingEvent, setEditingEvent] = useState<Event | null>(null);
  const [formData, setFormData] = useState({
    type: 'phone',
    value: '',
  });
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
      const response = await fetch('/api/investor-relations');
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

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingContact 
        ? `/api/investor-relations/contacts/${editingContact.id}`
        : '/api/investor-relations/contacts';
      
      const method = editingContact ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error('Failed to save contact detail');

      await fetchData();
      setIsContactDialogOpen(false);
      setEditingContact(null);
      setFormData({ type: 'phone', value: '' });
      toast.success(`Contact detail ${editingContact ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Error saving contact detail:', error);
      toast.error('Failed to save contact detail');
    }
  };

  const handleEventSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const url = editingEvent 
        ? `/api/investor-relations/events/${editingEvent.id}`
        : '/api/investor-relations/events';
      
      const method = editingEvent ? 'PUT' : 'POST';
      
      const response = await fetch(url, {
        method,
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(eventFormData),
      });

      if (!response.ok) throw new Error('Failed to save event');

      await fetchData();
      setIsEventDialogOpen(false);
      setEditingEvent(null);
      setEventFormData({ title: '', date: '', time: '', registrationLink: '' });
      toast.success(`Event ${editingEvent ? 'updated' : 'added'} successfully`);
    } catch (error) {
      console.error('Error saving event:', error);
      toast.error('Failed to save event');
    }
  };

  const handleDeleteContact = async (id: string) => {
    try {
      const response = await fetch(`/api/investor-relations/contacts/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete contact detail');

      await fetchData();
      toast.success('Contact detail deleted successfully');
    } catch (error) {
      console.error('Error deleting contact detail:', error);
      toast.error('Failed to delete contact detail');
    }
  };

  const handleDeleteEvent = async (id: string) => {
    try {
      const response = await fetch(`/api/investor-relations/events/${id}`, {
        method: 'DELETE',
      });

      if (!response.ok) throw new Error('Failed to delete event');

      await fetchData();
      toast.success('Event deleted successfully');
    } catch (error) {
      console.error('Error deleting event:', error);
      toast.error('Failed to delete event');
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
        <CardTitle>Investor Relations</CardTitle>
      </CardHeader>
      <CardContent className="space-y-8">
        {/* Contact Details Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Contact Details</h3>
            <Button onClick={() => {
              setEditingContact(null);
              setFormData({ type: 'phone', value: '' });
              setIsContactDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Contact
            </Button>
          </div>
          <div className="space-y-4">
            {data?.contactDetails.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                <div>
                  <p className="font-medium">{contact.type === 'phone' ? 'Phone' : 'Email'}</p>
                  <p className="text-gray-600">{contact.value}</p>
                </div>
                <div className="flex gap-2">
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => {
                      setEditingContact(contact);
                      setFormData({ type: contact.type, value: contact.value });
                      setIsContactDialogOpen(true);
                    }}
                  >
                    <Pencil className="h-4 w-4" />
                  </Button>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => handleDeleteContact(contact.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Events Section */}
        <div>
          <div className="flex justify-between items-center mb-4">
            <h3 className="text-xl font-semibold">Upcoming Events</h3>
            <Button onClick={() => {
              setEditingEvent(null);
              setEventFormData({ title: '', date: '', time: '', registrationLink: '' });
              setIsEventDialogOpen(true);
            }}>
              <Plus className="mr-2 h-4 w-4" />
              Add Event
            </Button>
          </div>
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
        </div>
      </CardContent>

      {/* Contact Dialog */}
      <Dialog open={isContactDialogOpen} onOpenChange={setIsContactDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{editingContact ? 'Edit Contact' : 'Add Contact'}</DialogTitle>
          </DialogHeader>
          <form onSubmit={handleContactSubmit} className="space-y-4">
            <div>
              <Label>Type</Label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as 'phone' | 'email' })}
                className="w-full rounded-md border border-input bg-background px-3 py-2"
              >
                <option value="phone">Phone</option>
                <option value="email">Email</option>
              </select>
            </div>
            <div>
              <Label>Value</Label>
              <Input
                value={formData.value}
                onChange={(e) => setFormData({ ...formData, value: e.target.value })}
                type={formData.type === 'email' ? 'email' : 'tel'}
                required
              />
            </div>
            <div className="flex justify-end space-x-2">
              <Button type="button" variant="outline" onClick={() => setIsContactDialogOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">
                {editingContact ? 'Update' : 'Add'} Contact
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>

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