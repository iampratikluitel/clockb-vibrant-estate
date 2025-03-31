"use client"
import Footer from "./Footer";
import Header from "./Header";
import Hero from "./Hero";
import InvestmentBenefits from "./InvestmentBenefits";
import KeyHighlights from "./KeyHighlights";
import NewsInsights from "./NewsInsights";
import OngoingProjects from "./OngoingProjects";
import ProjectTimeline from "./ProjectTimeline";
import Testimonials from "./Testimonials";

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
