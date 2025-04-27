import { NewsInsight, NEWSINSIGHTCATEGORY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminNewsInsightsApi = createApi({
  reducerPath: "adminNewsInsightsApi",
  tagTypes: [
    "Admin NewsInsights",
    "Admin NewsInsights Enquiry",
    "Admin NewsInsights Download",
  ],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All NewsInsights
    getAllAdminNewsInsights: builder.query<NewsInsight[], string>({
      query: () => `admin/newsInsights`,
      providesTags: ["Admin NewsInsights"],
    }),

    // NewsInsight by Id
    getAdminNewsInsightById: builder.query<NewsInsight, string>({
      query: (id) => `admin/newsInsights/byid?id=${id}`,
      providesTags: ["Admin NewsInsights"],
    }),

    // Admin Delete NewsInsight
    AdminDeleteNewsInsight: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/newsInsights?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin NewsInsights"],
    }),

    //Add Update NewsInsight
    AdminAddUpdateNewsInsight: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/newsInsights`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin NewsInsights"],
    }),

    // Admin Toggle NewsInsight Status
    AdminToggleNewsInsight: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/newsInsights/toggle?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Admin NewsInsights"],
    }),

    //Delete Multiple NewsInsights
    deleteMultipleNewsInsightsAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/newsInsights/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin NewsInsights"],
    }),

    getAllAdminNewsInsightCategories: builder.query<NEWSINSIGHTCATEGORY[], string>({
      query: () => `admin/courses/category`,
      providesTags: ["Admin NewsInsights"],
    }),
  }),
});

export const {
  useAdminAddUpdateNewsInsightMutation,
  useAdminDeleteNewsInsightMutation,
  useGetAdminNewsInsightByIdQuery,
  useGetAllAdminNewsInsightsQuery,
  useAdminToggleNewsInsightMutation,
  useDeleteMultipleNewsInsightsAdminMutation,
  useGetAllAdminNewsInsightCategoriesQuery,
} = adminNewsInsightsApi;
