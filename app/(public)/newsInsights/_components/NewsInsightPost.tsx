"use client"

import React from "react";
import { Calendar, User } from "lucide-react";
import Footer from "@/components/homepage/Footer";
import { useGetPublicNewsInsightBySlugQuery } from "@/store/api/Public/publicNewsInsight";
import { useParams } from "next/navigation";
import { MINIOURL } from "@/lib/constants";
import NewsInsightOverview from "./NewsInsightOverview";
import NewsInsightsSidebar from "./NewsInsightSidebar";

const NewsInsightsPost = () => {
  const { slug } = useParams();
  const { data: newsinsightsBySlug, isLoading: Loading } =
    useGetPublicNewsInsightBySlugQuery(slug as string);

  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[40vh] md:h-[60vh] bg-slate-900">
        <div className="absolute inset-0">
          <img
            src={`/api/resources/download?filename=${encodeURIComponent(newsinsightsBySlug?.image ?? "")}`}
            alt={newsinsightsBySlug?.title}
            className="w-full h-full object-cover opacity-40"
          />
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="max-w-3xl">
            <h1 className="text-3xl md:text-5xl font-bold text-white mb-4">
              {newsinsightsBySlug?.title}
            </h1>
            <div className="flex flex-wrap items-center gap-4 text-white/80">
              <span className="flex items-center">
                <User className="mr-2 h-4 w-4" />
                {newsinsightsBySlug?.author}
              </span>
              <span className="flex items-center">
                <Calendar className="mr-2 h-4 w-4" />
                {newsinsightsBySlug?.addedDate ? new Date(newsinsightsBySlug.addedDate).toLocaleDateString() : "Date not available"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* News Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Main Content */}
          <div className="md:w-2/3">
            <NewsInsightOverview NewsinsightBySlug={newsinsightsBySlug} />

            {/* Social Sharing
            <div className="mt-8 p-6 bg-muted rounded-lg">
              <h3 className="text-lg font-semibold mb-4">Share this article</h3>
              <div className="flex space-x-4">
                <Button variant="outline" size="sm">
                  Facebook
                </Button>
                <Button variant="outline" size="sm">
                  Twitter
                </Button>
                <Button variant="outline" size="sm">
                  LinkedIn
                </Button>
                <Button variant="outline" size="sm">
                  Email
                </Button>
              </div>
            </div> */}
          </div>

          {/* Sidebar */}
          <div className="md:w-1/3">
            <NewsInsightsSidebar />
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default NewsInsightsPost;
