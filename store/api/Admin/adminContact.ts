import { APPOINTMENT, Contact } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminContactApi = createApi({
  reducerPath: "adminContactApi",
  tagTypes: ["Admin Contact", "Admin Appointment"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAllAdminContact: builder.query<Contact[], string>({
      query: () => `admin/contact`,
      providesTags: ["Admin Contact"],
    }),

    deleteMultipleContactAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/contact/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Contact"],
    }),

    getAllAdminAppointment: builder.query<APPOINTMENT[], string>({
      query: () => `admin/appoinment`,
      providesTags: ["Admin Appointment"],
    }),

    deleteMultipleAppointmentAdmin: builder.mutation<
      { message: string },
      { ids: string[] }
    >({
      query: (body) => ({
        url: `admin/appoinment/deletemultiple`,
        method: "DELETE",
        body: body,
      }),
      invalidatesTags: ["Admin Appointment"],
    }),
  }),
});

export const {
  useGetAllAdminContactQuery,
  useDeleteMultipleContactAdminMutation,

  useGetAllAdminAppointmentQuery,
  useDeleteMultipleAppointmentAdminMutation,
} = adminContactApi;
