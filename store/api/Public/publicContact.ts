import { APPOINTMENT, Contact } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicContactApi = createApi({
  reducerPath: "publicContactApi",
  tagTypes: ["Public Contact", "Public Appointment"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    PublicContact: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/contact`,
        method: "POST",
        body: body,
      }),
    }),

    PublicAppointment: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/appointment`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
 usePublicAppointmentMutation,
 usePublicContactMutation,
} = publicContactApi;