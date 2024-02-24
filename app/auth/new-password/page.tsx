import { NewPasswordForm } from "@/components/auth/new-password-form";
import React,{Suspense} from "react";

const Page = () => {
  return (
    <Suspense>
    <div className="flex items-center justify-center font-Poppins h-screen lg:h-[50vh]">
      <div
        className=" bg-white h-[50vh] w-[80vw] lg:h-[50vh] lg:w-[40vw]"
        style={{ borderRadius: "10px",marginTop:"10%" }}
      >
      <NewPasswordForm />
    </div>
    </div>
    </Suspense>
  );
};

export default Page;
