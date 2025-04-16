import { TESTIMONIALS } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicTestimonailsApi = createApi({
  reducerPath: "publicTestimonailsAndSuccessStoriesApi",
  tagTypes: ["Public Testimonials", "Public PlacementStories","Public PlacementPartners"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Testimonials
    getPublicTestimonials: builder.query<TESTIMONIALS[], string>({
      query: () => `public/testimonials`,
      providesTags: ["Public Testimonials"],
    }),
  }),
});

export const {
  useGetPublicTestimonialsQuery,
} = publicTestimonailsApi;
