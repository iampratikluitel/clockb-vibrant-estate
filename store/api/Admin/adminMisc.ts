import { NEWSLETTER } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const adminMiscsApi = createApi({
  reducerPath: "adminMiscsApi",
  tagTypes: [
    "Admin NewsLetter",
    "Admin Support",
    "Admin Trainer",
    "Admin Users",
    "Admin Dashboard",
  ],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Get All NewsLetter
    getAllAdminNewsLetter: builder.query<NEWSLETTER[], string>({
      query: () => `admin/newsletter`,
      providesTags: ["Admin NewsLetter"],
    }),
  }),
});

export const {
  useGetAllAdminNewsLetterQuery,
} = adminMiscsApi;
