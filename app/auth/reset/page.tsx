import React from "react";
import { ResetForm } from "@/components/auth/reset";
const Page = () => {
  return (
    <div className="flex items-center justify-center font-Poppins h-screen lg:h-[50vh]">
      <div
        className=" bg-white h-[50vh] w-[80vw] lg:h-[50vh] lg:w-[40vw]"
        style={{ borderRadius: "10px",marginTop:"10%" }}
      >
        <ResetForm />
      </div>
    </div>
  );
};

export default Page;
