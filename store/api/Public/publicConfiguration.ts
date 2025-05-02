import { CONDITIONSOFUSE, FOOTER, PRIVACYPOLICY } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicConfigurationApi = createApi({
  reducerPath: "publicConfigurationApi",
  tagTypes: [
    "Public Condition of Use Config",
    "Public PrivacyPolicy Config",
    "Public Footer Config",
    "Public LandingPage Config",
    "Public Brochure Config"
  ],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    //Footer
    getPublicConfigFooter: builder.query<FOOTER, string>({
      query: () => `public/configuration/footer`,
      providesTags: ["Public Footer Config"],
    }),

    //LandingPage
    getPublicConfigLandingPage: builder.query<any, string>({
      query: () => `public/configuration/landingConfiguration`,
      providesTags: ["Public LandingPage Config"],
    }),

    //brohure
    getPublicConfigBrochure: builder.query<any, string>({
        query: () =>  `public/configuration/brochure`,
        providesTags: ["Public Brochure Config"]
    }),
    getPublicConfigConditionsOfUse: builder.query<CONDITIONSOFUSE, string>({
      query: () => `public/configuration/conditionsofuse`,
      providesTags: ["Public Condition of Use Config"],
    }),

    //Privacy Policy
    getPublicConfigPrivacyPolicy: builder.query<PRIVACYPOLICY, string>({
      query: () => `public/configuration/privacypolicy`,
      providesTags: ["Public PrivacyPolicy Config"],
    }),
  }),
});

export const {
  useGetPublicConfigFooterQuery,
  useGetPublicConfigLandingPageQuery,
  useGetPublicConfigBrochureQuery,
  useGetPublicConfigConditionsOfUseQuery,
  useGetPublicConfigPrivacyPolicyQuery,
} = publicConfigurationApi;
