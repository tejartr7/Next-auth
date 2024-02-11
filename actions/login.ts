'use server';
import { signIn } from '@/auth';
import * as z from 'zod';
import { LoginSchema } from '@/schemas';
import { DEFAULT_LOGIN_REDIRECT } from '@/route'
import { error } from 'console';
import { AuthError } from "next-auth";

export const Login = async (values: z.infer<typeof LoginSchema>,
    callbackUrl?: string | null,
    ) => {
    const valid = LoginSchema.safeParse(values);
    if (!valid.success) {
        return { error: "Invalid Credentials" };
    }
    const { email, password } = valid.data;
    try {
        await signIn("credentials",
            {
                email,
                password,
                redirectTo: callbackUrl||DEFAULT_LOGIN_REDIRECT,
            });
    }
    catch (error) {
        if (error instanceof AuthError) {
            switch (error.type) {
                case "CredentialsSignin":
                    return { error: "Invalid credentials!" }
                default:
                    return { error: "Something went wrong!" }
            }
        }
        throw error;
    }
    //return { success: "Welcome back 🎉" };
}