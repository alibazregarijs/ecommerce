"use client";
import React, { useState } from "react";
import AuthForm from "@/components/AuthForm";
import { signINSchema } from "@/lib/validations";
import { signInWithCredentials } from "@/lib/actions/auth";



const page = () => {
  return (
    <div>
      <AuthForm
        type="SIGN_IN"
        schema={signINSchema}
        defaultValues={{
          email: "",
          password: "",
        }}
        onSubmit={signInWithCredentials}
      />
    </div>
  );
};

export default page;
