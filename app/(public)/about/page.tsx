"use client";

import { Phone, MapPin } from "lucide-react";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import TeamMemberView from "./_components/team-member";
import DownloadAboutBrochure from "./_components/download-brochure-aboutpage";
import PlanningPartner from "./_components/planning-partner";
import InvestmentCircle from "./_components/investment-circle";
import { useGetPublicAboutMainSectionQuery } from "@/store/api/Public/publicAbout";

const About = () => {
  const {data: HeroSection, isLoading} = useGetPublicAboutMainSectionQuery() 
  return (
    <div className="flex flex-col min-h-screen">
      <Header />

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
                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                  <Phone className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Book a Consultation
                  </h3>
                  <p className="text-white/80 mb-4">
                    Speak with our investment advisors about opportunities.
                  </p>
                </div>

                <DownloadAboutBrochure />

                <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 hover:bg-white/20 transition-colors">
                  <MapPin className="h-10 w-10 mx-auto mb-4 text-white" />
                  <h3 className="text-xl font-semibold mb-2">
                    Visit the Project Site
                  </h3>
                  <p className="text-white/80 mb-4">
                    See the development location and progress in person.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default About;
