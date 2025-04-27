import { UpcommingProject } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicUpcommingProjectApi = createApi({
  reducerPath: "publicUpcommingProjectApi",
  tagTypes: ["Public Upcomming Project"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getPublicUpcommingProject: builder.query<UpcommingProject[], string>({
      query: () => `public/projectdescription`,
      providesTags: ["Public Upcomming Project"],
    }), 

    getPublicUpcommingProjectBySlug: builder.query<UpcommingProject, string>({
      query: (slug) => `public/projectdescription/byslug?slug=${slug}`,
      providesTags: ["Public Upcomming Project"],
    }),
  }),
});

export const {
    useGetPublicUpcommingProjectQuery,
    useGetPublicUpcommingProjectBySlugQuery,
} = publicUpcommingProjectApi;
