"use client";
import PageLoader from "@/components/PageLoader";
import { useSearchParams } from "next/navigation";
import React, { useState } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import Link from "next/link";
import { paths } from "@/lib/paths";
import { ArrowRight } from "lucide-react";
import {
  useGetPublicNewsInsightCategoryBySlugQuery,
  useGetPublicNewsInsightsByCategoryQuery,
} from "@/store/api/Public/publicNewsInsight";

const CategorizeWiseNewsPage = () => {
  const searchParams = useSearchParams();
  const slug = searchParams.get("category");

  const { data: CategorizedNews, isLoading: CategorizedNewsLoading } =
    useGetPublicNewsInsightsByCategoryQuery(slug as string);

  const { data: NewsCategoryBySlug, isLoading: Loading } =
    useGetPublicNewsInsightCategoryBySlugQuery(slug as string);

  const pageSize = 8;
  const [currentPage, setCurrentPage] = useState(1);

  const totalPages = Math.ceil(
    (CategorizedNews ? CategorizedNews.length : 0) / pageSize
  );

  const categorizedNews = CategorizedNews
    ? CategorizedNews.slice(
        (currentPage - 1) * pageSize,
        currentPage * pageSize
      )
    : [];

  const handlePreviousPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const handleNextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const handlePageClick = (pageNumber: number) => {
    setCurrentPage(pageNumber);
  };

  return (
    <div className="pt-24 ">
      {CategorizedNewsLoading ? (
        <PageLoader />
      ) : (
        <>
          <div className="w-full h-auto md:h-[21.1875rem] relative">
            <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-[#015694] to-[#429cdc] opacity-70"></div>
            <div className="absolute top-0 left-0 right-0 bottom-0 flex flex-col justify-center mx-5 md:mx-28 text-white md:leading-loose">
              <div className="flex gap-2 items-center">
                <h1 className="font-semibold text-[2rem] w-[75%]">
                  {NewsCategoryBySlug?.name}
                </h1>
              </div>
            </div>
          </div>

          <div className="px-6 sm:px-10 md:px-14 lg:px-20 xl:px-28 3xl:px-40 md:my-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-12 my-10">
            {categorizedNews &&
              categorizedNews.length > 0 &&
              categorizedNews.map((news, index) => (
                <Link
                  key={index}
                  href={`${paths.public.newsInsight}/${news.slug}`}
                >
                  <section className="p-4 bg-white">
                    <div className="group bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all duration-300 hover:border-digibox-blue/40">
                      <div className="p-6">
                        <h3 className="text-xl font-semibold mb-2 text-gray-900">
                          {news.title}
                        </h3>
                        <p className="text-gray-600 mb-4 truncate">
                          {news.description}
                        </p>
                        <span className="text-digibox-blue font-medium inline-flex items-center cursor-default">
                          View News
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </span>
                      </div>
                    </div>
                  </section>
                </Link>
              ))}

            {categorizedNews && categorizedNews.length === 0 && (
              <div>No News Found ...</div>
            )}

            {CategorizedNews && CategorizedNews.length > pageSize && (
              <Pagination className="cursor-pointer mt-10 col-span-full">
                <PaginationContent>
                  <PaginationItem>
                    <PaginationPrevious
                      onClick={handlePreviousPage}
                      className={
                        currentPage > 1
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }
                    />
                  </PaginationItem>

                  {[...Array(totalPages)].map((_, index) => (
                    <PaginationItem key={index}>
                      <PaginationLink
                        className={`rounded-full text-white ${
                          currentPage === index + 1
                            ? "bg-blue-500"
                            : "border text-black bg-white"
                        }`}
                        onClick={() => handlePageClick(index + 1)}
                      >
                        {index + 1}
                      </PaginationLink>
                    </PaginationItem>
                  ))}

                  <PaginationItem>
                    <PaginationNext
                      onClick={handleNextPage}
                      className={
                        currentPage < totalPages
                          ? "cursor-pointer"
                          : "cursor-not-allowed opacity-50"
                      }
                    />
                  </PaginationItem>
                </PaginationContent>
              </Pagination>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default CategorizeWiseNewsPage;
