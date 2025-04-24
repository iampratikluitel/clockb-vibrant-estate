import { Contact } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicContactApi = createApi({
  reducerPath: "publicContactApi",
  tagTypes: ["Public Contact"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getAllPublicContact: builder.query<Contact[], string>({
      query: () => `public/contact`,
      providesTags: ["Public Contact"],
    }),
  }),
});

export const {
    useGetAllPublicContactQuery,
} = publicContactApi;