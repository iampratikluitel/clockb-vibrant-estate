"use client";

import { useState } from "react";
import { format } from "date-fns"; // ✅ Correct import for formatting dates
import { toast } from "sonner";
import { ArrowRight, Calendar } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";

interface AppointmentDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}

const AppointmentDialog = ({ open, onOpenChange }: AppointmentDialogProps) => {
  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentEmail, setAppointmentEmail] = useState("");
  const [appointmentPhone, setAppointmentPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(
    undefined
  );
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");
  const [isAppointmentSubmitting, setIsAppointmentSubmitting] = useState(false);

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppointmentSubmitting(true);

    try {
      const response = await fetch(`/api/public/appointment`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: appointmentName,
          email: appointmentEmail,
          phone: appointmentPhone,
          date: appointmentDate,
          time: appointmentTime,
          note: appointmentNote,
        }),
      });

      if (!response.ok) throw new Error("Failed to schedule appointment");

      toast("Appointment scheduled!", {
        description: "We'll confirm your appointment soon.",
      });

      setAppointmentName("");
      setAppointmentEmail("");
      setAppointmentPhone("");
      setAppointmentDate(undefined);
      setAppointmentTime("");
      setAppointmentNote("");
      onOpenChange(false);
    } catch (error) {
      console.error(error);
      toast("Error", {
        description: "Failed to schedule appointment. Please try again.",
      });
    } finally {
      setIsAppointmentSubmitting(false);
    }
  };

  return (
    <div>
      <Dialog open={open} onOpenChange={onOpenChange}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle className="text-2xl">
              Schedule an Appointment
            </DialogTitle>
            <DialogDescription>
              Fill out the form below to schedule a consultation with our
              investment advisors.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleAppointmentSubmit} className="space-y-4 mt-4">
            <div className="space-y-2">
              <label htmlFor="appointmentName" className="text-sm font-medium">
                Full Name
              </label>
              <Input
                id="appointmentName"
                value={appointmentName}
                onChange={(e) => setAppointmentName(e.target.value)}
                placeholder="Enter your full name"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="appointmentEmail" className="text-sm font-medium">
                Email Address
              </label>
              <Input
                id="appointmentEmail"
                type="email"
                value={appointmentEmail}
                onChange={(e) => setAppointmentEmail(e.target.value)}
                placeholder="Enter your email address"
                required
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="appointmentPhone" className="text-sm font-medium">
                Contact Number
              </label>
              <Input
                id="appointmentPhone"
                type="tel"
                value={appointmentPhone}
                onChange={(e) => setAppointmentPhone(e.target.value)}
                placeholder="Enter your phone number"
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Preferred Date</label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal",
                        !appointmentDate && "text-muted-foreground"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4" />
                      {appointmentDate ? (
                        format(appointmentDate, "PPP")
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0">
                    <CalendarComponent
                      mode="single"
                      selected={appointmentDate}
                      onSelect={setAppointmentDate}
                      initialFocus
                      disabled={(date) => {
                        return (
                          date < new Date(new Date().setHours(0, 0, 0, 0)) ||
                          date.getDay() === 0
                        );
                      }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              <div className="space-y-2">
                <label
                  htmlFor="appointmentTime"
                  className="text-sm font-medium"
                >
                  Preferred Time
                </label>
                <select
                  id="appointmentTime"
                  value={appointmentTime}
                  onChange={(e) => setAppointmentTime(e.target.value)}
                  className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                  required
                >
                  <option value="" disabled>
                    Select a time
                  </option>
                  {[
                    "09:00",
                    "10:00",
                    "11:00",
                    "12:00",
                    "13:00",
                    "14:00",
                    "15:00",
                    "16:00",
                    "17:00",
                  ].map((time) => (
                    <option key={time} value={time}>
                      {new Date(`1970-01-01T${time}:00`).toLocaleTimeString(
                        [],
                        {
                          hour: "2-digit",
                          minute: "2-digit",
                        }
                      )}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div className="space-y-2">
              <label htmlFor="appointmentNote" className="text-sm font-medium">
                Appointment Note
              </label>
              <textarea
                id="appointmentNote"
                rows={3}
                value={appointmentNote}
                onChange={(e) => setAppointmentNote(e.target.value)}
                className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                placeholder="Tell us what you'd like to discuss..."
              />
            </div>

            <DialogFooter>
              <Button
                type="button"
                variant="outline"
                onClick={() => onOpenChange(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                className="bg-estates-primary hover:bg-estates-primary/90"
                disabled={isAppointmentSubmitting}
              >
                {isAppointmentSubmitting
                  ? "Scheduling..."
                  : "Schedule Appointment"}
              </Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default AppointmentDialog;
