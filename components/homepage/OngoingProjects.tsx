"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PageLoader from "../PageLoader";
import { MINIOURL } from "@/lib/constants";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { useGetPublicProjectQuery } from "@/store/api/Public/publicProject";

const OngoingProjects = () => {
  const { data: Projects, isLoading: ProjectLoading } =
    useGetPublicProjectQuery("");

  const displayedProjects = Projects?.slice(0, 3) || [];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-estates-primary text-center mb-12">
          Ongoing & Upcoming Projects
        </h2>

        {ProjectLoading ? (
          <PageLoader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {displayedProjects.map((project) => (
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
                    {project.category}
                  </div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-estates-secondary mb-3">
                    {project.title}
                  </h3>
                  <p className="text-gray-600 mb-6 line-clamp-4">
                    {project.description}
                  </p>
                  <Link
                    href={`${paths.public.ongoingprojects}/${project.slug}`}
                  >
                    <Button className="bg-estates-primary hover:bg-estates-primary/90 text-white flex items-center gap-2">
                      Learn More
                      <ArrowRight size={16} />
                    </Button>
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
        <div className="flex justify-end mt-8">
          <Link
            href={paths.public.ongoingprojects}
            className="inline-flex items-center gap-2 text-estates-primary font-semibold border border-estates-primary px-2 py-1 rounded-full transition-all duration-300 hover:bg-estates-primary hover:text-white"
          >
            View More
            <ArrowRight size={16} />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default OngoingProjects;
