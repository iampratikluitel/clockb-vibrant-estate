"use client";

import React, { useEffect, useState } from "react";
import { MapPin, TrendingUp, ShieldCheck } from "lucide-react";

interface Benefit {
  card8icon: string;
  card8name: string;
  card8description: string;
  card9icon: string;
  card9name: string;
  card9description: string;
  card10icon: string;
  card10name: string;
  card10description: string;
}


const InvestmentBenefits = () => {
  const [activeBenefit, setActiveBenefit] = useState<Benefit | null>(null);
  const benefits = [
    {
      icon: activeBenefit?.card8icon || MapPin,
      title: activeBenefit?.card8name || "Strategic Location",
      points: activeBenefit?.card8description || [
        "Adjacent to future smart city development",
        "Proximity to major infrastructure projects",
        "Excellent connectivity to urban centers",
      ],
    },
    {
      icon: activeBenefit?.card9icon || TrendingUp,
      title: activeBenefit?.card9name || "High Returns",
      points: activeBenefit?.card9description || [
        "Expert-projected land value appreciation",
        "Growing market demand in the area",
        "Strategic investment timing",
      ],
    },
    {
      icon: activeBenefit?.card10icon || ShieldCheck,
      title: activeBenefit?.card10name || "Investor Security",
      points: activeBenefit?.card10description || [
        "Transparent ownership structure",
        "Complete legal documentation",
        "Secure investment framework",
      ],
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          "/api/public/configuration/landing/landing-third-section"
        );
        const data = await response.json();
        setActiveBenefit(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  return (
    <div className="relative py-20 overflow-hidden">
      {/* Background with abstract gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-estates-gray-100 via-white to-estates-gray-200 opacity-60" />

      {/* Subtle pattern overlay */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiMxOTVhOTIiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDM0di00aC0ydjRoLTR2Mmg0djRoMnYtNGg0di0yaC00em0wLTMwVjBoLTJ2NGgtNHYyaDR2NGgyVjZoNFY0aC00ek02IDM0di00SDR2NEgwdjJoNHY0aDJ2LTRoNHYtMkg2ek02IDRWMEg0djRIMHYyaDR2NGgyVjZoNFY0SDZ6Ii8+PC9nPjwvZz48L3N2Zz4=')] opacity-30" />

      {/* Accent decorative elements */}
      <div className="absolute top-20 left-0 w-64 h-64 bg-estates-primary/5 rounded-full blur-3xl -translate-x-1/2" />
      <div className="absolute bottom-20 right-0 w-96 h-96 bg-estates-primary/5 rounded-full blur-3xl translate-x-1/2" />

      {/* Content */}
      <div className="container relative z-10 mx-auto px-4">
        {/* Section header */}
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-estates-secondary mb-4 tracking-tight">
            Why Invest With Us?
          </h2>
          <div className="flex items-center justify-center mb-6">
            <div className="h-1 w-16 bg-estates-primary rounded-full" />
            <div className="h-1 w-4 bg-estates-primary/50 rounded-full mx-1" />
            <div className="h-1 w-8 bg-estates-primary/30 rounded-full" />
          </div>
          <p className="text-gray-600 text-lg max-w-2xl mx-auto">
            Make a smart investment choice with our strategically located
            properties offering high returns and complete peace of mind.
          </p>
        </div>

        {/* Benefits cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 max-w-7xl mx-auto">
          {benefits.map((benefit, index) => (
            <div
              key={index}
              className="group relative overflow-hidden rounded-2xl transition-all duration-500"
              style={{ animationDelay: `${index * 150}ms` }}
            >
              {/* Card background with gradient */}
              <div className="absolute inset-0 bg-gradient-to-br from-white to-estates-gray-100 opacity-90" />

              {/* Card content */}
              <div className="relative p-8 h-full flex flex-col">
                <div className="mb-6 flex items-center justify-center">
                  <div className="w-20 h-20 flex items-center justify-center rounded-xl bg-estates-primary/10 text-estates-primary group-hover:scale-110 transition-all duration-300">
                    <benefit.icon className="w-10 h-10" />
                  </div>
                </div>

                <h3 className="text-2xl font-semibold mb-5 text-estates-secondary text-center group-hover:text-estates-primary transition-colors duration-300">
                  {benefit.title}
                </h3>

                <ul className="space-y-4 mt-auto">
                  {Array.isArray(benefit.points) && benefit.points.map((point, pointIndex) => (
                    <li
                      key={pointIndex}
                      className="flex items-start text-gray-600 hover:text-estates-primary transition-colors duration-200"
                    >
                      <span
                        className="w-2 h-2 bg-estates-primary rounded-full mt-2 mr-3 flex-shrink-0 
                        group-hover:scale-125 transition-transform duration-200"
                      />
                      <span>{point}</span>
                    </li>
                  ))}
                </ul>

                {/* Hover effect border */}
                <div className="absolute inset-0 border-2 border-transparent group-hover:border-estates-primary/20 rounded-2xl transition-all duration-300" />
              </div>

              {/* Bottom shine effect on hover */}
              <div className="absolute -bottom-2 left-0 right-0 h-1 bg-estates-primary/30 transform scale-x-0 group-hover:scale-x-100 transition-transform duration-500 rounded-full origin-left" />
            </div>
          ))}
        </div>

        {/* Bottom decoration */}
        <div className="flex justify-center mt-16">
          <div className="h-1 w-24 bg-estates-primary/20 rounded-full" />
        </div>
      </div>
    </div>
  );
};

export default InvestmentBenefits;
