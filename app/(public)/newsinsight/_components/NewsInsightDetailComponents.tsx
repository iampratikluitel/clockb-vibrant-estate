"use client";

import { MINIOURL } from "@/lib/constants";
import { useGetPublicNewsInsightBySlugQuery } from "@/store/api/Public/publicNewsInsight";
import { useParams } from "next/navigation";
import React from "react";
import NewsInsightOverview from "./NewsInsightOverview";

const NewsInsightDetailComponents = () => {
  const { slug } = useParams();
  const { data: NewsInsightBySlug, isLoading: Loading } =
    useGetPublicNewsInsightBySlugQuery(slug as string);
  return (
    <div>
      <div>
        <img
          src={`${MINIOURL}${NewsInsightBySlug?.bannerImage}`}
          alt={NewsInsightBySlug?.title}
        />
      </div>
      <div>
        <h1>{NewsInsightBySlug?.title}</h1>
      </div>
      <div>
        <NewsInsightOverview NewsInsightBySlug={NewsInsightBySlug} />
      </div>
    </div>
  );
};

export default NewsInsightDetailComponents;
