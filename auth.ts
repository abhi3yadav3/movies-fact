import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "./lib/prisma";

export const { auth, handlers, signIn, signOut } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google],
  session: { strategy: 'jwt' },  // ⟵ change from "database" to "jwt"
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        // attach favoriteMovie later if you want (query once when needed)
        session.user.id = token.sub;
      }
      return session;
    },
  },
});