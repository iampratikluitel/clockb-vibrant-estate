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
    //Newsletter
    PublicSubscribeNewsLetter: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/newsletter`,
        method: "POST",
        body: body,
      }),
    }),
    //Contact
    PublicContact: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/contact`,
        method: "POST",
        body: body,
      }),
    }),
    //Trainer Enrollment
    TrainerEnrollment: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `public/enrolltrainer`,
        method: "POST",
        body: body,
      }),
    }),
    //Forgot Password
    ForgotPassword: builder.mutation<{ message: string }, any>({
      query: ({ ...body }) => ({
        url: `auth/forgotpassword`,
        method: "POST",
        body: body,
      }),
    }),
    //Reset Password
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
  usePublicContactMutation,
  useTrainerEnrollmentMutation,

  //auth
  useForgotPasswordMutation,
  useResetPasswordMutation,
} = publicFunctionsApi;
