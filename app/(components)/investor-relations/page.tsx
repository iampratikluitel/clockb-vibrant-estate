"use client";

import { useEffect, useState } from "react";
import { useToast } from "@/hooks/use-toast";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import KeyHighlightsInvestment from "./components/key-highlights";
import InvestmentModelSection from "./components/investment-modle-section";
import TermAndCondition from "./components/terms-and-comdition";
import InvestmentTeamSection from "./components/investment-team-section";
import CallToAction from "./components/call-to-action-section";
import ContactInformationSection from "./components/contact-information-section";
import DownloadInvestmentBrochure from "./components/download-investment-brochure";

interface HeroSection {
  title: string;
  subtitle: string;
  description: string;
}

const InvestmentRelations = () => {
  const { toast } = useToast();
  const [heroSection, setHeroSection] = useState<HeroSection | null>(null);

  const handleDownload = () => {
    toast({
      title: "Download started",
      description: "Your investment brochure is being downloaded.",
    });
  };

  useEffect(() => {
    const fetchHeroSection = async () => {
      console.log("Fetching hero section");
      try {
        const response = await fetch(
          "/api/public/investor-relations/main-section"
        );
        const data = await response.json();
        setHeroSection(data.heroSection);
      } catch (error) {
        console.error("Error fetching hero section:", error);
      }
    };
    fetchHeroSection();
  }, []);

  return (
    <div className="min-h-screen bg-estates-gray-100">
      <Header />

      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        {/* Decorative background elements */}
        <div className="absolute inset-0 bg-gradient-to-br from-estates-gray-100 via-white to-estates-gray-200 opacity-60" />
        <div className="absolute top-20 left-0 w-64 h-64 bg-estates-primary/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-estates-primary/5 rounded-full blur-3xl translate-x-1/2" />

        {/* Content */}
        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-estates-primary mb-4 tracking-tight animate-fade-in">
              {heroSection?.title ||
                "Invest in the Future of Real Estate at Saukhel"}
            </h1>
            <p className="text-xl md:text-2xl font-medium text-estates-secondary mb-6 animate-fade-in delay-100">
              {heroSection?.subtitle || "Secure. Profitable. Transparent."}
            </p>
            <p className="text-gray-600 md:text-lg mb-8 max-w-3xl mx-auto animate-fade-in delay-200">
              {heroSection?.description ||
                `The Saukhel Real Estate Project offers a unique opportunity to be
              part of a high-value investment in one of Nepal's most promising
              locations. With a proven track record of 2X land value
              appreciation, a strategic location, and transparent investment
              policies, we ensure secure and rewarding investments.`}
            </p>
            <DownloadInvestmentBrochure />
          </div>
        </div>
      </section>

      {/* Key Highlights Section */}
      <KeyHighlightsInvestment />

      {/* Investment Model Section - REDESIGNED */}
      <InvestmentModelSection />

      {/* Terms & Conditions Section */}
      <TermAndCondition />


      

      {/* Investment Team Section */}
      <InvestmentTeamSection />

      {/* Call to Action Section */}
      <CallToAction />

      {/* Contact Information Section */}
      <ContactInformationSection />

      <Footer />
    </div>
  );
};

export default InvestmentRelations;
