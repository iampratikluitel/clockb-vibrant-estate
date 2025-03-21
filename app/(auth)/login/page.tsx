import React from "react";
import LoginForm from "./_component/login-form";

type Props = {};

const Page = (props: Props) => {
  return (
    <div className="flex gap-x-10 border p-10 rounded-lg">
      <div className="flex flex-col gap-y-10">
        <div className="font-semibold text-2xl">Login </div>
        <LoginForm></LoginForm>
      </div>
    </div>
  );
};

export default Page;
