import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQuery } from "@/store/global";
import { CONDITIONSOFUSE, FOOTER, PRIVACYPOLICY } from "@/lib/types";

export const adminConfigurationApi = createApi({
  reducerPath: "adminConfigurationApi",
  tagTypes: [
    "Admin Landing Config",
    "Admin Download Brochure Config",
    "Admin Footer Config",
    "Admin Condition of Use Config",
    "Admin PrivacyPolicy Config",
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
      providesTags: ["Admin Download Brochure Config"],
    }),

    AdminAddUpdateConfigurationBrochure: builder.mutation<
      { message: string },
      any
    >({
      query: ({ ...body }) => ({
        url: `admin/configuration/brochure`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Download Brochure Config"],
    }),

    AdminDeleteBrochure: builder.mutation<
      {
        success: any;
        message: string;
      },
      any
    >({
      query: (id) => ({
        url: `admin/configuration?id=${id}`,
        method: "DELETE",
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

    getAdminConfigConditionsOfUse: builder.query<CONDITIONSOFUSE, string>({
      query: () => `admin/configuration/conditionsofuse`,
      providesTags: ["Admin Condition of Use Config"],
    }),

    AdminAddUpdateConditionsOfUse: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/configuration/conditionsofuse`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin Condition of Use Config"],
    }),

    //Privacy Policy
    getAdminConfigPrivacyPolicy: builder.query<PRIVACYPOLICY, string>({
      query: () => `admin/configuration/privacypolicy`,
      providesTags: ["Admin PrivacyPolicy Config"],
    }),

    AdminAddUpdatePrivacyPolicy: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `admin/configuration/privacypolicy`,
        method: "POST",
        body: body,
      }),
      invalidatesTags: ["Admin PrivacyPolicy Config"],
    }),
  }),
});

export const {
  useAdminAddUpdateLandingPageConfigMutation,
  useGetAdminConfigLandingPageQuery,

  useAdminAddUpdateConfigurationBrochureMutation,
  useGetAdminConfigurationBrochureQuery,
  useAdminDeleteBrochureMutation,

  useAdminAddUpdateFooterConfigMutation,
  useGetAdminConfigFooterQuery,

  useGetAdminConfigConditionsOfUseQuery,
  useAdminAddUpdateConditionsOfUseMutation,

  useAdminAddUpdatePrivacyPolicyMutation,
  useGetAdminConfigPrivacyPolicyQuery,
} = adminConfigurationApi;
