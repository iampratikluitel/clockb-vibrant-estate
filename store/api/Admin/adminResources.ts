import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";

export const adminResourcesApi = createApi({
  reducerPath: "adminResourcesApi",
  baseQuery: baseQuery,
  tagTypes: [
    "Admin Investment Document",
    "Admin Legal Document",
    "Admin Guide",
    "Admin Project Update",
    "Admin Event",
  ],
  endpoints: (builder) => ({
    getAllInvestmentDocument: builder.query<any, string>({
      query: () => `admin/resources/investmentDocument`,
      providesTags: ["Admin Investment Document"],
    }),

    getAdminInvestmentDocumentById: builder.query<any, string>({
      query: (id) => `admin/resources/investmentDocument/byid?id=${id}`,
      providesTags: ["Admin Investment Document"],
    }),

    adminAddUpdateInvestmentDocument: builder.mutation<
      { message: string },
      any
    >({
      query: (body) => ({
        url: `admin/resources/investmentDocument`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Investment Document"],
    }),

    adminDeleteInvestmentDocument: builder.mutation<{ member: string }, any>({
      query: (id) => ({
        url: `admin/resources/investmentDocument?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Investment Document"],
    }),

    getAllLegalDoc: builder.query<any[], string>({
      query: () => `admin/resources/legalDoc`,
      providesTags: ["Admin Legal Document"],
    }),

    getAdminLegalDocById: builder.query<any, string>({
      query: (id) => `admin/resources/legalDoc/byid?id=${id}`,
      providesTags: ["Admin Legal Document"],
    }),

    adminAddUpdateLegalDoc: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/resources/legalDoc`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Legal Document"],
    }),

    adminDeleteLegalDoc: builder.mutation<{ member: string }, any>({
      query: (id) => ({
        url: `admin/resources/legalDoc?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Legal Document"],
    }),

    getAllAdminGuide: builder.query<any[], string>({
      query: () => `admin/resources/guide`,
      providesTags: ["Admin Guide"],
    }),

    getAdminGuideById: builder.query<any, string>({
      query: (id) => `admin/resources/guide/byid?id=${id}`,
      providesTags: ["Admin Guide"],
    }),

    adminAddUpdateGuide: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/resources/guide`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Guide"],
    }),

    adminDeleteGuide: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/resources/guide/by?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Guide"],
    }),

    getAllAdminProjectUpdate: builder.query<any, string>({
      query: () => `admin/resources/projectUpdate`,
      providesTags: ["Admin Project Update"],
    }),

    getAdminProjectUpdateById: builder.query<any, string>({
      query: (id) => `admin/resources/projectUpdate/byid?id=${id}`,
      providesTags: ["Admin Project Update"],
    }),

    adminAddUpdateProjectUpdate: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/resources/projectUpdate`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Project Update"],
    }),

    adminDeleteProjectUpdate: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/resources/projectUpdate/by?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Guide"],
    }),

    getAllAdminEvent: builder.query<any, string>({
      query: () => `admin/resources/event`,
      providesTags: ["Admin Event"],
    }),

    getAdminEventById: builder.query<any, string>({
      query: (id) => `admin/resources/event/byid?id=${id}`,
      providesTags: ["Admin Event"],
    }),

    adminAddUpdateEvent: builder.mutation<{ message: string }, any>({
      query: (body) => ({
        url: `admin/resources/event`,
        method: "POST",
        body,
      }),
      invalidatesTags: ["Admin Event"],
    }),

    adminDeleteEvent: builder.mutation<{ message: string }, any>({
      query: (id) => ({
        url: `admin/resources/event/by?id=${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Admin Event"],
    }),
  }),
});

export const {
  useGetAllInvestmentDocumentQuery,
  useGetAdminInvestmentDocumentByIdQuery,
  useAdminAddUpdateInvestmentDocumentMutation,
  useAdminDeleteInvestmentDocumentMutation,

  useGetAllLegalDocQuery,
  useGetAdminLegalDocByIdQuery,
  useAdminAddUpdateLegalDocMutation,
  useAdminDeleteLegalDocMutation,

  useGetAllAdminGuideQuery,
  useGetAdminGuideByIdQuery,
  useAdminAddUpdateGuideMutation,
  useAdminDeleteGuideMutation,

  useGetAllAdminProjectUpdateQuery,
  useGetAdminProjectUpdateByIdQuery,
  useAdminAddUpdateProjectUpdateMutation,
  useAdminDeleteProjectUpdateMutation,

  useGetAllAdminEventQuery,
  useGetAdminEventByIdQuery,
  useAdminAddUpdateEventMutation,
  useAdminDeleteEventMutation,
} = adminResourcesApi;
