"use client";

import React from "react";
import ForgotPasswordForm from "../components/ForgotPasswordForm";
import { store } from "@/store/store";
import { Provider } from "react-redux";

const ForgotPassword = () => {
  return (
    <div className="flex gap-x-10 border p-10 rounded-lg">
      <div className="flex flex-col gap-y-10">
        <div className="font-semibold text-2xl">Forgot Password </div>
        <Provider store={store}>
          {" "}
          {/* Wrap the app with Provider */}
          <ForgotPasswordForm />
        </Provider>
      </div>
    </div>
  );
};

export default ForgotPassword;
