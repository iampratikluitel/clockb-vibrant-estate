"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PageLoader from "./PageLoader";
import { useGetPublicUpcommingProjectQuery } from "@/store/api/Public/publicUpcommingProject";
import { MINIOURL } from "@/lib/constants";

const OngoingProjects = () => {
  const { data: Projects, isLoading: ProjectLoading } =
    useGetPublicUpcommingProjectQuery("");

  // const projects = [
  //   {
  //     id: 1,
  //     title: "Saukhel Real Estate Project – I",
  //     description:
  //       "Phase I of the Saukhel Real Estate Project focused on land acquisition, infrastructure development, and high-value appreciation. Spanning 50 ropanis, this phase introduced essential infrastructure. Investors in Phase I experienced significant returns, with many choosing to either exit with high gains or continue their journey into Phase II.",
  //     image: "https://images.unsplash.com/photo-1487958449943-2429e8be8625?auto=format&fit=crop&q=80",
  //     status: "completed",
  //   },
  //   {
  //     id: 2,
  //     title: "Saukhel Real Estate Project – II",
  //     description:
  //       "With the success of Phase I, Phase II is now underway, bringing enhanced investment opportunities and further expansion of the development. This phase continues to focus on urban growth, infrastructure enhancement, and increased land valuation, ensuring a lucrative and secure investment for both new and existing investors. Join us in shaping the future of Saukhel!",
  //     image: "https://images.unsplash.com/photo-1496307653780-42ee777d4833?auto=format&fit=crop&q=80",
  //     status: "ongoing",
  //   },
  //   {
  //     id: 3,
  //     title: "Saukhel Real Estate Project – III",
  //     description:
  //       "Phase III marks the culmination of the Saukhel Real Estate Project, transforming the area into a fully developed residential and commercial hub. This phase will introduce modern housing projects, essential amenities, and commercial spaces, creating a self-sustained community. Strategic partnerships will drive infrastructure enhancements, while investors will have structured exit opportunities, ensuring maximum returns.",
  //     image: "https://images.unsplash.com/photo-1433832597046-4f10e10ac764?auto=format&fit=crop&q=80",
  //     status: "upcoming",
  //   },
  // ];

  return (
    <section className="py-16 bg-white">
      {ProjectLoading ? (
        <div>
          <PageLoader />
        </div>
      ) : (
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-estates-primary text-center mb-12">
            Ongoing & Upcoming Projects
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {Array.isArray(Projects) &&
              Projects.map((project) => (
                <div
                  key={project._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={`${MINIOURL}${project.image}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div className="absolute top-4 right-4 bg-estates-primary text-white text-sm font-medium py-1 px-3 rounded-full">
                      {project.status}
                    </div>
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-estates-secondary mb-3">
                      {project.title}
                    </h3>
                    <p className="text-gray-600 mb-6 line-clamp-4">
                      {project.description}
                    </p>
                    <Button className="bg-estates-primary hover:bg-estates-primary/90 text-white flex items-center gap-2">
                      Learn More
                      <ArrowRight size={16} />
                    </Button>
                  </div>
                </div>
              ))}
          </div>
        </div>
      )}
    </section>
  );
};

export default OngoingProjects;
