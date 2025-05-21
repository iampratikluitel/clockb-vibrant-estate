"use client";

import { useState } from "react";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Linkedin,
  Send,
  ArrowRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useGetPublicConfigFooterQuery } from "@/store/api/Public/publicConfiguration";
import Link from "next/link";
import AppointmentDialog from "./_component/appointmentDialog";
import { toast } from "sonner";

const Contact = () => {
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [subjectInput, setSubjectInput] = useState("");
  const [messageInput, setMessageInput] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const { data: ConfigData, isLoading: Loading } =
    useGetPublicConfigFooterQuery("");

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch(`api/public/contact`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: nameInput,
          email: emailInput,
          subject: subjectInput,
          message: messageInput,
        }),
      });

      if (!response.ok) throw new Error("Failed to submit");

      toast.success(`Message Sent!`);

      setNameInput("");
      setEmailInput("");
      setSubjectInput("");
      setMessageInput("");
    } catch (error) {
      console.log(error);
      toast.error(`Couldn't Send Message`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-estates-gray-100">
      <main className="flex-grow pt-24 pb-16">
        <section className="bg-gradient-to-r from-estates-primary to-estates-primary/80 py-16 text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold mb-6 animate-fade-in">
                Get In Touch
              </h1>
              <p
                className="text-lg md:text-xl opacity-90 mb-8 animate-fade-in"
                style={{ animationDelay: "0.2s" }}
              >
                Have questions about our properties or investment opportunities?
                We&apos;re here to help you every step of the way.
              </p>
            </div>
          </div>
        </section>

        <div className="container mx-auto px-4 py-16">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-estates-secondary mb-8">
                Contact Information
              </h2>

              <div className="space-y-8">
                <div className="flex items-start">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-4 shrink-0">
                    <MapPin className="h-6 w-6 text-estates-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">Our Location</h3>
                    <p className="text-gray-600 leading-relaxed">
                      Phurtiman Marg, Bishalnagar,
                      <br />
                      {/* 123 Investment Avenue
                      <br /> */}
                      Kathmandu, Nepal
                    </p>
                    <div className="mt-5 rounded-lg overflow-hidden border border-gray-200 shadow-sm">
                      <iframe
                        src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3531.8034355130703!2d85.3356434!3d27.723354699999998!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x39eb196ca082a2b5%3A0x675b3387fb56614c!2sPhurtiman%20Marg%2C%20Kathmandu%2044600!5e0!3m2!1sen!2snp!4v1747644370960!5m2!1sen!2snp"
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
                    <h3 className="font-semibold text-lg mb-2">
                      Phone Numbers
                    </h3>
                    {ConfigData?.phones &&
                      ConfigData.phones.map((phone, index) => (
                        <li key={index} className="flex items-center">
                            <div className="text-gray-600">
                              {phone.label && <span className="text-gray-600">{phone.label}:&nbsp;</span>}
                              {phone.number}
                            </div>
                        </li>
                      ))}
                  </div>
                </div>

                <div className="flex items-start">
                  <div className="bg-estates-primary/10 p-3 rounded-lg mr-4 shrink-0">
                    <Mail className="h-6 w-6 text-estates-primary" />
                  </div>
                  <div>
                    <h3 className="font-semibold text-lg mb-2">
                      Email Addresses
                    </h3>
                    {ConfigData?.emails &&
                      ConfigData.emails.map((email, index) => (
                        <li key={index} className="flex items-center">
                          <div className="text-[#9F9EA1]">
                            <div>
                              {email.label && (
                                <span className="space-y-2 text-gray-600">
                                  {email.label}:&nbsp;
                                </span>
                              )}
                              <a
                                href={`mailto:${email.address}`}
                                className="text-estates-primary hover:underline"
                              >
                                {email.address}
                              </a>
                            </div>
                          </div>
                        </li>
                      ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">
                    Connect With Us
                  </h3>
                  <div className="flex space-x-4">
                    {ConfigData?.socialHandles.facebook && (
                      <Link
                        href={ConfigData?.socialHandles.facebook}
                        className="bg-estates-primary/10 hover:bg-estates-primary text-estates-primary hover:text-white p-3 rounded-full transition-colors duration-300"
                      >
                        <Facebook className="h-6 w-6" />
                      </Link>
                    )}

                    {ConfigData?.socialHandles.instagram && (
                      <Link
                        href={ConfigData?.socialHandles.instagram}
                        className="bg-estates-primary/10 hover:bg-estates-primary text-estates-primary hover:text-white p-3 rounded-full transition-colors duration-300"
                      >
                        <Instagram className="h-6 w-6" />
                      </Link>
                    )}

                    {ConfigData?.socialHandles.linkedin && (
                      <Link
                        href={ConfigData?.socialHandles.linkedin}
                        className="bg-estates-primary/10 hover:bg-estates-primary text-estates-primary hover:text-white p-3 rounded-full transition-colors duration-300"
                      >
                        <Linkedin className="h-6 w-6" />
                      </Link>
                    )}
                  </div>
                </div>

                <div className="border-t border-gray-100 pt-6">
                  <h3 className="font-semibold text-lg mb-4">Office Hours</h3>
                  <div className="space-y-2 text-gray-600">
                    <p>Monday - Friday: 9:00 AM - 6:00 PM</p>
                    <p>Saturday: Closed</p>
                    <p>Sunday: 10:00 AM - 5:00 AM</p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-md p-8 border border-gray-100">
              <h2 className="text-2xl font-bold text-estates-secondary mb-8">
                Send Us a Message
              </h2>

              <form onSubmit={handleContactSubmit} className="space-y-6">
                <div>
                  <label
                    htmlFor="name"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Full Name
                  </label>
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
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Email Address
                  </label>
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
                  <label
                    htmlFor="subject"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Subject
                  </label>
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
                  <label
                    htmlFor="message"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    Your Message
                  </label>
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
                  Schedule a visit to our office for a personalized consultation
                  with our investment advisors. We can discuss your investment
                  goals and provide tailored solutions.
                </p>

                <Button
                  variant="outline"
                  className="mt-3 hover:bg-estates-primary hover:text-white"
                  onClick={() => setIsAppointmentOpen(true)}
                >
                  Schedule Appointment
                </Button>
              </div>
            </div>
          </div>

          <div className="mt-16 text-center">
            <h2 className="text-2xl font-bold text-estates-secondary mb-4">
              Have More Questions?
            </h2>
            <p className="text-gray-600 mb-6 max-w-2xl mx-auto">
              Check out our frequently asked questions section for quick answers
              to common inquiries about our investment opportunities.
            </p>
            <Button
              variant="default"
              className="bg-estates-primary hover:bg-estates-primary/90 text-white"
              onClick={() => (window.location.href = "/faqs")}
            >
              Visit FAQ Page
            </Button>
          </div>
        </div>
      </main>
      <AppointmentDialog
        open={isAppointmentOpen}
        onOpenChange={setIsAppointmentOpen}
      />
    </div>
  );
};

export default Contact;
