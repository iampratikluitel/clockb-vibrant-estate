import { TESTIMONIALS } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminTestimonialsApi = createApi({
  reducerPath: "adminTestimonialsApi",
  tagTypes: ["Admin Testimonials"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    
    getAllAdminTestimonials: builder.query<TESTIMONIALS[], string>({
      query: () => `admin/testimonials`,
      providesTags: ["Admin Testimonials"],
    }),

    getAdminTestimonialsById: builder.query<TESTIMONIALS, string>({
      query: (id) => `admin/testimonials/byid?id=${id}`,
      providesTags: ["Admin Testimonials"],
    }),

    AdminDeleteTestimonials: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/testimonials?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Testimonials"],
    }),

    AdminAddUpdateTestimonials: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/testimonials`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Testimonials"],
    }),

    deleteMultipleTestimonialsAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/testimonials/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Testimonials"],
    }),
  }),
});

export const {
  useAdminAddUpdateTestimonialsMutation,
  useAdminDeleteTestimonialsMutation,
  useGetAdminTestimonialsByIdQuery,
  useGetAllAdminTestimonialsQuery,
  useDeleteMultipleTestimonialsAdminMutation,
} = adminTestimonialsApi;
