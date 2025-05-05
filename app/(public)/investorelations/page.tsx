"use client";

import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import DownloadInvestmentBrochure from "./_components/download-investment-brochure";
import KeyHighlightsInvestment from "./_components/key-highlights";
import InvestmentModelSection from "./_components/investment-modle-section";
import TermAndCondition from "./_components/terms-and-comdition";
import InvestmentTeamSection from "./_components/investment-team-section";
import CallToAction from "./_components/call-to-action-section";
import ContactInformationSection from "./_components/contact-information-section";


const InvestmentRelations = () => {
  return (
    <div className="min-h-screen bg-estates-gray-100">
      <Header />
      {/* Hero Section */}
      <section className="relative pt-28 pb-20 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-estates-gray-100 via-white to-estates-gray-200 opacity-60" />
        <div className="absolute top-20 left-0 w-64 h-64 bg-estates-primary/5 rounded-full blur-3xl -translate-x-1/2" />
        <div className="absolute bottom-20 right-0 w-96 h-96 bg-estates-primary/5 rounded-full blur-3xl translate-x-1/2" />

        <div className="container relative z-10 mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-5xl font-bold text-estates-primary mb-4 tracking-tight animate-fade-in">
              Invest in the Future of Real Estate at Saukhel
            </h1>
            <p className="text-xl md:text-2xl font-medium text-estates-secondary mb-6 animate-fade-in delay-100">
              Secure. Profitable. Transparent.
            </p>
            <p className="text-gray-600 md:text-lg mb-8 max-w-3xl mx-auto animate-fade-in delay-200">
              The Saukhel Real Estate Project offers a unique opportunity to be
              part of a high-value investment in one of Nepal&apos;s most promising
              locations. With a proven track record of 2X land value
              appreciation, a strategic location, and transparent investment
              policies, we ensure secure and rewarding investments.
            </p>
            <DownloadInvestmentBrochure />
          </div>
        </div>
      </section>

      <KeyHighlightsInvestment />
      <InvestmentModelSection />
      <TermAndCondition />
      <InvestmentTeamSection />
      <CallToAction />
      <ContactInformationSection />
      <Footer />
    </div>
  );
};

export default InvestmentRelations;
