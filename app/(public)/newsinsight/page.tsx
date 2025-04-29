"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import PageLoader from "@/components/PageLoader";
import { paths } from "@/lib/paths";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { useGetPublicNewsInsightsQuery } from "@/store/api/Public/publicNewsInsight";
import { NEWSINSIGHT } from "@/lib/types";
import NewsInsightCardComponent from "@/components/newsinsight/NewsInsightCardComponent";
import Footer from "@/components/homepage/Footer";

const NewsInsight = () => {
  const searchParams = useSearchParams();
  const name = searchParams.get("name");
  const tab = searchParams.get("tab");

  const { data: NewsInsight, isLoading: NewsLoading } =
    useGetPublicNewsInsightsQuery("");

  const [searchTerm, setSearchTerm] = useState("");
  const [filteredNewsInsight, setFilteredNewsInsight] = useState<NEWSINSIGHT[]>(
    []
  );
  const [currentTab, setCurrentTab] = useState(tab || "All");

  const pageSize = 9;
  const [currentPage, setCurrentPage] = useState(1);

  useEffect(() => {
    if (NewsInsight && NewsInsight.length) {
      filterNewsInsight(NewsInsight, currentTab);
    }
  }, [NewsInsight, currentTab]);

  useEffect(() => {
    if (NewsInsight && NewsInsight.length) {
      filterNewsInsight(NewsInsight, currentTab);
    }
  }, [searchTerm, currentTab]);

  const filterNewsInsight = (
    NewsInsight: NEWSINSIGHT[],
    currentTab: string
  ) => {
    const filtered = NewsInsight.filter((newsinsight) => {
      const matchesSearchTerm = newsinsight.title
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      return matchesSearchTerm;
    });

    setFilteredNewsInsight(filtered);
  };

  const handleTabChange = (tab: string) => {
    setCurrentTab(tab);
    setCurrentPage(1);
  };

  const slicedNewsInsight = filteredNewsInsight.slice(
    (currentPage - 1) * pageSize,
    currentPage * pageSize
  );

  const totalPages = Math.ceil(filteredNewsInsight.length / pageSize);

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

  if (NewsLoading) {
    return <PageLoader />;
  }

  return (
    <>
      <div className="bg-gradient-to-br from-blue-50 to-white pt-28 pb-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center md:text-left">
            <Link
              href={paths.public.newsinsight}
              className="inline-flex items-center text-digibox-blue hover:text-digibox-darkBlue transition-colors mb-4"
            >
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to home
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              All News and Updates
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl">
              Explore the diverse range of job where DigiBox connects Nepalese
              talent with global opportunities.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {slicedNewsInsight.length > 0 ? (
            slicedNewsInsight.map((element, index) => (
              <Link
                key={index}
                href={`${paths.public.newsinsight}/${element.slug}`}
              >
                <NewsInsightCardComponent element={element} />
              </Link>
            ))
          ) : (
            <div>No News posted yet.</div>
          )}
        </div>

        {filteredNewsInsight.length > pageSize && totalPages > 1 && (
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
      <Footer />
    </>
  );
};

export default NewsInsight;
