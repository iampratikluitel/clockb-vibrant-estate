"use client"

import { MapPin, Building, TrendingUp, CheckCircle } from "lucide-react";
import React, { useEffect, useState } from "react";

interface KeyHighlight {
  card1icon: string;
  card1name: string;
  card1description: string[];
  card2icon: string;
  card2name: string;
  card2description: string[];
  card3icon: string;
  card3name: string;
  card3description: string[];
}

export default function KeyHighlightsInvestment() {
  const [keyHighlights, setKeyHighlights] = useState<KeyHighlight | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      console.log("Fetching data...jndjcn");
      try {
        const response = await fetch(
          "/api/public/investor-relations/key-highlight"
        );
        const data = await response.json();
        setKeyHighlights(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
      fetchData();
    };
  }, []);

  return (
    <>
      {/* Key Highlights Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-estates-secondary mb-6 tracking-tight">
              Key Highlights
            </h2>
            <div className="w-24 h-1.5 bg-estates-primary mx-auto mb-8 rounded-full"></div>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Location & Connectivity */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#D3E4FD] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <MapPin className="h-7 w-7 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">
                  {keyHighlights?.card1name || "Prime Location & Connectivity"}
                </h3>
              </div>
              <ul className="space-y-3">
                <HighlightItem text="The site is approximately 8 KM from Ekantakuna Ring Road and 4.5 KM from Bhaisipati." />
                <HighlightItem text="Located close to the Kathmandu-Terai Fast Track Road, which connects Kathmandu to Nijgadh International Airport." />
                <HighlightItem text="Connected to the Bagmati Bridge, soon to be completed, linking Dakshinkali Nagarpalika and Lalitpur Metropolitan City." />
              </ul>
            </div>

            {/* Residential & Commercial */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#F2FCE2] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <Building className="h-7 w-7 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">
                  Ideal for Residential & Commercial Purposes
                </h3>
              </div>
              <ul className="space-y-3">
                <HighlightItem text="The east-facing project site is near Pharping Reservoir and Pharping Hydropower, one of Asia's oldest power stations." />
                <HighlightItem text="Strategically located opposite the planned Lalitpur Smart City." />
              </ul>
            </div>

            {/* Investment Potential */}
            <div className="bg-estates-gray-100 rounded-xl p-8 shadow-md hover:shadow-lg transition-all duration-300 border border-estates-gray-200 group">
              <div className="flex items-center mb-6">
                <div className="w-14 h-14 rounded-full bg-[#FDE1D3] flex items-center justify-center mr-4 group-hover:scale-110 transition-transform duration-300">
                  <TrendingUp className="h-7 w-7 text-estates-primary" />
                </div>
                <h3 className="text-xl font-semibold text-estates-secondary">
                  High Investment Potential
                </h3>
              </div>
              <ul className="space-y-3">
                <HighlightItem text="Approximately 3 KM from the proposed Fast Track Bus Stop." />
                <HighlightItem text="Close to the Dry Port, a major logistics hub, making it attractive for commercial use." />
                <HighlightItem text="Land prices are fairly valued, making this a high ROI opportunity compared to similar locations in Kathmandu." />
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

const HighlightItem = ({ text }: { text: string }) => (
  <li className="flex items-start">
    <CheckCircle className="h-5 w-5 text-green-500 mr-3 mt-0.5 flex-shrink-0" />
    <span className="text-gray-600">{text}</span>
  </li>
);
