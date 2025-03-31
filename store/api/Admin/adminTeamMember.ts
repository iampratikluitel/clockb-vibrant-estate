import { Member } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const adminMemberApi = createApi({
  reducerPath: "adminMemberApi",
  tagTypes: ["Admin Member"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All Member
    getAllAdminMember: builder.query<Member[], string>({
      query: () => `admin/about/teamMember`,
      providesTags: ["Admin Member"],
    }),

    //Member by Id
    getAdminMemberById: builder.query<Member, string>({
      query: (id) => `admin/about/teamMember/byid?id=${id}`,
      providesTags: ["Admin Member"],
    }),

    //Admin Delete Member
    AdminDeleteMember: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/about/teamMember?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Member"],
    }),

    //Add Update Member
    AdminAddUpdateMember: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/about/teamMember`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Member"],
    }),

    //Delete Multiple Courses
    deleteMultipleMemberAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/about/teamMember/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Member"],
    }),
  }),
});

export const {
  useAdminAddUpdateMemberMutation,
  useAdminDeleteMemberMutation,
  useGetAdminMemberByIdQuery,
  useGetAllAdminMemberQuery,
  useDeleteMultipleMemberAdminMutation,
} = adminMemberApi;
