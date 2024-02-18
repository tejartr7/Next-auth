"use server";
import { signIn } from "@/auth";
import * as z from "zod";
import { LoginSchema } from "@/schemas";
import { DEFAULT_LOGIN_REDIRECT } from "@/route";
import { error } from "console";
import { AuthError } from "next-auth";
import { userByMail, userById } from "@/data/user";
import { generateVerificationToken } from "@/lib/tokens";
import { sendVerificationEmail } from "@/lib/mail";
import { VerificationToken } from "@prisma/client";
export const Login = async (
  values: z.infer<typeof LoginSchema>,
  callbackUrl?: string | null
) => {
  const valid = LoginSchema.safeParse(values);
  if (!valid.success) {
    return { error: "Invalid Credentials" };
  }
  const { email, password } = valid.data;
  const existingUser = await userByMail(email);

  if (!existingUser || !existingUser.email || !existingUser.password) {
    return { error: "Email does not exist!" };
  }

  if (!existingUser.emailVerified) {
    const verificationToken = await generateVerificationToken(
      existingUser.email
    );
    await sendVerificationEmail(
      verificationToken.email,
      verificationToken.token
    );
    return { success: "Confirmation email sent!" };
  }
  try {
    await signIn("credentials", {
      email,
      password,
      redirectTo: callbackUrl || DEFAULT_LOGIN_REDIRECT,
    });

    return { success: "Welcome back 🎉" };
  } catch (error) {
    if (error instanceof AuthError) {
      switch (error.type) {
        case "CredentialsSignin":
          return { error: "Invalid credentials!" };
        default:
          return { error: "Something went wrong!" };
      }
    }
    throw error;
  }
};
