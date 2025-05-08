import { Calendar, Phone, Mail, MapPin, ArrowRight } from "lucide-react";
import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function ContactInformationSection() {
  const handleScheduleVisit = () => {
    window.location.href = "/contact";
  };

  return (
    <>
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-5xl mx-auto grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-estates-secondary mb-6 tracking-tight">
                Get In Touch
              </h2>
              <div className="space-y-6">
                <Link href="/contact">
                  <ContactItem
                    icon={<Calendar className="h-6 w-6 text-estates-primary" />}
                    text="Schedule a Site Visit"
                    action={
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={handleScheduleVisit}
                      >
                        Book Now
                      </Button>
                    }
                  />
                </Link>
                <ContactItem
                  icon={<Phone className="h-6 w-6 text-estates-primary" />}
                  text="Call Us: 9851086249"
                  action={
                    <a href="tel:9851086249">
                      <Button variant="outline" size="sm">
                        Call
                      </Button>
                    </a>
                  }
                />

                <ContactItem
                  icon={<Mail className="h-6 w-6 text-estates-primary" />}
                  text="Email: info@projestates.com"
                  action={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => window.open("mailto:info@projestates.com")}
                    >
                      Email
                    </Button>
                  }
                />
                <ContactItem
                  icon={<MapPin className="h-6 w-6 text-estates-primary" />}
                  text="Visit Us: Furtiman Marg-5, Bishalnagar, Kathmandu, Nepal"
                  action={
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() =>
                        window.open(
                          "https://maps.google.com/?q=Bishalnagar,Kathmandu,Nepal",
                          "_blank"
                        )
                      }
                    >
                      View Map
                    </Button>
                  }
                />
              </div>
            </div>
            <div className="bg-estates-gray-100 p-8 rounded-xl shadow-md">
              <h3 className="text-xl font-semibold text-estates-secondary mb-6">
                Investor Support
              </h3>
              <p className="text-gray-600 mb-6">
                Our dedicated investor relations team is available to assist you
                with any inquiries about the Saukhel Real Estate Project and
                investment opportunities.
              </p>
              <div className="flex flex-col space-y-4">
                <Button
                  variant="cta"
                  onClick={() => (window.location.href = "/projectdescription")}
                >
                  View Project Details
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  variant="outline"
                  onClick={() => (window.location.href = "/faqs")}
                >
                  Frequently Asked Questions
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const ContactItem = ({
  icon,
  text,
  action,
}: {
  icon: React.ReactNode;
  text: string;
  action: React.ReactNode;
}) => (
  <div className="flex items-center justify-between bg-estates-gray-100 p-4 rounded-lg border border-estates-gray-200 hover:border-estates-primary/20 transition-colors group">
    <div className="flex items-center">
      <div className="mr-4">{icon}</div>
      <span className="text-gray-600">{text}</span>
    </div>
    <div>{action}</div>
  </div>
);
