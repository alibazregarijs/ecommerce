"use client";
import React from "react";
import AuthForm from "@/components/AuthForm";
import { signUPSchema } from "@/lib/validations";
import { signUp } from "@/lib/actions/auth";
const page = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_UP"
        schema={signUPSchema}
        defaultValues={{
          email: "",
          fullName: "",
          password: "",
          confirmPassword: "",
        }}
        onSubmit={signUp}
      />
    </div>
  );
};

export default page;
