import NextAuth from "next-auth";
import authConfig from "./auth.config";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { db } from "@/lib/db";
import { getUserByEmail } from "./data/user";
import bcrypt from "bcryptjs";

export const {
  handlers: { GET, POST },
  auth,
  signIn,
  signOut,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error",
  },
  trustHost: true,
  callbacks: {
    async signIn({ credentials }: any) {
      const user = await getUserByEmail(credentials.email);
      if (!user || !user.password) return false;
      const passwordsMatch = await bcrypt.compare(
        credentials.password,
        user.password
      );
      if (!passwordsMatch) return false;

      return true;
    },
    //@ts-ignore
    async session({ session, token }) {
      if (token.sub && session?.user) {
        session.user.id = token.sub;
      }
      if (token.role && session.user) {
        session.user.role = token.role;
      }

      if (session.user) {
        session.user.email = token.email;
        session.user.status = token.status;
        session.user.id = token.sub;
      }

      return session;
    },

    async jwt({ token }: any) {
      if (!token.sub) return token;
      const existingUser = await getUserByEmail(token.email!);
      if (!existingUser) return token;
      token.role = existingUser.userType;
      token.email = existingUser.email;
      token.status = existingUser.status;
      token.sub = existingUser.id.toString();

      return token;
    },
  },
  session: { strategy: "jwt" },
  ...authConfig,
  adapter: PrismaAdapter(db),
} as any);
