"use client";
import { Suspense } from "react";
import { useCallback, useEffect, useState } from "react";
import { BeatLoader } from "react-spinners";
import { useSearchParams } from "next/navigation";
import { newVerification } from "@/actions/new-verificaton";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { LoginForm } from "./login-form";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BackButton } from "./back-button";
import { Button } from "@/components/ui/button";
import Link from 'next/link';
export const NewVerificationForm = () => {
  const [error, setError] = useState<string | undefined>();
  const [success, setSuccess] = useState<string | undefined>();

  const searchParams = useSearchParams();

  const token = searchParams.get("token");

  const onSubmit = useCallback(() => {
    if (success || error) return;

    if (!token) {
      setError("Missing token!");
      return;
    }

    newVerification(token)
      .then((data) => {
        setSuccess(data.success);
        setError(data.error);
      })
      .catch(() => {
        setError("Something went wrong!");
      });
  }, [token, success, error]);

  useEffect(() => {
    onSubmit();
  }, [onSubmit]);

  return (
    <Suspense>
    <div className="flex items-center justify-center h-[40vh] font-Poppins">
      <div
        className=" bg-white h-[50vh] w-[80vw] lg:h-[20vh] lg:w-[40vw]"
        style={{ borderRadius: "10px" }}
      >
        <Card
          className=" bg-white h-[80vh] w-[80vw] lg:h-[40vh] lg:w-[40vw]"
          style={{ borderRadius: "10px" }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Next Auth 🔐</CardTitle>
            <CardDescription className="font-bold font-Poppins">
              Verifying email id....
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex justify-center">
              <BeatLoader color="#000" />
            </div>
          </CardContent>
          <CardFooter className="font-bold font-Poppins text-lg flex justify-center items-center">
            <div className="text-center font-bold font-Poppins text-lg">
              <Button>
                <Link href="/auth/login">Login</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
    </Suspense>
  );
};
