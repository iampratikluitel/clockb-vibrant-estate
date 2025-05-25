import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicResourcesApi = createApi({
  reducerPath: "publicResourcesApi",
  baseQuery: baseQuery,
  tagTypes: [
    "Public Investment Document",
    "Public Legal Document",
    "Public Guide",
    "Public Project Update",
    "Public Event",
  ],
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getPublicInvestmentDocument: builder.query<any, void>({
      query: () => `public/resources/investmentDocument`,
      providesTags: ["Public Investment Document"],
    }),

    getPublicLegalDocument: builder.query<any[], void>({
      query: () => `public/resources/legalDocument`,
      providesTags: ["Public Legal Document"],
    }),

    getPublicGuide: builder.query<any[], void>({
      query: () => `public/resources/guide`,
      providesTags: ["Public Guide"],
    }),

    getPublicProjectUpdate: builder.query<any, void>({
      query: () => `public/resources/projectUpdate`,
      providesTags: ["Public Project Update"],
    }),

    getPublicEvent: builder.query<any, void>({
      query: () => `public/resources/event`,
      providesTags: ["Public Event"],
    }),
  }),
});

export const {
  useGetPublicInvestmentDocumentQuery,
  useGetPublicLegalDocumentQuery,
  useGetPublicGuideQuery,
  useGetPublicProjectUpdateQuery,
  useGetPublicEventQuery,
} = publicResourcesApi;
