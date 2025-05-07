"use client";

import {
  ArrowRight,
  Building,
  Check,
  FileText,
  Leaf,
  PiggyBank,
  ShieldCheck,
  Calendar,
  MapPin,
  LayoutGrid,
  Droplets,
  Zap,
  Sun,
  Store,
  Users,
  DollarSign,
  ArrowUpRight,
  LandPlot,
  TrendingUp,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";
import Link from "next/link";
import PhaseWise from "./_components/PhaseWise";

const ProjectDescription = () => {
  return (
    <div className="min-h-screen bg-estates-gray-100">
      <Header />

      {/* Banner Image Section */}
      <div className="relative h-[60vh] md:h-[70vh] w-full">
        <img
          src="/bannerimage/homepage.jpg"
          alt="Saukhel Project Banner"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 to-black/10" />
      </div>

      {/* Hero Section */}
      <section className="pt-10 pb-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-estates-primary mb-4 animate-fade-in">
              Welcome to Saukhel Real Estate Project
            </h1>
            <p className="text-lg md:text-xl text-estates-secondary opacity-90 mb-8 animate-fade-in">
              A Visionary Development for Smart Investment & Sustainable Living
            </p>
            <div className="text-gray-600 mb-10 animate-fade-in delay-100">
              <p className="mb-4">
                Saukhel Real Estate Project is a strategically planned urban
                development designed to provide high-value investment
                opportunities while ensuring sustainable and modern living.
                Situated in a prime location, the project offers transparent
                investment models, legal security, and high ROI potential for
                investors and homebuyers alike.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Vision & Mission Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-estates-gray-200">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-12">
              Our Vision & Mission
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-estates-primary mr-3" />
                  <h3 className="text-xl font-bold text-estates-secondary">
                    Vision
                  </h3>
                </div>
                <p className="text-gray-600">
                  To create a thriving, sustainable, and high-value real estate
                  development that drives urban transformation and investor
                  prosperity.
                </p>
              </div>
              <div className="bg-white p-8 rounded-lg shadow-md transform hover:scale-105 transition-transform duration-300">
                <div className="flex items-center mb-4">
                  <FileText className="w-8 h-8 text-estates-primary mr-3" />
                  <h3 className="text-xl font-bold text-estates-secondary">
                    Mission
                  </h3>
                </div>
                <p className="text-gray-600">
                  To establish a legally secure, well-planned, and high-growth
                  real estate destination with modern infrastructure, premium
                  amenities, and strong investor returns.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Values Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-5xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-12">
              Our Core Values
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <CoreValueCard
                icon={
                  <ShieldCheck className="w-12 h-12 text-estates-primary" />
                }
                title="Transparency"
                description="Open communication and clear documentation at every step"
              />
              <CoreValueCard
                icon={<PiggyBank className="w-12 h-12 text-estates-primary" />}
                title="High ROI"
                description="Focused on delivering exceptional returns on investment"
              />
              <CoreValueCard
                icon={<Leaf className="w-12 h-12 text-estates-primary" />}
                title="Sustainability"
                description="Environmentally conscious development practices"
              />
              <CoreValueCard
                icon={<Building className="w-12 h-12 text-estates-primary" />}
                title="Infrastructure Growth"
                description="Continuous improvement of facilities and amenities"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Master Plan Overview Section */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-estates-gray-200">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-12">
              Master Plan Overview
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our project is developed over multiple phases, ensuring a
              structured and high-value progression.
            </p>

            <div className="bg-white p-8 rounded-lg shadow-md mb-12">
              <h3 className="text-xl font-bold text-estates-primary mb-6">
                Key Highlights
              </h3>
              <div className="grid md:grid-cols-3 gap-6">
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-estates-secondary mb-2">
                      Total Land Area
                    </h4>
                    <p className="text-gray-600">Approx. 300 Ropanis</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-estates-secondary mb-2">
                      Planned Infrastructure
                    </h4>
                    <p className="text-gray-600">
                      Roads, electricity, water, drainage, parks and open spaces
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="mt-1 mr-3">
                    <Check className="w-5 h-5 text-green-500" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-estates-secondary mb-2">
                      Zoning
                    </h4>
                    <p className="text-gray-600">
                      Residential, commercial, mixed-use
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="text-center">
              <Button
                className="bg-estates-primary hover:bg-estates-primary/90 text-white font-semibold px-6 py-6 rounded-lg group transition-all duration-300 transform hover:translate-y-[-2px] hover:shadow-xl"
                onClick={() => window.open("#", "_blank")}
              >
                View Our Master Plan
                <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </Button>
              {/* <p className="text-gray-500 text-sm mt-2">Experience our 3D animated master plan visualization</p> */}
            </div>
          </div>
        </div>
      </section>

      {/* Phase-wise Development Breakdown */}
      {/* <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-4">
              Phase-wise Development Breakdown
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              Our project is carefully planned across three strategic phases to
              ensure sustainable growth and maximum value
            </p>

            <div className="relative pb-12">
              <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-estates-gray-300 transform -translate-y-1/2"></div>

              <div className="grid md:grid-cols-3 gap-8">
                <TimelinePhase
                  phaseNumber="I"
                  period="2019 – 2025"
                  title="Foundation Phase"
                  description="Initial infrastructure, zoning, and land appreciation. Laying the groundwork for a successful development."
                  isActive={true}
                />

                <TimelinePhase
                  phaseNumber="II"
                  period="2025 – 2027"
                  title="Growth Phase"
                  description="Expansion of residential and commercial spaces, introduction of advanced amenities."
                />

                <TimelinePhase
                  phaseNumber="III"
                  period="2027 – 2030"
                  title="Maturity Phase"
                  description="Full-scale development of a sustainable and modern urban township."
                />
              </div>
            </div>

            <div className="text-center mt-8">
              <Button
                variant="cta"
                onClick={() => (window.location.href = "#investment-model")}
              >
                Learn About Investment Opportunities
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section> */}

      <PhaseWise />

      {/* Investment Model & Benefits */}
      <section
        id="investment-model"
        className="py-16 px-4 md:px-8 lg:px-16 bg-estates-gray-200"
      >
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-4">
              Investment Model & Benefits
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              A transparent and flexible investment approach designed for both
              seasoned investors and first-time buyers
            </p>

            <div className="grid md:grid-cols-2 gap-8 mb-12">
              {/* How Investment Works */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-estates-primary mb-6 flex items-center">
                  <DollarSign className="w-6 h-6 mr-2" />
                  How the Investment Works
                </h3>

                <div className="space-y-6">
                  <div className="flex">
                    <div className="mr-4 bg-estates-primary/10 p-2 rounded-full h-fit">
                      <LandPlot className="w-5 h-5 text-estates-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-estates-secondary mb-1">
                        Land Ownership Model
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Direct purchase, lease options, fractional investment
                        structures
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 bg-estates-primary/10 p-2 rounded-full h-fit">
                      <TrendingUp className="w-5 h-5 text-estates-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-estates-secondary mb-1">
                        Projected Returns
                      </h4>
                      <p className="text-gray-600 text-sm">
                        15-20% annual ROI with consistent appreciation
                      </p>
                    </div>
                  </div>

                  <div className="flex">
                    <div className="mr-4 bg-estates-primary/10 p-2 rounded-full h-fit">
                      <ArrowUpRight className="w-5 h-5 text-estates-primary" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-estates-secondary mb-1">
                        Exit Strategies
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Resale, rental income, investment liquidation
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Key Investor Benefits */}
              <div className="bg-white p-8 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-estates-primary mb-6 flex items-center">
                  <Check className="w-6 h-6 mr-2" />
                  Key Investor Benefits
                </h3>

                <ul className="space-y-4">
                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-estates-secondary">
                        High ROI and Asset Appreciation
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Consistent growth in property value over time
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-estates-secondary">
                        100% Legal Security & Transparency
                      </h4>
                      <p className="text-gray-600 text-sm">
                        All transactions legally documented and verified
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-estates-secondary">
                        Exclusive Early Access to Premium Plots
                      </h4>
                      <p className="text-gray-600 text-sm">
                        First choice of prime locations for early investors
                      </p>
                    </div>
                  </li>

                  <li className="flex items-start">
                    <Check className="w-5 h-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-estates-secondary">
                        Infrastructure-Driven Growth Potential
                      </h4>
                      <p className="text-gray-600 text-sm">
                        Value increase tied to continuous development
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>

            <div className="text-center">
              <Link href="/investorelations">
                <Button variant="cta">
                  Get Investment Details
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Infrastructure & Amenities */}
      <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
        <div className="container mx-auto">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-4">
              Infrastructure & Amenities
            </h2>
            <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
              World-class facilities designed for modern, comfortable, and
              sustainable living
            </p>

            <div className="grid lg:grid-cols-2 gap-8 mb-12">
              {/* Planned Infrastructure */}
              <div>
                <h3 className="text-xl font-bold text-estates-primary mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-2" />
                  Planned Infrastructure
                </h3>

                <div className="space-y-6">
                  <InfrastructureItem
                    icon={
                      <LayoutGrid className="w-5 h-5 text-estates-primary" />
                    }
                    title="Smart Road Networks & Transport Connectivity"
                    description="Well-planned roads with easy access to major highways and public transportation"
                  />

                  <InfrastructureItem
                    icon={<Zap className="w-5 h-5 text-estates-primary" />}
                    title="Reliable Electricity & Water Supply"
                    description="Uninterrupted power with backup systems and clean water supply throughout the development"
                  />

                  <InfrastructureItem
                    icon={<Droplets className="w-5 h-5 text-estates-primary" />}
                    title="Advanced Drainage & Waste Management"
                    description="Eco-friendly waste disposal and efficient drainage systems to prevent flooding"
                  />
                </div>
              </div>

              {/* Key Amenities */}
              <div>
                <h3 className="text-xl font-bold text-estates-primary mb-6 flex items-center">
                  <Sun className="w-6 h-6 mr-2" />
                  Key Amenities
                </h3>

                <div className="space-y-6">
                  <InfrastructureItem
                    icon={<Leaf className="w-5 h-5 text-estates-primary" />}
                    title="Green Parks & Open Spaces"
                    description="Beautifully landscaped parks and recreational areas for community gatherings"
                  />

                  <InfrastructureItem
                    icon={<Store className="w-5 h-5 text-estates-primary" />}
                    title="Commercial & Retail Zones"
                    description="Designated areas for shopping, dining, and business establishments"
                  />

                  <InfrastructureItem
                    icon={<Users className="w-5 h-5 text-estates-primary" />}
                    title="Community & Cultural Centers"
                    description="Spaces designed for cultural events, community activities, and social gatherings"
                  />
                </div>
              </div>
            </div>

            {/* 3D Vision Representation */}
            {/* <div className="bg-estates-gray-100 p-8 rounded-lg shadow-md text-center mb-8">
              <h3 className="text-lg font-bold text-estates-secondary mb-4">Visual Representation of Our Vision</h3>
              <div className="aspect-w-16 aspect-h-9 rounded-lg overflow-hidden bg-estates-gray-200 flex items-center justify-center">
                <div className="p-12 text-center">
                  <Building className="w-16 h-16 text-estates-primary mx-auto mb-4" />
                  <p className="text-estates-secondary font-medium">3D Visualization of Saukhel Project</p>
                  <Button 
                    variant="outline" 
                    className="mt-4"
                    onClick={() => window.open('#', '_blank')}
                  >
                    View 3D Model
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </div>
              </div>
              <p className="text-gray-500 text-sm mt-4">Experience our vision through our interactive 3D model</p>
            </div> */}

            <div className="text-center">
              <Button variant="cta" onClick={() => window.open("#", "_blank")}>
                Schedule a Site Visit
                <MapPin className="ml-2 w-5 h-5" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

// Core Value Card Component
const CoreValueCard = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="bg-estates-gray-100 p-6 rounded-lg border border-estates-gray-300 hover:shadow-lg transition-all duration-300 text-center group">
      <div className="mb-4 flex justify-center transform group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <h3 className="text-lg font-semibold text-estates-secondary mb-2">
        {title}
      </h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  );
};

// Timeline Phase Component
// const TimelinePhase = ({
//   phaseNumber,
//   period,
//   title,
//   description,
//   isActive = false,
// }: {
//   phaseNumber: string;
//   period: string;
//   title: string;
//   description: string;
//   isActive?: boolean;
// }) => {
//   return (
//     <div className={`relative ${isActive ? "z-10" : ""}`}>
//       {/* Timeline Point */}
//       <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
//         <div
//           className={`
//           w-14 h-14 rounded-full flex items-center justify-center 
//           ${
//             isActive
//               ? "bg-estates-primary text-white shadow-lg"
//               : "bg-white border-2 border-estates-gray-300 text-estates-primary"
//           }
//         `}
//         >
//           <span className="text-xl font-bold">{phaseNumber}</span>
//         </div>
//       </div>

//       {/* Phase Card */}
//       <div
//         className={`
//         p-6 rounded-lg border-2 transition-all duration-300
//         ${
//           isActive
//             ? "bg-white border-estates-primary shadow-xl"
//             : "bg-estates-gray-100 border-estates-gray-300 hover:shadow-md"
//         }
//       `}
//       >
//         {/* Mobile Phase Number */}
//         <div className="md:hidden flex items-center gap-2 mb-3">
//           <div
//             className={`
//             w-8 h-8 rounded-full flex items-center justify-center 
//             ${
//               isActive
//                 ? "bg-estates-primary text-white"
//                 : "bg-white border border-estates-gray-300 text-estates-primary"
//             }
//           `}
//           >
//             <span className="text-sm font-bold">{phaseNumber}</span>
//           </div>
//           <span className="text-estates-primary font-semibold">
//             Phase {phaseNumber}
//           </span>
//         </div>

//         <div className="flex items-center gap-2 mb-3 text-estates-primary font-semibold">
//           <Calendar className="w-4 h-4" />
//           <span>{period}</span>
//         </div>

//         <h3
//           className={`text-xl font-bold mb-3 ${
//             isActive ? "text-estates-primary" : "text-estates-secondary"
//           }`}
//         >
//           {title}
//         </h3>

//         <p className="text-gray-600">{description}</p>
//       </div>
//     </div>
//   );
// };

// Infrastructure Item Component
const InfrastructureItem = ({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) => {
  return (
    <div className="flex items-start bg-estates-gray-100 p-4 rounded-lg hover:shadow-md transition-all duration-300">
      <div className="mr-4 bg-white p-2 rounded-full">{icon}</div>
      <div>
        <h4 className="font-semibold text-estates-secondary mb-1">{title}</h4>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default ProjectDescription;
