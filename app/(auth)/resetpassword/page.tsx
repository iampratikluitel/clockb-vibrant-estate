"use client";

import React from "react";
import ResetPasswordForm from "../components/ResetPasswordForm";
import { Provider } from "react-redux";
import { store } from "@/store/store";

const ResetPassword = () => {
  return (
    <div className="flex gap-x-10 border p-10 rounded-lg">
      <div className="flex flex-col gap-y-10">
        <div className="font-semibold text-2xl">Reset Password </div>
        <Provider store={store}>
          <ResetPasswordForm />
        </Provider>
      </div>
    </div>
  );
};

export default ResetPassword;
