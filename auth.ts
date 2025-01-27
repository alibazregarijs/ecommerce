import NextAuth, { User } from "next-auth";
import { compare } from "bcryptjs";
import CredentialsProvider from "next-auth/providers/credentials";
import { prisma } from "@/lib/prisma"; // Ensure this is the correct path to your Prisma client

export const { handlers, signIn, signOut, auth } = NextAuth({
  session: {
    strategy: "jwt",
  },
  providers: [
    CredentialsProvider({
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) {
          return null; // Missing credentials
        }

        // Prisma query to find the user by email
        const user = await prisma.user.findUnique({
          where: { email: credentials.email.toString() },
        });

        if (!user) {
          return null; // No user found
        }

        // Compare the provided password with the hashed password
        const isPasswordValid = await compare(
          credentials.password.toString(),
          user.password
        );

        if (!isPasswordValid) {
          return null; // Invalid password
        }

        // Return the user object in the required format
        return {
          id: user.id.toString(),
          email: user.email,
          name: user.fullName, // Adjust based on your schema
        } as User;
      },
    }),
  ],
  pages: {
    signIn: "/sign-in",
  },
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }

      return token;
    },
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
        session.user.name = token.name as string;
      }

      return session;
    },
  },
});
