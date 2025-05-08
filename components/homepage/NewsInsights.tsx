"use client";

import React from "react";
import { ArrowRight } from "lucide-react";
import { useGetPublicNewsInsightsQuery } from "@/store/api/Public/publicNewsInsight";
import { MINIOURL } from "@/lib/constants";
import Link from "next/link";
import { paths } from "@/lib/paths";

const NewsInsights = () => {
  const { data: NewsInsights = [], isLoading } =
    useGetPublicNewsInsightsQuery("");

  const displayedCategories = NewsInsights?.slice(0, 4);

  return (
    <section className="py-16 bg-estates-gray-100">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            News & Insight
          </h2>
          <div className="w-20 h-1 bg-estates-primary mx-auto"></div>
          <p className="text-gray-600 mt-4 max-w-2xl mx-auto">
            Stay informed with the latest insights and developments in real
            estate investment
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {isLoading ? (
            <p>Loading...</p>
          ) : (
            displayedCategories.map((category) => (
              <div
                key={category._id}
                className="bg-white rounded-lg shadow-md overflow-hidden transition-transform duration-300 hover:shadow-lg hover:-translate-y-1"
              >
                <div className="h-48 overflow-hidden">
                  <img
                    src={`/api/resources/download?filename=${encodeURIComponent(
                      category.image
                    )}`}
                    alt={category.title}
                    className="w-full h-full object-cover"
                  />
                </div>
                <div className="p-5">
                  <div className="flex justify-between items-center mb-3">
                    <span className="text-xs font-medium text-estates-primary bg-blue-50 px-2 py-1 rounded">
                      {category.category}
                    </span>
                    <span className="text-xs text-gray-500">
                      {new Date(category.addedDate).toLocaleDateString()}
                    </span>
                  </div>
                  <h3 className="font-bold text-gray-900 text-lg mb-2 line-clamp-2">
                    {category.title}
                  </h3>
                  <div
                    className="text-gray-600 text-sm line-clamp-3 mb-4"
                    dangerouslySetInnerHTML={{ __html: category.overview }}
                  />

                  <Link
                    href={`${paths.public.newsInsight}/${category.slug}`}
                    className="text-estates-primary p-0 h-auto inline-flex items-center"
                  >
                    Read more
                    <ArrowRight className="ml-1 h-4 w-4" />
                  </Link>
                </div>
              </div>
            ))
          )}
        </div>
        <div className="text-center mt-10">
          <Link
            href={paths.public.newsInsight}
            className="inline-flex items-center bg-estates-primary hover:bg-estates-primary/90 text-white px-6 py-2 rounded-md"
          >
            View More Insight
            <ArrowRight className="ml-2 w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
};

export default NewsInsights;
