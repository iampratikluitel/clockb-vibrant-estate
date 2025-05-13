"use client";

import { cn } from "@/lib/utils";
import { Calendar, CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import { format } from "date-fns";
import { useGetPublicConfigLandingPageQuery } from "@/store/api/Public/publicConfiguration";

// Timeline milestone type
type TimelineMilestone = {
  period: string;
  title: string;
  description: string;
};

interface ProjectTimelineProps {
  initialData?: {
    milestones?: TimelineMilestone[];
    [key: string]: any;
  } | null;
}

const milestoneColors = [
  "bg-[#D3E4FD]",
  "bg-[#F2FCE2]",
  "bg-[#FDE1D3]",
  "bg-[#E5DEFF]",
  "bg-[#FFDEE2]",
];

const ProjectTimeline = ({ initialData }: ProjectTimelineProps) => {
  const [timelineData, setTimelineData] = useState<TimelineMilestone[]>([]);
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVisible, setIsVisible] = useState(true);
  const [isLoading, setIsLoading] = useState(!initialData);

  useEffect(() => {
    if (initialData) {
      const data = processInitialData(initialData);
      console.log("initial", data);
      setTimelineData(data);
      setIsLoading(false);
    } else {
      fetchTimelineData();
    }
  }, [initialData]);

  const processInitialData = (data: any): TimelineMilestone[] => {
    const milestones: TimelineMilestone[] = [];

    for (let i = 1; i <= 5; i++) {
      const title = data[`card${i}title`];
      const description = data[`card${i}description`];
      const currentDateStr = data[`card${i}Date`];
      const nextDateStr = data[`card${i + 1}Date`];

      if (title) {
        let period = "Unknown";

        if (currentDateStr) {
          const startYear = new Date(currentDateStr).getFullYear();
          const endYear = nextDateStr
            ? new Date(nextDateStr).getFullYear()
            : startYear;

          if (!isNaN(startYear)) {
            if (isNaN(endYear)) {
              period = `${startYear} - Unknown`;
              console.warn(
                `Invalid nextDate for card${
                  i + 1
                }, using "Unknown" for end year`
              );
            } else {
              period = `${startYear} - ${endYear}`;
            }
          } else {
            console.warn(
              `Invalid startDate for card${i}, using "Unknown" for start year`
            );
          }
        }

        milestones.push({ title, description, period });
      }
    }

    return milestones;
  };

  const fetchTimelineData = async () => {
    try {
      setIsLoading(true);
      const response = await fetch("/api/admin/configuration/landingpage");
      if (!response.ok) throw new Error("Failed to fetch timeline data");
      const data = await response.json();
      const formatted = processInitialData(data);
      setTimelineData(formatted);
    } catch (error) {
      console.error("Timeline fetch error:", error);
      setTimelineData([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    if (isLoading) return;

    // Set visibility to true after a short timeout to ensure the component is rendered
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 500);

    const el = document.getElementById("timeline-container");
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.1 }
    );

    observer.observe(el);

    return () => {
      observer.disconnect();
      clearTimeout(timer);
    };
  }, [isLoading]);

  // Default visibility to true if there's no data yet
  useEffect(() => {
    if (timelineData.length > 0 && !isVisible) {
      setIsVisible(true);
    }
  }, [timelineData, isVisible]);

  if (timelineData.length === 0) return null;

  return (
    <section
      className="pt-24 bg-gradient-to-b from-white to-estates-gray-100"
      id="timeline"
    >
      <div className="container px-4 mx-auto">
        <div className="mb-16 text-center max-w-3xl mx-auto">
          <div className="inline-block bg-estates-primary/10 px-4 py-2 rounded-full mb-4">
            <TrendingUp
              className="inline-block mr-2 text-estates-primary"
              size={20}
            />
            <span className="text-estates-primary font-medium">
              Our Growth Journey
            </span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-estates-primary leading-tight">
            Project Journey: From Concept to Execution
          </h2>
          <p className="text-slate-600 text-lg">
            Follow our path from initial concept to a thriving real estate
            development, and see how our investors have grown with us along the
            way.
          </p>
        </div>

        <div
          id="timeline-container"
          className={cn(
            "relative transition-all duration-1000",
            isVisible ? "opacity-100" : "opacity-0 translate-y-8"
          )}
        >
          <div className="absolute left-0 right-0 top-16 h-2 bg-gradient-to-r from-estates-primary/10 via-estates-primary to-estates-primary/10 rounded-full hidden md:block">
            <div
              className="absolute inset-0 bg-gradient-to-r from-estates-primary/20 to-estates-primary animate-pulse rounded-full opacity-70"
              style={{
                animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
              }}
            />
          </div>

          {/* Desktop */}
          <div className="hidden md:flex flex-wrap gap-4 mb-16">
            {timelineData.map((milestone, index) => (
              <div
                key={index}
                className="flex-1 min-w-[200px]"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <TimelineItem
                  milestone={milestone}
                  isActive={index === activeIndex}
                  index={index}
                  total={timelineData.length}
                  onClick={() => setActiveIndex(index)}
                  bgColor={milestoneColors[index % milestoneColors.length]}
                />
              </div>
            ))}
          </div>

          {/* Mobile */}
          <div className="md:hidden space-y-6 relative mb-16">
            <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-estates-primary/20 via-estates-primary to-estates-primary/20" />
            {timelineData.map((milestone, index) => (
              <div
                key={index}
                className={cn(
                  "pl-12 relative transition-all duration-500",
                  isVisible
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 -translate-x-4"
                )}
                style={{ transitionDelay: `${index * 150}ms` }}
              >
                <div
                  className={cn(
                    "absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow transition-all duration-300",
                    index === activeIndex
                      ? "bg-estates-primary text-white scale-110"
                      : "bg-white border-2 border-estates-gray-300 text-estates-primary"
                  )}
                >
                  {index === activeIndex ? (
                    <CheckCircle2 size={16} />
                  ) : (
                    <span className="text-sm font-bold">{index + 1}</span>
                  )}
                </div>
                <MobileTimelineItem
                  milestone={milestone}
                  isActive={index === activeIndex}
                  index={index}
                  onClick={() => setActiveIndex(index)}
                  bgColor={milestoneColors[index % milestoneColors.length]}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

interface TimelineItemProps {
  milestone: TimelineMilestone;
  isActive?: boolean;
  index: number;
  total: number;
  onClick: () => void;
  bgColor: string;
}

const TimelineItem = ({
  milestone,
  isActive = false,
  index,
  onClick,
  bgColor,
}: TimelineItemProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-500 group cursor-pointer animate-fade-in",
        isActive ? "z-10 scale-105" : "z-0 hover:-translate-y-2"
      )}
      onClick={onClick}
    >
      <div className="flex absolute left-1/2 -translate-x-1/2 -top-4 items-center justify-center z-10">
        <div
          className={cn(
            "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
            isActive
              ? "bg-estates-primary text-white scale-125 shadow-lg shadow-estates-primary/30"
              : "bg-white border-2 border-estates-gray-300 text-estates-primary group-hover:border-estates-primary"
          )}
        >
          {isActive ? (
            <CheckCircle2 size={16} />
          ) : (
            <span className="text-sm font-bold">{index + 1}</span>
          )}
        </div>
      </div>
      <div
        className={cn(
          "h-full p-6 rounded-xl transition-all duration-300",
          bgColor,
          isActive
            ? "border-2 border-estates-primary shadow-xl"
            : "border border-estates-gray-200 group-hover:border-estates-primary/50 group-hover:shadow-md"
        )}
      >
        <div className="flex items-center gap-2 mb-3 text-estates-primary font-semibold">
          <Calendar className="size-4" />
          {/* <span>
            {(() => {
              try {
                return format(new Date(milestone.period), "MMM yyyy");
              } catch (error) {
                console.error("Date formatting error:", error);
                return "Date Unknown";
              }
            })()}
          </span> */}
          <span>{milestone.period}</span>
        </div>
        <h3
          className={cn(
            "text-xl font-bold mb-3 transition-all duration-300",
            isActive
              ? "text-estates-primary"
              : "text-gray-800 group-hover:text-estates-primary"
          )}
        >
          {milestone.title}
        </h3>
        <p className="text-slate-600 text-sm leading-relaxed">
          {milestone.description}
        </p>
        <div
          className={cn(
            "h-1 w-16 rounded-full mt-4 transition-all duration-300",
            isActive
              ? "bg-estates-primary"
              : "bg-estates-gray-200 group-hover:bg-estates-primary/50"
          )}
        />
      </div>
    </div>
  );
};

interface MobileTimelineItemProps {
  milestone: TimelineMilestone;
  isActive?: boolean;
  index: number;
  onClick: () => void;
  bgColor: string;
}

const MobileTimelineItem = ({
  milestone,
  isActive = false,
  onClick,
  bgColor,
}: MobileTimelineItemProps) => {
  return (
    <div
      className={cn(
        "p-5 rounded-xl transition-all duration-300 cursor-pointer",
        bgColor,
        isActive
          ? "border-2 border-estates-primary shadow-xl"
          : "border border-estates-gray-200 hover:border-estates-primary/50 hover:shadow-md"
      )}
      onClick={onClick}
    >
      <h3
        className={cn(
          "text-lg font-bold mb-2 transition-all duration-300",
          isActive ? "text-estates-primary" : "text-gray-800"
        )}
      >
        {milestone.title}
      </h3>
      <div className="flex items-center gap-2 mb-3 text-estates-primary font-medium text-sm">
        <Calendar className="size-3.5" />
        {/* <span>
          {(() => {
            try {
              return format(new Date(milestone.period), "MMM yyyy");
            } catch (error) {
              console.error("Date formatting error:", error);
              return "Date Unknown";
            }
          })()}
        </span> */}
        <span>{milestone.period}</span>
      </div>
      <p className="text-slate-600 text-sm leading-relaxed">
        {milestone.description}
      </p>
    </div>
  );
};

export default ProjectTimeline;
