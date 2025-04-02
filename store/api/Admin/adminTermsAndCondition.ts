import { baseQuery } from "@/store/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminTermsAndConditionsApi = createApi({
  reducerPath: "adminTermsAndConditionsApi",
  tagTypes: ["Admin TermsAndConditions"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All TermsAndConditions
    getAllAdminTermsAndConditions: builder.query<any, string>({
      query: () => `admin/about/TermsAndConditions`,
      providesTags: ["Admin TermsAndConditions"],
    }),

    //Admin Delete TermsAndConditions
    AdminDeleteTermsAndConditions: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/about/TermsAndConditions?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin TermsAndConditions"],
    }),

    //Add Update TermsAndConditions
    AdminAddUpdateTermsAndConditions: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/about/TermsAndConditions`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin TermsAndConditions"],
    }),
  }),
});

export const {
  useAdminAddUpdateTermsAndConditionsMutation,
  useAdminDeleteTermsAndConditionsMutation,
  useGetAllAdminTermsAndConditionsQuery,
} = adminTermsAndConditionsApi;
