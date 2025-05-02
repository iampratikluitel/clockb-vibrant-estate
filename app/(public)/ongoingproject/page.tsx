"use client";

import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import PageLoader from "@/components/PageLoader";
import { MINIOURL } from "@/lib/constants";
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

const Projects = () => {
  const searchParams = useSearchParams();
  const tab = searchParams.get("tab");
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredProjects, setFilteredProjects] = useState<
    PROJECTDESCRIPTION[]
  >([]);
  const [currentTab, setCurrentTab] = useState(tab || "All");

  const pageSize = 3;
  const [currentPage, setCurrentPage] = useState(1);
  const { data: Projects, isLoading: ProjectLoading } =
    useGetPublicProjectQuery("");

  useEffect(() => {
    if (Projects && Projects.length > 0) {
      filterProjects(Projects, currentTab);
    }
  }, [Projects, currentTab]);

  useEffect(() => {
    if (Projects && Projects.length) {
      filterProjects(Projects, currentTab);
    }
  }, [searchTerm, currentTab]);

  const filterProjects = (
    projects: PROJECTDESCRIPTION[],
    currentTab: string
  ) => {
    const filtered = projects.filter((project) => {
      const matchesSearchTerm = project.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearchTerm;
    });
    setFilteredProjects(filtered);
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

  if (ProjectLoading) {
    return <PageLoader />;
  }
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
    <div className="flex flex-col min-h-screen">
      <Header />
      <section className="py-16 bg-white mt-20">
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
                    {/* <Button className="bg-estates-primary hover:bg-estates-primary/90 text-white flex items-center gap-2">
                      Learn More
                      <ArrowRight size={16} />
                    </Button> */}
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
        </div>
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
      </section>
    </div>
  );
};

export default Projects;
