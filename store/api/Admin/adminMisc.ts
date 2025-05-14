import { NEWSLETTER } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminMiscsApi = createApi({
  reducerPath: "adminMiscsApi",
  tagTypes: [
    "Admin NewsLetter",
    "Admin Dashboard",
  ],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All NewsLetter
    getAllAdminNewsLetter: builder.query<NEWSLETTER[], string>({
      query: () => `admin/newsletter`,
      providesTags: ["Admin NewsLetter"],
    }),

    deleteMultipleNewsLetterAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/newsletter/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin NewsLetter"],
    }),


    getDashboardCount: builder.query<any, string>({
      query: () => `admin/dashboard/counts`,
      providesTags: ["Admin Dashboard"],
    }),
  }),
});

export const { useGetAllAdminNewsLetterQuery, useDeleteMultipleNewsLetterAdminMutation, useGetDashboardCountQuery } =
  adminMiscsApi;
