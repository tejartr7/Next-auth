import NextAuth,{DefaultSession} from "next-auth";
import {Session } from "next-auth";
import authConfig from "@/auth.config"
import { PrismaAdapter } from '@auth/prisma-adapter'
import { db } from "@/lib/db"
import {userById} from '@/data/user';

interface TokenWithJWT extends JWT {
  // Define any additional properties you want to include in the token
  customProperty?: string;
}
export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  callbacks: {
    async jwt({ token,user}) {
      console.log({user});
      console.log({token});
      return token;
    },
    async session({ token, session }) {
      console.log({token});
      if (token.sub && session.user) {
        session.user.id = token.sub;
      }

      if (token.role && session.user) {
        session.user.role = token.role as UserRole;
      }

      if (session.user) {
        
      }

      if (session.user) {
        session.user.name = token.name;
        session.user.email = token.email;
      }

      return session;
    },
  },
  adapter: PrismaAdapter(db),
  session: { strategy: "jwt" },
  ...authConfig,
});