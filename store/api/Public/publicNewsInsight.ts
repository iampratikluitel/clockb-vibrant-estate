import { NEWSINSIGHT, NEWSINSIGHTCATEGORY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicNewsInsightsApi = createApi({
  reducerPath: "publicNewsInsightsApi",
  tagTypes: ["Public NewsInsights"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //all NewsInsights
    getPublicNewsInsights: builder.query<NEWSINSIGHT[], string>({
      query: () => `public/newsInsight`,
      providesTags: ["Public NewsInsights"],
    }),

    // NewsInsight by by slug
    getPublicNewsInsightBySlug: builder.query<NEWSINSIGHT, string>({
      query: (slug) => `public/newsInsight/byslug?slug=${slug}`,
      providesTags: ["Public NewsInsights"],
    }),

    // NewsInsights by by category
    getPublicNewsInsightsByCategory: builder.query<NEWSINSIGHT[], string>({
      query: (slug) => `public/newsInsight/bycategory?slug=${slug}`,
      providesTags: ["Public NewsInsights"],
    }),

    getPublicNewsInsightsCategory: builder.query<NEWSINSIGHTCATEGORY[], string>({
      query: () => `public/newsInsight/category`,
      providesTags: ["Public NewsInsights"],
    }),
    getPublicNewsInsightCategoryBySlug: builder.query<NEWSINSIGHTCATEGORY, string>({
      query: (slug) => `public/jobs/category/byslug?slug=${slug}`,
      providesTags: ["Public NewsInsights"],
    }),
  }),
});

export const {
  useGetPublicNewsInsightBySlugQuery,
  useGetPublicNewsInsightsByCategoryQuery,
  useGetPublicNewsInsightsQuery,
  useGetPublicNewsInsightsCategoryQuery,
  useGetPublicNewsInsightCategoryBySlugQuery,
} = publicNewsInsightsApi;
