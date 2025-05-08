"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PageLoader from "@/components/PageLoader";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { useSearchParams } from "next/navigation";
import { PROJECTDESCRIPTION } from "@/lib/types";
import { useGetPublicProjectQuery } from "@/store/api/Public/publicProject";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationPrevious,
  PaginationLink,
  PaginationEllipsis,
  PaginationNext,
} from "@/components/pagination";
import Header from "@/components/homepage/Header";
import Footer from "@/components/homepage/Footer";

const Projects = () => {
  const searchParams = useSearchParams();
  const initialTab = searchParams.get("tab") || "all";
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<PROJECTDESCRIPTION[]>([]);
  const [currentTab, setCurrentTab] = useState(initialTab.toLowerCase());
  const [currentPage, setCurrentPage] = useState(1);

  const pageSize = 3;
  const { data: Projects, isLoading: ProjectLoading } = useGetPublicProjectQuery("");

  // ✅ Dynamically derive unique categories from data
  const categories = ["All", ...Array.from(new Set(Projects?.map(p => p.category).filter(Boolean)))];

  useEffect(() => {
    if (Projects && Projects.length > 0) {
      filterProjects(Projects, currentTab);
    }
  }, [Projects, currentTab, searchTerm]);

  const filterProjects = (projects: PROJECTDESCRIPTION[], currentTab: string) => {
    const filtered = projects.filter((project) => {
      const matchesSearchTerm = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());

      const matchesCategory =
        currentTab === "all" || project.category?.toLowerCase() === currentTab;

      return matchesSearchTerm && matchesCategory;
    });

    setFilteredProjects(filtered);
    setCurrentPage(1); // Reset to first page when filters change
  };

  const slicedProjects = filteredProjects.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredProjects.length / pageSize);

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (ProjectLoading) return <PageLoader />;

  // ✅ Category color map
  const categoryColorMap: Record<string, string> = {
    completed: "bg-gray-700",
    ongoing: "bg-green-600",
    upcoming: "bg-estates-primary",
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Header />

      <section className="py-16 bg-white mt-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-4xl font-bold text-estates-primary text-center mb-12">
            Ongoing & Upcoming Projects
          </h2>

          {/* ✅ Dynamic Category Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-4 mb-10">
            {categories.map((tab) => (
              <button
                key={tab}
                onClick={() => setCurrentTab(tab.toLowerCase())}
                className={`px-4 py-2 rounded-full text-sm font-medium border transition-all duration-300 ${
                  currentTab === tab.toLowerCase()
                    ? "bg-estates-primary text-white"
                    : "bg-white text-estates-primary border-estates-primary"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {slicedProjects.map((project) => {
              const categoryKey = project.category?.toLowerCase().trim() || "unknown";
              const categoryColor = categoryColorMap[categoryKey] || "bg-gray-400";

              return (
                <div
                  key={project._id}
                  className="bg-white rounded-lg overflow-hidden shadow-md transition-all duration-300 hover:shadow-xl"
                >
                  <div className="relative h-60 overflow-hidden">
                    <img
                      src={`/api/resources/download?filename=${encodeURIComponent(project.image)}`}
                      alt={project.title}
                      className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                    />
                    <div
                      className={`absolute top-4 right-4 text-white text-sm font-medium py-1 px-3 rounded-full ${categoryColor}`}
                    >
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
                    <Link href={`${paths.public.ongoingprojects}/${project.slug}`}>
                      <Button className="bg-estates-primary hover:bg-estates-primary/90 text-white flex items-center gap-2">
                        Learn More
                        <ArrowRight size={16} />
                      </Button>
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Pagination */}
          {filteredProjects.length > pageSize && totalPages > 1 && (
            <Pagination className="cursor-pointer my-10">
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    onClick={handlePreviousPage}
                    className={
                      currentPage > 1 ? "cursor-pointer" : "cursor-not-allowed"
                    }
                  />
                </PaginationItem>

                {[...Array(totalPages)].map((_, index) => (
                  <PaginationItem key={index}>
                    <PaginationLink
                      className={`rounded-full text-white ${
                        currentPage === index + 1
                          ? "bg-blue-500"
                          : "border text-black"
                      }`}
                      onClick={() => handlePageClick(index + 1)}
                    >
                      {index + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationEllipsis />
                </PaginationItem>

                <PaginationItem>
                  <PaginationNext
                    onClick={handleNextPage}
                    className={
                      currentPage < totalPages
                        ? "cursor-pointer"
                        : "cursor-not-allowed"
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          )}
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
