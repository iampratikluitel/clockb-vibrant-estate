"use client";

import { MapPin, TrendingUp, ShieldCheck, Leaf } from "lucide-react";

const highlights = [
  {
    icon: MapPin,
    title: "Strategic Location",
    description:
      "Great strategic location near fast-track road and only 8KM from Ekantakuna Ring Road",
    bgColor: "bg-[#D3E4FD]", // Soft blue
  },
  {
    icon: TrendingUp,
    title: "High ROI",
    description: "Projected over 2X land value appreciation",
    bgColor: "bg-[#F2FCE2]", // Soft green
  },
  {
    icon: ShieldCheck,
    title: "Transparency",
    description: "Secure investment with clear ownership structures",
    bgColor: "bg-[#FDE1D3]", // Soft peach
  },
  {
    icon: Leaf,
    title: "Sustainability",
    description: "Eco-conscious development with infrastructure upgrades",
    bgColor: "bg-[#E5DEFF]", // Soft purple
  },
];

const KeyHighlights = () => {
  return (
    <section className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-estates-secondary mb-6 tracking-tight">
            Why Choose Us?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-lg">
            Discover why we&apos;re your trusted partner in real estate development
            and investment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-7xl mx-auto">
          {highlights.map((highlight, index) => (
            <div
              key={index}
              className={`group p-8 text-center rounded-2xl shadow-lg hover:shadow-xl 
                transition-all duration-300 hover:-translate-y-1 animate-fade-in
                border border-gray-100 ${highlight.bgColor}`}
              style={{ animationDelay: `${index * 150}ms` }}
            >
              <div className="relative">
                <div
                  className="inline-flex items-center justify-center w-16 h-16 mb-6 
                  rounded-xl bg-white text-estates-primary 
                  group-hover:bg-estates-primary group-hover:text-white 
                  transition-colors duration-300"
                >
                  <highlight.icon className="w-8 h-8" />
                  <div
                    className="absolute -inset-4 bg-estates-primary/10 blur-xl 
                    rounded-full opacity-0 group-hover:opacity-100 
                    transition-opacity duration-300"
                  />
                </div>
              </div>
              <h3
                className="text-xl font-semibold mb-4 text-estates-secondary 
                group-hover:text-estates-primary transition-colors duration-300"
              >
                {highlight.title}
              </h3>
              <p className="text-gray-600 leading-relaxed">
                {highlight.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default KeyHighlights;
