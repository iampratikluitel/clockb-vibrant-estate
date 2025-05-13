"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Calendar } from "lucide-react";
import { DEVELOPMENTPHASE } from "@/lib/types";
import { useGetPublicDevelopmentPhaseQuery } from "@/store/api/Public/publicDevelopmentPhase";
import PageLoader from "@/components/PageLoader";

const PhaseWise = () => {
  const { data, isLoading, error } = useGetPublicDevelopmentPhaseQuery("")
  
  const [phaseData, setPhaseData] = useState<DEVELOPMENTPHASE | undefined>(undefined);

  useEffect(() => {
    if (data) {
      setPhaseData(data);
    }
  }, [data]);

  const normalizedPhases = phaseData
    ? [
        {
          phaseNumber: "I",
          title: phaseData.card1title,
          description: phaseData.card1description,
          period: phaseData.card1Date,
          isActive: true,
        },
        {
          phaseNumber: "II",
          title: phaseData.card2title,
          description: phaseData.card2description,
          period: phaseData.card2Date,
        },
        {
          phaseNumber: "III",
          title: phaseData.card3title,
          description: phaseData.card3description,
          period: phaseData.card3Date,
        },
      ]
    : [];

  return (
    <section className="py-16 px-4 md:px-8 lg:px-16 bg-white">
      <div className="container mx-auto">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl md:text-3xl font-bold text-center text-estates-primary mb-4">
            Phase-wise Development Breakdown
          </h2>
          <p className="text-center text-gray-600 max-w-3xl mx-auto mb-12">
            Our project is carefully planned across three strategic phases to
            ensure sustainable growth and maximum value.
          </p>

          {isLoading ? (
            <p className="text-center">Loading...</p>
          ) : error ? (
            <p className="loader"></p>
          ) : (
            <div className="relative pb-12">
              <div className="hidden md:block absolute left-0 right-0 top-1/2 h-1 bg-estates-gray-300 transform -translate-y-1/2"></div>

              <div className="grid md:grid-cols-3 gap-8">
                {normalizedPhases.map((phase, idx) => (
                  <TimelinePhase
                    key={idx}
                    phaseNumber={phase.phaseNumber}
                    period={phase.period}
                    title={phase.title}
                    description={phase.description}
                    isActive={phase.isActive}
                  />
                ))}
              </div>
            </div>
          )}

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
    </section>
  );
};

const TimelinePhase = ({
  phaseNumber,
  period,
  title,
  description,
  isActive = false,
}: {
  phaseNumber: string;
  period: string;
  title: string;
  description: string;
  isActive?: boolean;
}) => {
  return (
    <div className={`relative ${isActive ? "z-10" : ""}`}>
      <div className="hidden md:flex absolute left-1/2 top-0 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10">
        <div
          className={`w-14 h-14 rounded-full flex items-center justify-center ${
            isActive
              ? "bg-estates-primary text-white shadow-lg"
              : "bg-white border-2 border-estates-gray-300 text-estates-primary"
          }`}
        >
          <span className="text-xl font-bold">{phaseNumber}</span>
        </div>
      </div>

      <div
        className={`p-6 rounded-lg border-2 transition-all duration-300 ${
          isActive
            ? "bg-white border-estates-primary shadow-xl"
            : "bg-estates-gray-100 border-estates-gray-300 hover:shadow-md"
        }`}
      >
        <div className="md:hidden flex items-center gap-2 mb-3">
          <div
            className={`w-8 h-8 rounded-full flex items-center justify-center ${
              isActive
                ? "bg-estates-primary text-white"
                : "bg-white border border-estates-gray-300 text-estates-primary"
            }`}
          >
            <span className="text-sm font-bold">{phaseNumber}</span>
          </div>
          <span className="text-estates-primary font-semibold">
            Phase {phaseNumber}
          </span>
        </div>

        <div className="flex items-center gap-2 mb-3 text-estates-primary font-semibold">
          <Calendar className="w-4 h-4" />
          <span>{period}</span>
        </div>

        <h3
          className={`text-xl font-bold mb-3 ${
            isActive ? "text-estates-primary" : "text-estates-secondary"
          }`}
        >
          {title}
        </h3>

        <p className="text-gray-600">{description}</p>
      </div>
    </div>
  );
};

export default PhaseWise;
