import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Member } from "@/lib/types";
import { User, LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState, useRef } from "react";

const TeamMember = ({
  name,
  role,
  description,
  icon: Icon,
  image,
}: {
  name: string;
  role: string;
  description: string;
  icon: LucideIcon;
  image?: string;
}) => {
  return (
    <div className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 gap-3 w-full sm:w-full md:w-full lg:w-full shrink-0">
      <div className="flex flex-col items-center">
        {image ? (
          <Avatar className="h-24 w-24 mb-2">
            <AvatarImage src={image} alt={name} />
            <AvatarFallback className="bg-estates-primary/10">
              <Icon className="h-8 w-8 text-estates-primary" />
            </AvatarFallback>
          </Avatar>
        ) : (
          <div className="flex items-center justify-center bg-estates-primary/10 rounded-full h-16 w-16 mb-2">
            <Icon className="h-8 w-8 text-estates-primary" />
          </div>
        )}
      </div>
      <h3 className="text-lg font-bold text-estates-primary text-center">
        {name}
      </h3>
      <p className="text-estates-secondary font-medium text-center">
        {role}
      </p>
      <p className="text-gray-600 text-center line-clamp-3 overflow-hidden text-ellipsis">
        {description}
      </p>
    </div>
  );
};

const TeamMemberView = () => {
  const [viewTeam, setViewTeam] = useState<Member[]>([]);
  const [scrollPosition, setScrollPosition] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/public/about/teamMember");
        const data = await response.json();
        setViewTeam(Array.isArray(data) ? data : [data]);
      } catch (error) {
        console.error("Error fetching the data:", error);
      }
    };

    fetchData();
  }, []);

  const scroll = (direction: 'left' | 'right') => {
    if (!carouselRef.current) return;
    
    const container = carouselRef.current;
    const cardWidth = container.querySelector('div')?.offsetWidth || 0;
    const scrollAmount = direction === 'left' ? -cardWidth : cardWidth;
    
    container.scrollBy({
      left: scrollAmount,
      behavior: 'smooth'
    });
    
    // Update scroll position for arrow visibility
    setScrollPosition(container.scrollLeft + scrollAmount);
  };

  const handleScroll = () => {
    if (carouselRef.current) {
      setScrollPosition(carouselRef.current.scrollLeft);
    }
  };

  const showLeftArrow = scrollPosition > 0;
  const showRightArrow = carouselRef.current 
    ? scrollPosition < carouselRef.current.scrollWidth - carouselRef.current.clientWidth - 10
    : false;

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-bold text-estates-primary mb-4">
              Meet the Team
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Our experienced leadership team brings decades of combined
              expertise in real estate development, finance, and project
              management.
            </p>
          </div>

          {viewTeam.length > 0 ? (
            <div className="relative">
              {/* Left Arrow */}
              <button
                onClick={() => scroll('left')}
                className={`absolute left-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full ${
                  !showLeftArrow ? "hidden" : ""
                }`}
                aria-label="Previous"
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Team Members Carousel */}
              <div 
                ref={carouselRef}
                className="overflow-x-auto hide-scrollbar" 
                onScroll={handleScroll}
              >
                <div className="flex gap-6 px-2 py-4">
                  {viewTeam.map((member, index) => (
                    <div 
                      key={index} 
                      className="w-full sm:w-full md:w-1/2 lg:w-1/4 min-w-[260px] px-2"
                    >
                      <TeamMember
                        name={member.name}
                        role={member.role}
                        description={member.description}
                        icon={member.icon || User}
                        image={member.image ? `/api/resources/download?filename=${encodeURIComponent(member.image)}` : "/placeholder.jpg"}
                      />
                    </div>
                  ))}
                </div>
              </div>

              <button
                onClick={() => scroll('right')}
                className={`absolute right-0 top-1/2 -translate-y-1/2 z-10 bg-white shadow-md p-2 rounded-full ${
                  !showRightArrow ? "hidden" : ""
                }`}
                aria-label="Next"
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">Loading team members...</p>
          )}
        </div>
      </div>
      
      {/* Add custom styles to hide scrollbar but keep functionality */}
      <style jsx global>{`
        .hide-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;  /* Chrome, Safari and Opera */
        }
      `}</style>
    </section>
  );
};

export default TeamMemberView;