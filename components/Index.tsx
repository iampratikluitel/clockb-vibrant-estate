"use client"

import Footer from "./homepage/Footer";
import Header from "./homepage/Header";
import Hero from "./homepage/Hero";
import InvestmentBenefits from "./homepage/InvestmentBenefits";
import KeyHighlights from "./homepage/KeyHighlights";
import NewsInsights from "./homepage/NewsInsights";
import OngoingProjects from "./homepage/OngoingProjects";
import ProjectTimeline from "./homepage/ProjectTimeline";
import Testimonials from "./homepage/Testimonials";

const Index = () => {
  return (
    <div className="min-h-screen bg-estates-gray-100">
      <Header />
      <Hero />
      <KeyHighlights />
      <InvestmentBenefits />
      <ProjectTimeline />
      <OngoingProjects />
      <Testimonials />
      <NewsInsights />
      <Footer />              
    </div>
  );
};

export default Index;
