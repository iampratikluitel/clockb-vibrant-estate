'use client';

import { Calendar, CheckCircle2 } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export type TimelineMilestone = {
  title: string;
  description: string;
  period: string;
  color: string;
};

interface FixedTimelineCardsProps {
  rawData: any;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const fixedColors = [
  "bg-[#D3E4FD]",
  "bg-[#F2FCE2]",
  "bg-[#FDE1D3]",
  "bg-[#E5DEFF]",
  "bg-[#FFDEE2]",
];

const FixedTimelineCards = ({ rawData, activeIndex, setActiveIndex }: FixedTimelineCardsProps) => {
  const milestones: TimelineMilestone[] = fixedColors.map((color, index) => ({
    title: rawData?.[`card${index + 1}title`] || "",
    description: rawData?.[`card${index + 1}description`] || "",
    period: rawData?.[`card${index + 1}Date`] || "",
    color,
  }));

  return (
    <div className="flex flex-wrap gap-4">
      {milestones.map((milestone, index) => (
        <div key={index} className="flex-1 min-w-[200px]">
          <div
            className={cn(
              "relative transition-all duration-500 group cursor-pointer",
              index === activeIndex ? "z-10 scale-105" : "z-0 hover:-translate-y-2"
            )}
            onClick={() => setActiveIndex(index)}
          >
            <div className="flex absolute left-1/2 -translate-x-1/2 -top-4 items-center justify-center z-10">
              <div
                className={cn(
                  "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
                  index === activeIndex
                    ? "bg-estates-primary text-white scale-125 shadow-lg shadow-estates-primary/30"
                    : "bg-white border-2 border-estates-gray-300 text-estates-primary group-hover:border-estates-primary"
                )}
              >
                {index === activeIndex ? (
                  <CheckCircle2 size={16} />
                ) : (
                  <span className="text-sm font-bold">{index + 1}</span>
                )}
              </div>
            </div>
            <div
              className={cn(
                "h-full p-6 rounded-xl transition-all duration-300",
                milestone.color,
                index === activeIndex
                  ? "border-2 border-estates-primary shadow-xl"
                  : "border border-estates-gray-200 group-hover:border-estates-primary/50 group-hover:shadow-md"
              )}
            >
              <div className="flex items-center gap-2 mb-3 text-estates-primary font-semibold">
                <Calendar className="size-4" />
                <span>{milestone.period ? format(new Date(milestone.period), "MMM yyyy") : "N/A"}</span>
              </div>
              <h3
                className={cn(
                  "text-xl font-bold mb-3 transition-all duration-300",
                  index === activeIndex ? "text-estates-primary" : "text-gray-800 group-hover:text-estates-primary"
                )}
              >
                {milestone.title || "Untitled"}
              </h3>
              <p className="text-slate-600 text-sm leading-relaxed">{milestone.description || "No description available."}</p>
              <div
                className={cn(
                  "h-1 w-16 rounded-full mt-4 transition-all duration-300",
                  index === activeIndex ? "bg-estates-primary" : "bg-estates-gray-200 group-hover:bg-estates-primary/50"
                )}
              />
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default FixedTimelineCards;
