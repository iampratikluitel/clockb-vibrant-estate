'use client'

import { cn } from "@/lib/utils";
import { useGetPublicConfigLandingPageQuery } from "@/store/api/Public/publicConfiguration";
import { Calendar, CheckCircle2, TrendingUp } from "lucide-react";
import { useEffect, useState } from "react";
import PageLoader from "../PageLoader";

type TimelineMilestone = {
  period: string;
  title: string;
  description: string;
};

// Fallback data in case API fails
const fallbackTimelineData: TimelineMilestone[] = [
  {
    period: "2019 – 2021",
    title: "Early Conceptualization",
    description: "Identified Saukhel as a high-potential real estate investment area. Conducted feasibility analysis."
  },
  {
    period: "2022",
    title: "Land Acquisition & Planning",
    description: "Secured approx. 160 ropanis of land for the project. Defined infrastructure development strategy."
  },
  {
    period: "2022 – 2025",
    title: "Phase 1 Investment & Growth",
    description: "Opened investment opportunities, began infrastructure upgrades. Early investors witnessed significant value appreciation."
  },
  {
    period: "2025 – 2027",
    title: "Phase 2 Initiation",
    description: "Launched the second phase of the project due to overwhelming investor success in Phase 1. Secured over 250 ropanis, making it a part of our large expansion plan."
  },
  {
    period: "2027 – 2030",
    title: "Phase 3 Planning",
    description: "Launch of a housing project, featuring modern living spaces. Development of community amenities, including parks, commercial spaces, and public utilities."
  }
];

const milestoneColors = [
  "bg-[#D3E4FD]", // Soft blue
  "bg-[#F2FCE2]", // Soft green
  "bg-[#FDE1D3]", // Soft peach
  "bg-[#E5DEFF]", // Soft purple
  "bg-[#FFDEE2]", // Soft pink
];

const ProjectTimeline = () => {
  const [activeIndex, setActiveIndex] = useState(2);
  const [isVisible, setIsVisible] = useState(false);
  const [timelineData, setTimelineData] = useState<TimelineMilestone[]>([]);

  // Fetch project timeline data
  const { data: projectData, isLoading, error } = useGetPublicConfigLandingPageQuery("");

  // Process the API data to match our timeline format
  useEffect(() => {
    if (projectData) {
      // Transform the database data to match our timeline format
      const transformedData: TimelineMilestone[] = [];
      
      // Loop through cards 1-5 and create timeline entries
      for (let i = 1; i <= 5; i++) {
        const titleKey = `card${i}title`;
        const descriptionKey = `card${i}description`;
        const dateKey = `card${i}Date`;

        // Only add if title exists
        if (projectData[titleKey]) {
          // Format date as period (if available)
          let period = "";
          if (projectData[dateKey]) {
            const date = new Date(projectData[dateKey]);
            period = date.getFullYear().toString();
          }

          transformedData.push({
            period,
            title: projectData[titleKey],
            description: projectData[descriptionKey] || "",
          });
        }
      }

      // Use the transformed data if available, otherwise fallback
      setTimelineData(transformedData.length > 0 ? transformedData : fallbackTimelineData);
    } else {
      // Use fallback data if API data is not available
      setTimelineData(fallbackTimelineData);
    }
  }, [projectData]);

  // Intersection observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.1 }
    );

    const element = document.getElementById('timeline-container');
    if (element) observer.observe(element);

    return () => {
      if (element) observer.unobserve(element);
    };
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white to-estates-gray-100" id="timeline">
      {isLoading ? (
        <PageLoader />
      ) : (
        <div className="container px-4 mx-auto">
          {/* Section Header */}
          <div className="mb-16 text-center max-w-3xl mx-auto">
            <div className="inline-block bg-estates-primary/10 px-4 py-2 rounded-full mb-4">
              <TrendingUp className="inline-block mr-2 text-estates-primary" size={20} />
              <span className="text-estates-primary font-medium">Our Growth Journey</span>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-estates-primary leading-tight">
              Project Journey: From Concept to Execution
            </h2>
            <p className="text-slate-600 text-lg">
              Follow our path from initial concept to a thriving real estate development, 
              and see how our investors have grown with us along the way.
            </p>
          </div>

          {/* Timeline Container */}
          <div 
            id="timeline-container" 
            className={cn(
              "relative transition-all duration-1000",
              isVisible ? "opacity-100" : "opacity-0 translate-y-8"
            )}
          >
            {/* Desktop Timeline Line with Gradient */}
            <div className="absolute left-0 right-0 top-16 h-2 bg-gradient-to-r from-estates-primary/10 via-estates-primary to-estates-primary/10 rounded-full hidden md:block">
              <div 
                className="absolute inset-0 bg-gradient-to-r from-estates-primary/20 to-estates-primary animate-pulse rounded-full opacity-70"
                style={{
                  animation: "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite"
                }}
              ></div>
            </div>

            {/* Desktop Timeline */}
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

            {/* Mobile Timeline - Vertical */}
            <div className="md:hidden space-y-6 relative mb-16">
              {/* Vertical Line */}
              <div className="absolute left-4 top-8 bottom-8 w-0.5 bg-gradient-to-b from-estates-primary/20 via-estates-primary to-estates-primary/20"></div>
              
              {timelineData.map((milestone, index) => (
                <div 
                  key={index} 
                  className={cn(
                    "pl-12 relative transition-all duration-500",
                    isVisible ? "opacity-100 translate-x-0" : "opacity-0 -translate-x-4"
                  )}
                  style={{ transitionDelay: `${index * 150}ms` }}
                >
                  {/* Timeline Point */}
                  <div className={cn(
                    "absolute left-0 top-4 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow transition-all duration-300",
                    index === activeIndex 
                      ? "bg-estates-primary text-white scale-110" 
                      : "bg-white border-2 border-estates-gray-300 text-estates-primary"
                  )}>
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
      )}
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

const TimelineItem = ({ milestone, isActive = false, index, onClick, bgColor }: TimelineItemProps) => {
  return (
    <div 
      className={cn(
        "relative transition-all duration-500 group cursor-pointer animate-fade-in",
        isActive 
          ? "z-10 scale-105" 
          : "z-0 hover:-translate-y-2",
      )}
      onClick={onClick}
    >
      {/* Timeline Point */}
      <div className="flex absolute left-1/2 -translate-x-1/2 -top-4 items-center justify-center z-10">
        <div className={cn(
          "w-8 h-8 rounded-full flex items-center justify-center transition-all duration-300",
          isActive 
            ? "bg-estates-primary text-white scale-125 shadow-lg shadow-estates-primary/30" 
            : "bg-white border-2 border-estates-gray-300 text-estates-primary group-hover:border-estates-primary"
        )}>
          {isActive ? (
            <CheckCircle2 size={16} />
          ) : (
            <span className="text-sm font-bold">{index + 1}</span>
          )}
        </div>
      </div>

      {/* Card */}
      <div className={cn(
        "h-full p-6 rounded-xl transition-all duration-300",
        bgColor,
        isActive 
          ? "border-2 border-estates-primary shadow-xl" 
          : "border border-estates-gray-200 group-hover:border-estates-primary/50 group-hover:shadow-md"
      )}>
        {/* Period */}
        {milestone.period && (
          <div className="flex items-center gap-2 mb-3 text-estates-primary font-semibold">
            <Calendar className="size-4" />
            <span>{milestone.period}</span>
          </div>
        )}

        {/* Title */}
        <h3 className={cn(
          "text-xl font-bold mb-3 transition-all duration-300",
          isActive ? "text-estates-primary" : "text-gray-800 group-hover:text-estates-primary"
        )}>
          {milestone.title}
        </h3>

        {/* Description */}
        <p className="text-slate-600 text-sm leading-relaxed">{milestone.description}</p>
        
        {/* Bottom Accent */}
        <div className={cn(
          "h-1 w-16 rounded-full mt-4 transition-all duration-300",
          isActive ? "bg-estates-primary" : "bg-estates-gray-200 group-hover:bg-estates-primary/50"
        )}></div>
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

const MobileTimelineItem = ({ milestone, isActive = false, onClick, bgColor }: MobileTimelineItemProps) => {
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
      {/* Title */}
      <h3 className={cn(
        "text-lg font-bold mb-2 transition-all duration-300",
        isActive ? "text-estates-primary" : "text-gray-800"
      )}>
        {milestone.title}
      </h3>
      
      {/* Period */}
      {milestone.period && (
        <div className="flex items-center gap-2 mb-3 text-estates-primary font-medium text-sm">
          <Calendar className="size-3.5" />
          <span>{milestone.period}</span>
        </div>
      )}

      {/* Description */}
      <p className="text-slate-600 text-sm leading-relaxed">{milestone.description}</p>
    </div>
  );
};

export default ProjectTimeline;