"use client";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { RegisterSchema } from "@/schemas/index";
import { FormError } from "@/components/auth/form-error";
import { FormSuccess } from "@/components/auth/form-success";
import { Register } from "@/actions/register";
import { Suspense, useTransition } from "react";
import { useState } from "react";
interface RegisterFormProps {
  children: React.ReactNode;
  header: string;
  backButtonLabel: string;
  backButtonHref: string;
  showSocial?: boolean;
}
export const RegisterForm = ({
  header,
  backButtonLabel,
  backButtonHref,
  showSocial,
  children,
}: RegisterFormProps) => {
  const [error, setError] = useState<string | undefined>("");
  const [success, setSuccess] = useState<string | undefined>("");
  const [isLoading, setTransition] = useTransition();
  const form = useForm<z.infer<typeof RegisterSchema>>({
    resolver: zodResolver(RegisterSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const onSubmit = (values: z.infer<typeof RegisterSchema>) => {
    setError("");
    setSuccess("");
    setTransition(() => {
      Register(values).then((data) => {
        setError(data.error);
        setSuccess(data.success);
      });
    });
  };

  return (
    <Suspense>
      <div
        className=" bg-white h-[80vh] w-[80vw] lg:h-[80vh] lg:w-[40vw]"
        style={{ borderRadius: "10px" }}
      >
        <Card
          className=" bg-white h-[90vh] w-[80vw] lg:h-[90vh] lg:w-[40vw]"
          style={{ borderRadius: "10px" }}
        >
          <CardHeader className="text-center">
            <CardTitle className="text-3xl">{header}</CardTitle>
            <CardDescription className="font-bold font-Poppins">
              Create an Account😊
            </CardDescription>
          </CardHeader>
          <CardContent>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="space-y-8"
              >
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">UserName</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="text"
                          placeholder="enter a username"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="font-bold">Email</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="email"
                          placeholder="darkknight@gmail.com"
                          {...field}
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
                      <FormLabel className="font-bold">Password</FormLabel>
                      <FormControl>
                        <Input
                          disabled={isLoading}
                          type="password"
                          placeholder="enter your password"
                          {...field}
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormError message={error} />
                <FormSuccess message={success} />
                <div className="flex items-center justify-center">
                  <Button type="submit" disabled={isLoading}>
                    Register
                  </Button>
                </div>
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
