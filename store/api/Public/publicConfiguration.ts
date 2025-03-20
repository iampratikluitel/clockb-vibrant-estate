import { FOOTER } from "@/lib/types";
import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicConfigurationApi = createApi({
  reducerPath: "publicConfigurationApi",
  tagTypes: [
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
      query: () => `public/configuration/landingpage`,
      providesTags: ["Public LandingPage Config"],
    }),

    //brohure
    getPublicConfigBrochure: builder.query<any, string>({
        query: () =>  `public/configuration/brochure`,
        providesTags: ["Public Brochure Config"]
    })
  }),
});

export const {
  useGetPublicConfigFooterQuery,
  useGetPublicConfigLandingPageQuery,
  useGetPublicConfigBrochureQuery,
} = publicConfigurationApi;
