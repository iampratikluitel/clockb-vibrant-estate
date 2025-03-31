import { Partner } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminPartnerApi = createApi({
  reducerPath: "adminPartnerApi",
  tagTypes: ["Admin Partner"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Partner
    getAllAdminPartner: builder.query<Partner[], string>({
      query: () => `admin/about/partner`,
      providesTags: ["Admin Partner"],
    }),

    //Partner by Id
    getAdminPartnerById: builder.query<Partner, string>({
      query: (id) => `admin/about/partner/byid?id=${id}`,
      providesTags: ["Admin Partner"],
    }),

    //Admin Delete Partner
    AdminDeletePartner: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/about/partner?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Partner"],
    }),

    //Add Update Partner
    AdminAddUpdatePartner: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/about/partner`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Partner"],
    }),

    //Delete Multiple Courses
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
  }),
});

export const {
  useAdminAddUpdatePartnerMutation,
  useAdminDeletePartnerMutation,
  useGetAdminPartnerByIdQuery,
  useGetAllAdminPartnerQuery,
  useDeleteMultiplePartnerAdminMutation,
} = adminPartnerApi;
