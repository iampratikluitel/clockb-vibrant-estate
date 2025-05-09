"use client"

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
      <Hero />
      <KeyHighlights />
      <InvestmentBenefits />
      <ProjectTimeline />
      <OngoingProjects />
      <Testimonials />
      <NewsInsights />
    </div>
  );
};

export default Index;
