import { FAQTYPE } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminFaqApi = createApi({
  reducerPath: "adminFaqApi",
  tagTypes: ["Admin Faqs"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAllAdminFaqs: builder.query<FAQTYPE[], string>({
      query: () => `admin/FAQs`,
      providesTags: ["Admin Faqs"],
    }),

    getAdminFaqsById: builder.query<FAQTYPE, string>({
      query: (faqId) => `admin/FAQs/byid?faqId=${faqId}`,
      providesTags: ["Admin Faqs"],
    }),

    //Add Update Faq
    AdminAddUpdateFaqs: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/FAQs`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Faqs"],
    }),

    //Admin Delete Faq
    AdminDeleteFaqs: builder.mutation<{ message: string }, any>({
      query: (faqId) => ({
        url: `admin/FAQs?faqId=${faqId}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Faqs"],
    }),

    //Admin Delete Multiple Faq
    AdminDeleteMultipleFaqs: builder.mutation<
      { message: string },
      { faqIds: string[] }
    >({
      query: (body) => ({
        url: `admin/FAQs/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Faqs"],
    }),
  }),
});

export const {
  useAdminAddUpdateFaqsMutation,
  useGetAllAdminFaqsQuery,
  useGetAdminFaqsByIdQuery,
  useAdminDeleteFaqsMutation,
  useAdminDeleteMultipleFaqsMutation,
} = adminFaqApi;
