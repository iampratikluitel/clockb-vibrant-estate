import { CONDITIONSOFUSE, FOOTER, PRIVACYPOLICY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicDevelopementPhaseApi = createApi({
  reducerPath: "publicDevelopmentPhaseApi",
  tagTypes: ["Public Development Phase"],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    getPublicDevelopmentPhase: builder.query<any, string>({
      query: () => `public/phases`,
      providesTags: ["Public Development Phase"],
    }),
  }),
});

export const {
  useGetPublicDevelopmentPhaseQuery,
} = publicDevelopementPhaseApi;
