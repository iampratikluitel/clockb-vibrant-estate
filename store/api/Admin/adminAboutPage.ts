import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";
import { Partner, Member } from "@/lib/types";

export const adminAboutApi = createApi({
  reducerPath: "adminAboutApi",
  baseQuery: baseQuery,
  tagTypes: ["AdminAboutMain", "AdminTeam", "AdminPartner"],
  endpoints: (builder) => ({

    getAdminAboutMainApi: builder.query<any, void>({
      query: () => `admin/about/main-section`,
      providesTags: ["AdminAboutMain"],
    }),

    adminAddUpdateAboutMain: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/about/main-section`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminAboutMain"],
    }),

    getAdminTeamMembers: builder.query<Member[], void>({
      query: () => `admin/about/teamMember`,
      providesTags: ["AdminTeam"],
    }),

    adminAddUpdateTeamMember: builder.mutation<{ message: string }, Member>({
      query: (body) => ({
        url: `admin/about/teamMember`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminTeam"],
    }),

    getAdminPartners: builder.query<Partner[], void>({
      query: () => `admin/about/partner`,
      providesTags: ["AdminPartner"],
    }),

    adminAddUpdatePartner: builder.mutation<{ message: string }, Partner>({
      query: (body) => ({
        url: `admin/about/partner`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["AdminPartner"],
    }),

  }),
});

export const {
  useGetAdminAboutMainApiQuery,
  useAdminAddUpdateAboutMainMutation,
  useGetAdminTeamMembersQuery,
  useAdminAddUpdateTeamMemberMutation,
  useGetAdminPartnersQuery,
  useAdminAddUpdatePartnerMutation,
} = adminAboutApi;
