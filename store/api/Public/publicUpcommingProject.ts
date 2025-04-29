import { UPCOMMINGPROJECT } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicUpcommingProjectApi = createApi({
  reducerPath: "publicUpcommingProjectApi",
  tagTypes: ["Public Upcomming Project"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getPublicUpcommingProject: builder.query<UPCOMMINGPROJECT[], string>({
      query: () => `public/ongoingprojects`,
      providesTags: ["Public Upcomming Project"],
    }), 

    getPublicUpcommingProjectBySlug: builder.query<UPCOMMINGPROJECT, string>({
      query: (slug) => `public/ongoingprojects/byslug?slug=${slug}`,
      providesTags: ["Public Upcomming Project"],
    }),
  }),
});

export const {
    useGetPublicUpcommingProjectQuery,
    useGetPublicUpcommingProjectBySlugQuery,
} = publicUpcommingProjectApi;
