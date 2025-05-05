import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";
import { PROJECTCATEGORY, PROJECTDESCRIPTION } from "@/lib/types";

export const adminProjectApi = createApi({
  reducerPath: "adminProjectApi",
  tagTypes: ["Admin Project"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAllAdminProject: builder.query<PROJECTDESCRIPTION[], void>({
      query: () => `admin/projectdescription`,
      providesTags: ["Admin Project"],
    }),

    getAdminProjectById: builder.query<PROJECTDESCRIPTION, string>({
      query: (id) => `admin/projectdescription/byid?id=${id}`,
      providesTags: ["Admin Project"],
    }),

    AdminDeleteProject: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/projectdescription?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Project"],
    }),

    adminAddUpdateProject: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/projectdescription`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Project"],
    }),

    AdminToggleProject: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/projectdescription/toggle?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Admin Project"],
    }),

    deleteMultipleProjectAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/projectdescription/deletemultiple`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Admin Project"],
    }),
    getAllAdminNewsInsightCategories: builder.query<
      PROJECTCATEGORY[],
      string
    >({
      query: () => `admin/projectdescription/category`,
      providesTags: ["Admin Project"],
    }),
  }),
});

export const {
  useAdminAddUpdateProjectMutation,
  useAdminDeleteProjectMutation,
  useGetAdminProjectByIdQuery,
  useGetAllAdminProjectQuery,
  useAdminToggleProjectMutation,
  useDeleteMultipleProjectAdminMutation,
  useGetAllAdminNewsInsightCategoriesQuery
} = adminProjectApi;
