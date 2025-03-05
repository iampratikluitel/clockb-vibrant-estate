
// import Header from "@/components/layout/Header";
// import Footer from "@/components/layout/Footer";
// import Hero from "@/components/sections/Hero";
// import KeyHighlights from "@/components/sections/KeyHighlights";
// import InvestmentBenefits from "@/components/sections/InvestmentBenefits";
// import ProjectTimeline from "@/components/sections/ProjectTimeline";
// import OngoingProjects from "@/components/sections/OngoingProjects";
// import Testimonials from "@/components/sections/Testimonials";
// import NewsInsights from "@/components/sections/NewsInsights";

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
      {/* <Footer /> */}
    </div>
  );
};

export default Index;
