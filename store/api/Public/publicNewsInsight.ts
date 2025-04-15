import { NewsInsight } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicNewsInsightsApi = createApi({
  reducerPath: "publicNewsInsightsApi",
  tagTypes: ["Public NewsInsights", "Public Career Prospects","Public Offers"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //all NewsInsights
    getPublicNewsInsights: builder.query<NewsInsight[], string>({
      query: () => `public/newsInsights`,
      providesTags: ["Public NewsInsights"],
    }),

    //popular NewsInsights
    getPublicPopularNewsInsights: builder.query<NewsInsight[], string>({
      query: () => `public/newsInsights/popular`,
      providesTags: ["Public NewsInsights"],
    }),

    // NewsInsight by by slug
    getPublicNewsInsightBySlug: builder.query<NewsInsight, string>({
      query: (slug) => `public/newsInsights/byslug?slug=${slug}`,
      providesTags: ["Public NewsInsights"],
    }),

    // NewsInsights by by category
    getPublicNewsInsightsByCategory: builder.query<NewsInsight[], string>({
      query: (slug) => `public/newsInsights/bycategory?slug=${slug}`,
      providesTags: ["Public NewsInsights"],
    }),

    //NewsInsight Enquiry
    PublicNewsInsightEnquiry: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/newsInsights/enquiry`,
        method: "POST",
        body: body,
      }),
    }),

    //NewsInsight Enrollement
    PublicNewsInsightEnrollment: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/newsInsights/enrollment`,
        method: "POST",
        body: body,
      }),
    }),

    //Download NewsInsight
    PublicNewsInsightDownload: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/newsInsights/download`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  useGetPublicNewsInsightBySlugQuery,
  useGetPublicNewsInsightsByCategoryQuery,
  useGetPublicNewsInsightsQuery,
  useGetPublicPopularNewsInsightsQuery,
  usePublicNewsInsightEnquiryMutation,
  usePublicNewsInsightDownloadMutation,
  usePublicNewsInsightEnrollmentMutation,
} = publicNewsInsightsApi;
