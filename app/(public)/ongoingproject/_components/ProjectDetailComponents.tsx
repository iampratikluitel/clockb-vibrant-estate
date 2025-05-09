"use client";

import React from "react";
import { Calendar } from "lucide-react";
import { useParams } from "next/navigation";
import { useGetPublicProjectBySlugQuery } from "@/store/api/Public/publicProject";
import ProjectOverview from "./ProjectOverview";
import ProjectDescriptionSidebar from "./ProjectDestcriptionSidebar";

const NewsInsightsPost = () => {
  const { slug } = useParams();
  const { data: projectbySlug, isLoading: Loading } =
    useGetPublicProjectBySlugQuery(slug as string);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={`/api/resources/download?filename=${encodeURIComponent(
              projectbySlug?.image ?? ""
            )}`}
            alt={projectbySlug?.title}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {projectbySlug?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {projectbySlug?.addedDate
                  ? new Date(projectbySlug.addedDate).toLocaleDateString()
                  : "Date not available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          <div className="md:w-2/3">
            <ProjectOverview ProjectBySlug={projectbySlug} />
          </div>

          <div className="md:w-1/3">
            <ProjectDescriptionSidebar />
          </div>
        </div>
      </div>
    </div>
  );
};

export default NewsInsightsPost;
