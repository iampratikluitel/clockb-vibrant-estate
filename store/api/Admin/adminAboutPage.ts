import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";
import { Partner, Member } from "@/lib/types";

export const adminAboutApi = createApi({
  reducerPath: "adminAboutApi",
  baseQuery: baseQuery,
  tagTypes: ["Admin Main", "Admin Team Member", "Admin Partner", "Admin Investment Circle"],
  endpoints: (builder) => ({
    getAllAdminAboutHero: builder.query<any, string>({
      query: () => `admin/about/main-section`,
      providesTags: ["Admin Main"],
    }),

    adminAddUpdateAboutHero: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/about/main-section`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Main"],
    }),

    getAllAdminTeamMember: builder.query<Member[], string>({
      query: () => `admin/about/teamMember`,
      providesTags: ["Admin Partner"],
    }),

    getAdminTeamMemberById: builder.query<Member, string>({
      query: (id) => `admin/about/teamMember/byid?id=${id}`,
      providesTags: ["Admin Team Member"],
    }),

    adminAddUpdateTeamMember: builder.mutation<{ message: string }, Member>({
      query: (body) => ({
        url: `admin/about/teamMember`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Team Member"],
    }),

    adminDeleteTeamMember: builder.mutation<{ member: string }, any>({
      query: (id) => ({
        url: `admin/about/teamMember?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Team Member"],
    }),

    deleteMultipleTeamMemberAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/about/teamMember/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Team Member"],
    }),

    getAllAdminPartner: builder.query<Partner[], string>({
      query: () => `admin/about/partner`,
      providesTags: ["Admin Partner"],
    }),

    getAdminPartnerById: builder.query<Partner, string>({
      query: (id) => `admin/abput/partner/byid?id=${id}`,
      providesTags: ["Admin Partner"],
    }),

    adminAddUpdatePartner: builder.mutation<{ message: string }, Partner>({
      query: (body) => ({
        url: `admin/about/partner`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Partner"],
    }),

    adminDeletePartner: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/about/partner?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Partner"],
    }),

    deleteMultiplePartnerAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/about/partner/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Partner"],
    }),

    getAllAdminInvestmentCircle: builder.query<any, string>({
      query: () => `admin/about/investment-circle`,
      providesTags: ["Admin Investment Circle"],
    }),

    adminAddUpdateInvestmentCircle: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/about/investment-circle`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Investment Circle"],
    }),
  }),
});

export const {
  useGetAllAdminAboutHeroQuery,
  useAdminAddUpdateAboutHeroMutation,

  useGetAllAdminTeamMemberQuery,
  useGetAdminTeamMemberByIdQuery,
  useAdminAddUpdateTeamMemberMutation,
  useAdminDeleteTeamMemberMutation,
  useDeleteMultipleTeamMemberAdminMutation,

  useGetAllAdminPartnerQuery,
  useGetAdminPartnerByIdQuery,
  useAdminAddUpdatePartnerMutation,
  useAdminDeletePartnerMutation,
  useDeleteMultiplePartnerAdminMutation,

  useGetAllAdminInvestmentCircleQuery,
  useAdminAddUpdateInvestmentCircleMutation,
} = adminAboutApi;
