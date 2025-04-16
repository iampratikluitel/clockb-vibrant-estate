import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";
import { FOOTER } from "@/lib/types";

export const adminConfigurationApi = createApi({
  reducerPath: "adminConfigurationApi",
  tagTypes: [
    "Admin Landing Config",
    "Admin Download Brochure Config",
    "Admin Footer Config",
  ],
  baseQuery: baseQuery,
  endpoints: (builder) => ({
    getAdminConfigLandingPage: builder.query<any, string>({
      query: () => `admin/configuration/landingpage`,
      providesTags: ["Admin Landing Config"],
    }),

    AdminAddUpdateLandingPageConfig: builder.mutation<{ message: string }, any>(
      {
        query: ({ ...body }) => ({
          url: `admin/configuration/landingpage`,
          method: "POST",
          body: body,
        }),
        invalidatesTags: ["Admin Landing Config"],
      }
    ),

    getAdminConfigurationBrochure: builder.query<any, string>({
      query: () => `admin/configuration/brochure`,
      providesTags: ["Admin Download Brochure Config"]
    }),

    AdminAddUpdateConfigurationBrochure: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/configuration/brochure`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Download Brochure Config"],
    }),
    
    getAdminConfigFooter: builder.query<FOOTER, string>({
      query: () => `admin/configuration/footer`,
      providesTags: ["Admin Footer Config"],
    }),

    AdminAddUpdateFooterConfig: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/configuration/footer`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Footer Config"],
    }),
  }),
});

export const {
  useAdminAddUpdateLandingPageConfigMutation,
  useGetAdminConfigLandingPageQuery,

  useAdminAddUpdateConfigurationBrochureMutation,
  useGetAdminConfigurationBrochureQuery,
  
  useAdminAddUpdateFooterConfigMutation,
  useGetAdminConfigFooterQuery,

} = adminConfigurationApi;
