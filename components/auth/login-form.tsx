"use client";
import { Suspense } from "react";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Social } from "@/components/auth/Socials";
import { BackButton } from "@/components/auth/back-button";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginSchema } from "@/schemas/index";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Login } from "@/actions/login";
import { useTransition } from "react";
import { useState } from "react";
import { useSearchParams } from "next/navigation";

interface LoginFormProps {
  children: React.ReactNode;
  header: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export const LoginForm = ({
  header,
  backButtonLabel,
  backButtonHref,
  showSocial,
  children,
}: LoginFormProps) => {
  const searchParams = useSearchParams();
  const [showTwoFactor, setShowTwoFactor] = useState(false);
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setTransition] = useTransition();
  const callbackUrl = searchParams.get("callbackUrl");
  const urlError =
    searchParams.get("error") === "OAuthAccountNotLinked"
      ? "Email already in use with different provider!"
      : "";
  const [isPending, startTransition] = useTransition();
  const form = useForm<z.infer<typeof LoginSchema>>({
    resolver: zodResolver(LoginSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof LoginSchema>) => {
    setError("");
    setSuccess("");
    setTransition(() => {
      Login(values, callbackUrl)
        .then((data) => {
          if (data?.error) {
            form.reset();
            setError(data.error);
          }

          if (data?.success) {
            form.reset();
            setSuccess(data.success);
          }

          if (data?.twoFactor) {
            setShowTwoFactor(true);
          }
        })
        .catch(() => setError("Something went wrong"));
    });
  };

  return (
    <Suspense>
      <div
        className=" bg-white h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[40vw]"
        style={{ borderRadius: "10px" }}
      >
        <Card
          className=" bg-white h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[40vw]"
          style={{ borderRadius: "10px" }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{header}</CardTitle>
            <CardDescription className="font-bold font-Poppins">
              Welcome Back🎉
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-6"
              >
                <div className="space-y-4">
                  {showTwoFactor && (
                    <FormField
                      control={form.control}
                      name="code"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Two Factor Code</FormLabel>
                          <FormControl>
                            <Input
                              {...field}
                              disabled={isPending}
                              placeholder="123456"
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  )}
                  {!showTwoFactor && (
                    <>
                      <FormField
                        control={form.control}
                        name="email"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                              <Input
                                {...field}
                                disabled={isPending}
                                placeholder="john.doe@example.com"
                                type="email"
                              />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
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
                            <Button
                              size="sm"
                              variant="link"
                              asChild
                              className="px-0 font-normal"
                            >
                              <Link href="/auth/reset">Forgot password?</Link>
                            </Button>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                </div>
                <FormError message={error || urlError} />
                <FormSuccess message={success} />
                <Button disabled={isPending} type="submit" className="w-full">
                  {showTwoFactor ? "Confirm" : "Login"}
                </Button>
              </form>
            </Form>
          </CardContent>

          {showSocial && (
            <CardFooter>
              <Social />
            </CardFooter>
          )}

          <CardFooter className="font-bold font-Poppins text-lg flex justify-center items-center">
            <div className="text-center font-bold font-Poppins text-lg">
              <BackButton label={backButtonLabel} href={backButtonHref} />
            </div>
          </CardFooter>
        </Card>
      </div>
    </Suspense>
  );
};
