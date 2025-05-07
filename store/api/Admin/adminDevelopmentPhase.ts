import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";
import { DEVELOPMENTPHASE } from "@/lib/types";

export const adminDevelopementPhaseApi = createApi({
  reducerPath: "adminDevelopmentPhaseApi",
  tagTypes: ["Admin Development Phase"],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAdminDevelopmentPhase: builder.query<DEVELOPMENTPHASE[], string>({
      query: () => `admin/phases`,
      providesTags: ["Admin Development Phase"],
    }),

    AdminAddUpdateDevelopementPhase: builder.mutation<{ message: string }, any>(
      {
        query: ({ ...body }) => ({
          url: `admin/phases`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Admin Development Phase"],
      }
    ),
  }),
});

export const {
  useAdminAddUpdateDevelopementPhaseMutation,
  useGetAdminDevelopmentPhaseQuery,
} = adminDevelopementPhaseApi;
