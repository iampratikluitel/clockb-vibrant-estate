import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MINIOURL } from "@/lib/constants";
import { Member } from "@/lib/types";
import { User, LucideIcon, ChevronLeft, ChevronRight } from "lucide-react";
import React, { useEffect, useState } from "react";

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
    <div className="flex flex-col bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow p-6 gap-3 w-60 shrink-0">
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
  const [startIndex, setStartIndex] = useState(0);
  const membersPerRow = 4;

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

  const nextSlide = () => {
    if ((startIndex + 1) * membersPerRow < viewTeam.length) {
      setStartIndex(startIndex + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  const paginatedTeam = viewTeam.slice(
    startIndex * membersPerRow,
    (startIndex + 1) * membersPerRow
  );

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
            <div className="relative flex items-center">
              {/* Left Arrow */}
              <button
                onClick={prevSlide}
                className={`absolute left-0 z-10 bg-white shadow-md p-2 rounded-full ${
                  startIndex === 0 ? "hidden" : ""
                }`}
              >
                <ChevronLeft className="w-6 h-6 text-gray-600" />
              </button>

              {/* Team Members Row */}
              <div className="overflow-hidden w-full px-10">
                <div className="flex gap-6 transition-transform duration-300 ease-in-out">
                  {paginatedTeam.map((member, index) => (
                    <TeamMember
                      key={index}
                      name={member.name}
                      role={member.role}
                      description={member.description}
                      icon={member.icon || User}
                      image={member.image ? `/api/resources/download?filename=${encodeURIComponent(member.image)}` : "/placeholder.jpg"}
                    />
                  ))}
                </div>
              </div>

              {/* Right Arrow */}
              <button
                onClick={nextSlide}
                className={`absolute right-0 z-10 bg-white shadow-md p-2 rounded-full ${
                  (startIndex + 1) * membersPerRow >= viewTeam.length
                    ? "hidden"
                    : ""
                }`}
              >
                <ChevronRight className="w-6 h-6 text-gray-600" />
              </button>
            </div>
          ) : (
            <p className="text-center text-gray-500">No team members found.</p>
          )}
        </div>
      </div>
    </section>
  );
};

export default TeamMemberView;
