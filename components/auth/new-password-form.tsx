"use client";
import { Suspense } from "react";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { useState, useTransition } from "react";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";

import { NewPasswordSchema } from "@/schemas";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { newPassword } from "@/actions/new-password";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { BeatLoader } from "react-spinners";
export const NewPasswordForm = () => {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof NewPasswordSchema>>({
    resolver: zodResolver(NewPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  const onSubmit = (values: z.infer<typeof NewPasswordSchema>) => {
    setError("");
    setSuccess("");

    startTransition(() => {
      newPassword(values, token).then((data) => {
        setError(data?.error);
        setSuccess(data?.success);
      });
    });
  };

  return (
    <Suspense>
      <div
        className=" bg-white h-[50vh] w-[80vw] lg:h-[50vh] lg:w-[40vw]"
        style={{ borderRadius: "10px" }}
      >
        <Card
          className=" bg-white h-[50vh] w-[80vw] lg:h-[50vh] lg:w-[40vw]"
          style={{ borderRadius: "10px" }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">Next Auth 🔐</CardTitle>
            <CardDescription className="font-bold font-Poppins">
              Enter a new password
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  <FormField
                    control={form.control}
                    name="password"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Password</FormLabel>
                        <FormControl>
                          <Input
                            {...field}
                            disabled={isPending}
                            placeholder="******"
                            type="password"
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <FormError message={error} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                  Reset password
                </Button>
              </form>
            </Form>
          </CardContent>
          <CardFooter className="font-bold font-Poppins text-lg flex justify-center items-center">
            <div className="text-center font-bold font-Poppins text-lg">
              <Button>
                <Link href="/auth/login">Back to Login</Link>
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
};
