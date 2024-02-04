import NextAuth from "next-auth"
import authConfig from "@/auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import {userById} from '@/data/user'
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token }) {
      console.log(token);
      return token;
    },
    async session({ session }) {
      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});