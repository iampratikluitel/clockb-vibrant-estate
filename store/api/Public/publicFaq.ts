import { FAQ, FAQCATEGORY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicFaqsApi = createApi({
  reducerPath: "publicFaqsApi",
  tagTypes: ["Public FAQ"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //all NewsInsights
    getPublicFaq: builder.query<FAQ[], string>({
      query: () => `public/FAQ`,
      providesTags: ["Public FAQ"],
    }),

    getPublicFaqCategory: builder.query<FAQCATEGORY[], string>({
      query: () => `public/FAQ/category`,
      providesTags: ["Public FAQ"],
    })
  }),
});

export const {
  useGetPublicFaqQuery,
  useGetPublicFaqCategoryQuery
} = publicFaqsApi;
