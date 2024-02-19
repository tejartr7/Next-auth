"use client";
import React, { Suspense } from "react";
import { LoginForm } from "@/components/auth/login-form";
import { useSearchParams } from "next/navigation";
function Form() {
  return (
    <div className="flex items-center justify-center h-screen font-Poppins">
      <div
        className=" bg-white h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[40vw]"
        style={{ borderRadius: "10px" }}
      >
        <LoginForm
          header="Next Auth"
          backButtonLabel="Dont have an account?"
          backButtonHref="/auth/register"
          showSocial
        >
          Login form
        </LoginForm>
      </div>
    </div>
  );
}
const Page = () => {
  return (
    <div>
      <Suspense>
        <Form />
      </Suspense>
    </div>
  );
};

export default Page;
