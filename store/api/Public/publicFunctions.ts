import { baseQuery } from "@/store/global";
import { createApi } from "@reduxjs/toolkit/query/react";

export const publicFunctionsApi = createApi({
  reducerPath: "publicFunctionsApi",
  tagTypes: [
    "Public Condition of Use Config",
    "Public PrivacyPolicy Config",
    "Public Footer Config",
  ],
  baseQuery: baseQuery,
  keepUnusedDataFor: 2,
  endpoints: (builder) => ({
    PublicSubscribeNewsLetter: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/newsletter`,
        method: "POST",
        body: body,
      }),
    }),

    ForgotPassword: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `auth/forgotpassword`,
        method: "POST",
        body: body,
      }),
    }),

    ResetPassword: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `auth/resetpassword`,
        method: "POST",
        body: body,
      }),
    }),
  }),
});

export const {
  usePublicSubscribeNewsLetterMutation,
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = publicFunctionsApi;
