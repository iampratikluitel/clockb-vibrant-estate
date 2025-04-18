import { createApi } from "@reduxjs/toolkit/query/react";
import { UpcommingProject } from "@/lib/types";
import { baseQuery } from "@/store/global"; 

export const adminUpcommingProjectApi = createApi({
  reducerPath: "adminUpcommingProjectApi",
  tagTypes: ["Admin Upcomming Project"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAllAdminUpcommingProject: builder.query<UpcommingProject[], void>({
      query: () => `admin/UpcommingProject`,
      providesTags: ["Admin Upcomming Project"],
    }),

    getAdminProjectById: builder.query<UpcommingProject, string>({
      query: (id) => `admin/UpcommingProject/byid?id=${id}`,
      providesTags: ["Admin Upcomming Project"],
    }),

    AdminDeleteProject: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/UpcommingProject?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Upcomming Project"],
    }),

    adminAddUpdateUpcommingProject: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/UpcommingProject`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Upcomming Project"],
    }),

    AdminToggleUpcommingProject: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/UpcommingProject/toggle?id=${id}`,
        method: "POST",
      }),
      invalidatesTags: ["Admin Upcomming Project"],
    }),

    deleteMultipleUpcommingProjectAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/UpcommingProject/deletemultiple`,
        method: "DELETE",
        body,
      }),
      invalidatesTags: ["Admin Upcomming Project"],
    }),
  }),
});

export const {
  useAdminAddUpdateUpcommingProjectMutation,
  useAdminDeleteProjectMutation,
  useGetAdminProjectByIdQuery,
  useGetAllAdminUpcommingProjectQuery,
  useAdminToggleUpcommingProjectMutation,
  useDeleteMultipleUpcommingProjectAdminMutation,
} = adminUpcommingProjectApi;
