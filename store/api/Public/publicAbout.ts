import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react"; 
import { Partner, Member } from "@/lib/types";

export const publicAboutApi = createApi({
  reducerPath: "publicAboutApi",
  baseQuery: baseQuery,
  tagTypes: ["PublicAboutMain", "PublicTeam", "PublicPartner", "Public Investment Circle"],
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    
    getPublicAboutMainSection: builder.query<any, void>({
      query: () => `public/about/main-section`,
      providesTags: ["PublicAboutMain"],
    }),

    getPublicTeamMembers: builder.query<Member[], void>({
      query: () => `public/about/team-member`,
      providesTags: ["PublicTeam"],
    }),
    
    getPublicPartners: builder.query<Partner[], void>({
      query: () => `public/about/partner`,
      providesTags: ["PublicPartner"],
    }),
    getPublicInvestmentCircle: builder.query<any, void>({
      query: () => `public/about/investment-circle`,
      providesTags: ["Public Investment Circle"],
    }),
  }),
});

export const {
  useGetPublicAboutMainSectionQuery,
  useGetPublicTeamMembersQuery,
  useGetPublicPartnersQuery, 
  useGetPublicInvestmentCircleQuery,
} = publicAboutApi;
