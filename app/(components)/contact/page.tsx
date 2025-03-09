"use client"

import { useState } from "react";
import { Mail, Phone, MapPin, Facebook, Instagram, Linkedin, Send, ArrowRight, Calendar } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar as CalendarComponent } from "@/components/ui/calendar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { format } from "date-fns";
import { cn } from "@/lib/utils";


const Contact = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { toast } = useToast();

  const [isAppointmentModalOpen, setIsAppointmentModalOpen] = useState(false);
  const [appointmentName, setAppointmentName] = useState("");
  const [appointmentEmail, setAppointmentEmail] = useState("");
  const [appointmentPhone, setAppointmentPhone] = useState("");
  const [appointmentDate, setAppointmentDate] = useState<Date | undefined>(undefined);
  const [appointmentTime, setAppointmentTime] = useState("");
  const [appointmentNote, setAppointmentNote] = useState("");
  const [isAppointmentSubmitting, setIsAppointmentSubmitting] = useState(false);

  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const response = await fetch(`api/contact`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
          subject: subjectInput,
          message: messageInput
        }),
      });
  
      if (!response.ok) throw new Error('Failed to submit');
      
      toast({
        title: "Message sent!",
        description: "We'll get back to you as soon as possible.",
      });
      
      setNameInput("");
      setEmailInput("");
      setSubjectInput("");
      setMessageInput("");
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to send message. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAppointmentSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAppointmentSubmitting(true);
    
    try {
      const response = await fetch(`/api/appointment`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: appointmentName,
          email: appointmentEmail,
          phone: appointmentPhone,
          date: appointmentDate,
          time: appointmentTime,
          note: appointmentNote
        }),
      });
  
      if (!response.ok) throw new Error('Failed to schedule appointment');
      
      toast({
        title: "Appointment scheduled!",
        description: "We'll confirm your appointment soon.",
      });
      
      setAppointmentName("");
      setAppointmentEmail("");
      setAppointmentPhone("");
      setAppointmentDate(undefined);
      setAppointmentTime("");
      setAppointmentNote("");
      setIsAppointmentModalOpen(false);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to schedule appointment. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsAppointmentSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-estates-gray-100">
      <Header />
      
      <main className="flex-grow pt-24 pb-16">
        <section className="bg-gradient-to-r from-estates-primary to-estates-primary/80 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Get In Touch
              </h1>
              <p className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
                Have questions about our properties or investment opportunities?
                We're here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-estates-secondary mb-8">Contact Information</h2>
              
              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-4 shrink-0">
                    <MapPin className="h-6 w-6 text-estates-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Project Estates Headquarters<br />
                      123 Investment Avenue<br />
                      Kathmandu, Nepal
                    </p>
                    
                    <div className="mt-5 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <iframe 
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56516.27776837737!2d85.28493263136324!3d27.70962473370189!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb198a307baabf%3A0xb5137c1bf18db1ea!2sKathmandu%2044600%2C%20Nepal!5e0!3m2!1sen!2sus!4v1716582193918!5m2!1sen!2sus" 
                        width="100%" 
                        height="250" 
                        style={{ border: 0 }} 
                        loading="lazy" 
                        referrerPolicy="no-referrer-when-downgrade"
                        title="Project Estates Location"
                        className="rounded-lg"
                      />
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-4 shrink-0">
                    <Phone className="h-6 w-6 text-estates-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Phone Numbers</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>Sales & Investments: +977-9851079636</p>
                      <p>Customer Support: +977-9843260542</p>
                    </div>
                  </div>
                </div>
                
                <div className="flex items-start">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-4 shrink-0">
                    <Mail className="h-6 w-6 text-estates-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Email Addresses</h3>
                    <div className="space-y-2 text-gray-600">
                      <p>General Inquiries: <a href="mailto:info@projestates.com" className="text-estates-primary hover:underline">info@projestates.com</a></p>
                      <p>Investor Relations: <a href="mailto:investors@projestates.com" className="text-estates-primary hover:underline">investors@projestates.com</a></p>
                      <p>Support: <a href="mailto:support@projestates.com" className="text-estates-primary hover:underline">support@projestates.com</a></p>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-lg mb-4">Connect With Us</h3>
                  <div className="flex space-x-4">
                    <a href="https://facebook.com" target="_blank" rel="noreferrer" className="bg-estates-primary/10 hover:bg-estates-primary text-estates-primary hover:text-white p-3 rounded-full transition-colors duration-300">
                      <Facebook className="h-6 w-6" />
                    </a>
                    <a href="https://instagram.com" target="_blank" rel="noreferrer" className="bg-estates-primary/10 hover:bg-estates-primary text-estates-primary hover:text-white p-3 rounded-full transition-colors duration-300">
                      <Instagram className="h-6 w-6" />
                    </a>
                    <a href="https://linkedin.com" target="_blank" rel="noreferrer" className="bg-estates-primary/10 hover:bg-estates-primary text-estates-primary hover:text-white p-3 rounded-full transition-colors duration-300">
                      <Linkedin className="h-6 w-6" />
                    </a>
                  </div>
                </div>
                
                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-lg mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: 10:00 AM - 2:00 PM</p>
                    <p>Sunday: Closed</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-estates-secondary mb-8">Send Us a Message</h2>
              
              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                  <Input 
                    id="name" 
                    value={nameInput}
                    onChange={(e) => setNameInput(e.target.value)}
                    className="w-full" 
                    placeholder="Enter your full name"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                  <Input 
                    id="email" 
                    type="email" 
                    value={emailInput}
                    onChange={(e) => setEmailInput(e.target.value)}
                    className="w-full" 
                    placeholder="Enter your email address"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                  <Input 
                    id="subject" 
                    value={subjectInput}
                    onChange={(e) => setSubjectInput(e.target.value)}
                    className="w-full" 
                    placeholder="What is this regarding?"
                    required 
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Your Message</label>
                  <textarea 
                    id="message" 
                    rows={6} 
                    value={messageInput}
                    onChange={(e) => setMessageInput(e.target.value)}
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm" 
                    placeholder="Please provide as much detail as possible..."
                    required
                  />
                </div>
                
                <Button 
                  className="w-full py-6 bg-estates-primary hover:bg-estates-primary/90 text-white flex items-center justify-center gap-2"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    "Sending..."
                  ) : (
                    <>
                      Send Message <Send className="h-4 w-4 ml-1" />
                    </>
                  )}
                </Button>
              </form>
              
              <div className="mt-8 bg-estates-primary/5 p-4 rounded-lg">
                <h3 className="font-semibold text-lg mb-2 flex items-center">
                  <ArrowRight className="h-4 w-4 mr-2 text-estates-primary" />
                  Prefer In-Person Meeting?
                </h3>
                <p className="text-gray-600 text-sm">
                  Schedule a visit to our office for a personalized consultation with our investment advisors. 
                  We can discuss your investment goals and provide tailored solutions.
                </p>
                <Dialog open={isAppointmentModalOpen} onOpenChange={setIsAppointmentModalOpen}>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      className="mt-3 hover:bg-estates-primary hover:text-white"
                    >
                      Schedule Appointment
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[500px]">
                    <DialogHeader>
                      <DialogTitle className="text-2xl">Schedule an Appointment</DialogTitle>
                      <DialogDescription>
                        Fill out the form below to schedule a consultation with our investment advisors.
                      </DialogDescription>
                    </DialogHeader>
                    <form onSubmit={handleAppointmentSubmit} className="space-y-4 mt-4">
                      <div className="space-y-2">
                        <label htmlFor="appointmentName" className="text-sm font-medium">Full Name</label>
                        <Input
                          id="appointmentName"
                          value={appointmentName}
                          onChange={(e) => setAppointmentName(e.target.value)}
                          placeholder="Enter your full name"
                          required
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="appointmentEmail" className="text-sm font-medium">Email Address</label>
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
                        <label htmlFor="appointmentPhone" className="text-sm font-medium">Contact Number</label>
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
                                {appointmentDate ? format(appointmentDate, "PPP") : <span>Pick a date</span>}
                              </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0">
                              <CalendarComponent
                                mode="single"
                                selected={appointmentDate}
                                onSelect={setAppointmentDate}
                                initialFocus
                                disabled={(date) => {
                                  return date < new Date(new Date().setHours(0, 0, 0, 0)) || 
                                         date.getDay() === 0;
                                }}
                              />
                            </PopoverContent>
                          </Popover>
                        </div>
                        
                        <div className="space-y-2">
                          <label htmlFor="appointmentTime" className="text-sm font-medium">Preferred Time</label>
                          <select
                            id="appointmentTime"
                            value={appointmentTime}
                            onChange={(e) => setAppointmentTime(e.target.value)}
                            className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                            required
                          >
                            <option value="" disabled>Select a time</option>
                            <option value="09:00">9:00 AM</option>
                            <option value="10:00">10:00 AM</option>
                            <option value="11:00">11:00 AM</option>
                            <option value="12:00">12:00 PM</option>
                            <option value="13:00">1:00 PM</option>
                            <option value="14:00">2:00 PM</option>
                            <option value="15:00">3:00 PM</option>
                            <option value="16:00">4:00 PM</option>
                            <option value="17:00">5:00 PM</option>
                          </select>
                        </div>
                      </div>
                      
                      <div className="space-y-2">
                        <label htmlFor="appointmentNote" className="text-sm font-medium">Appointment Note</label>
                        <textarea
                          id="appointmentNote"
                          rows={3}
                          value={appointmentNote}
                          onChange={(e) => setAppointmentNote(e.target.value)}
                          className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                          placeholder="Tell us what you'd like to discuss..."
                        />
                      </div>
                      
                      <DialogFooter>
                        <Button 
                          type="button" 
                          variant="outline" 
                          onClick={() => setIsAppointmentModalOpen(false)}
                        >
                          Cancel
                        </Button>
                        <Button 
                          type="submit"
                          className="bg-estates-primary hover:bg-estates-primary/90"
                          disabled={isAppointmentSubmitting}
                        >
                          {isAppointmentSubmitting ? "Scheduling..." : "Schedule Appointment"}
                        </Button>
                      </DialogFooter>
                    </form>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
          </div>
          
          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-estates-secondary mb-4">Have More Questions?</h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Check out our frequently asked questions section for quick answers to common inquiries about our investment opportunities.
            </p>
            <Button 
              variant="default"
              className="bg-estates-primary hover:bg-estates-primary/90 text-white"
              onClick={() => window.location.href = '/faqs'}
            >
              Visit FAQ Page
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
