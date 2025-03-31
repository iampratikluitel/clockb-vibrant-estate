import { TESTIMONIALS } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminTestimonialsApi = createApi({
  reducerPath: "adminTestimonialsApi",
  tagTypes: ["Admin Testimonials"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Testimonials
    getAllAdminTestimonials: builder.query<TESTIMONIALS[], string>({
      query: () => `admin/testimonials`,
      providesTags: ["Admin Testimonials"],
    }),

    //Testimonials by Id
    getAdminTestimonialsById: builder.query<TESTIMONIALS, string>({
      query: (id) => `admin/testimonials/byid?id=${id}`,
      providesTags: ["Admin Testimonials"],
    }),

    //Admin Delete Testimonials
    AdminDeleteTestimonials: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/testimonials?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Testimonials"],
    }),

    //Add Update Testimonials
    AdminAddUpdateTestimonials: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/testimonials`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Testimonials"],
    }),

    //Delete Multiple Courses
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
