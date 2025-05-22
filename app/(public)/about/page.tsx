"use client";

import { Phone, MapPin, FileText } from "lucide-react";
import TeamMemberView from "./_components/team-member";
import PlanningPartner from "./_components/planning-partner";
import InvestmentCircle from "./_components/investment-circle";
import { useGetPublicAboutMainSectionQuery } from "@/store/api/Public/publicAbout";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { useEffect, useState } from "react";
import AppointmentDialog from "../contact/_component/appointmentDialog";
import { toast } from "sonner";

interface Brochure {
  title: string;
  description: string;
  fileUrl: string;
}

const About = () => {
  const [brochure, setBrochure] = useState<Brochure | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [isAppointmentOpen, setIsAppointmentOpen] = useState(false);

  const { data: HeroSection } = useGetPublicAboutMainSectionQuery();

  useEffect(() => {
    const fetchBrochure = async () => {
      try {
        const response = await fetch("/api/public/configuration/brochure");
        if (response.ok) {
          const data = await response.json();
          setBrochure(data);
        }
      } catch (error) {
        console.error("Error fetching brochure:", error);
        toast.error("Failed to load brochure information");
      }
    };
    fetchBrochure();
  }, []);

  const handleDownload = async () => {
    if (!brochure) {
      toast.error("Brochure not available");
      return;
    }

    setIsLoading(true);
    try {
      const response = await fetch(
        `/api/download?fileUrl=${encodeURIComponent(
          brochure.fileUrl
        )}&downloadAs=${encodeURIComponent(brochure.title)}`,
        {
          credentials: "include",
        }
      );

      if (!response.ok) {
        throw new Error("Failed to download file");
      }

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = brochure.title;
      document.body.appendChild(link);
      link.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(link);
      toast.success("Download started successfully");
    } catch (error) {
      console.error("Error downloading file:", error);
      toast.error("Failed to download file");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen">
      <main className="flex-grow pt-24">
        {/* Hero Section */}
        <section className="bg-estates-gray-100 py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="text-4xl md:text-5xl font-bold text-estates-primary mb-4">
                {HeroSection?.title}
              </h1>
              <p className="text-lg text-gray-700 mb-8">
                {HeroSection?.description}
              </p>
            </div>
          </div>
        </section>

        <TeamMemberView />
        <PlanningPartner />
        <InvestmentCircle />

        {/* Call to Action Section */}
        <section className="py-16 bg-estates-primary text-white">
          <div className="container mx-auto px-4">
            <div className="max-w-6xl mx-auto text-center">
              <h2 className="text-3xl font-bold mb-6">
                Ready to be part of this visionary real estate opportunity?
              </h2>
              <p className="text-xl mb-10 opacity-90">
                Join us in building the future of residential excellence
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
                <div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors"
                  onClick={() => setIsAppointmentOpen(true)}
                >
                  <Phone className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Book a Consultation
                  </h3>
                  <p className="text-white/80 mb-4">
                    Speak with our investment advisors about opportunities.
                  </p>
                </div>

                <div
                  className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors cursor-pointer"
                  onClick={handleDownload}
                >
                  <FileText className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Download Investment Brochure
                  </h3>
                  <p className="text-white/80 mb-4">
                    Get detailed information about our project and returns.
                  </p>
                </div>

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                  <Link href={paths.public.contact}>
                    <MapPin className="h-10 w-10 mx-auto mb-4 text-white" />
                    <h3 className="text-xl font-semibold mb-2">
                      Visit the Project Site
                    </h3>
                    <p className="text-white/80 mb-4">
                      See the development location and progress in person.
                    </p>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
      <AppointmentDialog
        open={isAppointmentOpen}
        onOpenChange={setIsAppointmentOpen}
      />
    </div>
  );
};

export default About;
