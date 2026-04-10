/**
 * Auth.js (next-auth v5) — admin panel only.
 * Credentials provider; JWT sessions so middleware can protect /admin.
 */

import NextAuth from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { compareSync } from "bcryptjs";
import { prisma } from "@/lib/db";

export const { handlers, auth, signIn, signOut } = NextAuth({
  session: { strategy: "jwt", maxAge: 30 * 24 * 60 * 60 },
  pages: {
    signIn: "/auth/signin",
  },
  providers: [
    Credentials({
      credentials: {
        email: { label: "Login", type: "text" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        const login =
          typeof credentials?.email === "string" ? credentials.email.trim() : "";
        const password =
          typeof credentials?.password === "string" ? credentials.password : "";
        if (!login || !password) return null;

        const user = await prisma.user.findFirst({
          where: { email: login },
        });
        if (!user?.password) return null;
        if (!compareSync(password, user.password)) return null;

        return {
          id: user.id,
          email: user.email ?? undefined,
          name: user.name ?? undefined,
          image: user.image ?? undefined,
        };
      },
    }),
  ],
  callbacks: {
    jwt: async ({ token, user }) => {
      if (user) token.id = user.id;
      return token;
    },
    session: async ({ session, token }) => {
      if (session.user) (session.user as { id?: string }).id = token.id as string;
      return session;
    },
    authorized: async ({ auth: session }) => !!session,
  },
});

/**
 * Use in Server Actions / API routes to enforce admin-only access.
 * Returns session or null; callers should return error when null.
 */
export async function requireAdminSession() {
  const session = await auth();
  if (!session?.user) return null;
  return session;
}
