import { PROJECTCATEGORY, PROJECTDESCRIPTION } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicProjectApi = createApi({
  reducerPath: "publicProjectApi",
  tagTypes: ["Public Project"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getPublicProject: builder.query<PROJECTDESCRIPTION[], string>({
      query: () => `public/projectdescription`,
      providesTags: ["Public Project"],
    }),

    getPublicProjectBySlug: builder.query<PROJECTDESCRIPTION, string>({
      query: (slug) => `public/projectdescription/byslug?slug=${slug}`,
      providesTags: ["Public Project"],
    }),
    getPublicProjectByCategory: builder.query<
      PROJECTDESCRIPTION[],
      string
    >({
      query: (slug) => `public/projectdescription/bycategory?slug=${slug}`,
      providesTags: ["Public Project"],
    }),

    getPublicProjectCategory: builder.query<PROJECTCATEGORY[], string>({
      query: () => `public/projectdescription/category`,
      providesTags: ["Public Project"],
    }),
  }),
});

export const { 
  useGetPublicProjectQuery, 
  useGetPublicProjectBySlugQuery,
  useGetPublicProjectByCategoryQuery,
  useGetPublicProjectCategoryQuery,
} =
  publicProjectApi;
