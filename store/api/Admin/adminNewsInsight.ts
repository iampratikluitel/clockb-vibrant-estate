import { News } from "@/lib/types";
  import { baseQuery } from "@/store/global";
  import { createApi } from "@reduxjs/toolkit/query/react";
  
  export const adminNewsApi = createApi({
    reducerPath: "adminNewsApi",
    tagTypes: [
      "Admin News",
    ],
    baseQuery: baseQuery,
    keepUnusedDataFor: 2,
    endpoints: (builder) => ({
      //Get All News
      getAllAdminNews: builder.query<News[], string>({
        query: () => `admin/News`,
        providesTags: ["Admin News"],
      }),
  
      // News by Id
      getAdminNewsById: builder.query<News, string>({
        query: (id) => `admin/News/byid?id=${id}`,
        providesTags: ["Admin News"],
      }),
  
      // Admin Delete News
      AdminDeleteNews: builder.mutation<{ message: string }, any>({
        query: (id) => ({
          url: `admin/News?id=${id}`,
          method: "DELETE",
        }),
        invalidatesTags: ["Admin News"],
      }),
  
      //Add Update News
      AdminAddUpdateNews: builder.mutation<{ message: string }, any>({
        query: ({ ...body }) => ({
          url: `admin/News`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Admin News"],
      }),
  
      // Admin Toggle News Status
      AdminToggleNews: builder.mutation<{ message: string }, any>({
        query: (id) => ({
          url: `admin/News/toggle?id=${id}`,
          method: "POST",
        }),
        invalidatesTags: ["Admin News"],
      }),
  
      //Delete Multiple News
      deleteMultipleNewsAdmin: builder.mutation<
        { message: string },
        { ids: string[] }
      >({
        query: (body) => ({
          url: `admin/News/deletemultiple`,
          method: "DELETE",
          body: body,
        }),
        invalidatesTags: ["Admin News"],
      }),
    }),
  });
  
  export const {
    useAdminAddUpdateNewsMutation,
    useAdminDeleteNewsMutation,
    useGetAdminNewsByIdQuery,
    useGetAllAdminNewsQuery,
    useAdminToggleNewsMutation,
    useDeleteMultipleNewsAdminMutation,
  } = adminNewsApi;
  