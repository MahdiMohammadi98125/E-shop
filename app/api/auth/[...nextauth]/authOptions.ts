import { AuthOptions } from "next-auth";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import GoogleProvider from "next-auth/providers/google";
import prisma from "@/libs/prismadb";
import Credentials from "next-auth/providers/credentials";
import bcrypt from "bcrypt";
export const authOptions: AuthOptions = {
  adapter: PrismaAdapter(prisma),
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
    }),
    Credentials({
      name: "credentials",

      credentials: {
        email: {
          label: "Email",
          type: "email",
          placeholder: "john@example.com",
        },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials, req) {
        if (!credentials?.email || !credentials.password) {
          throw new Error("Invalid credentials");
        }
        const user = await prisma.user.findUnique({
          where: { email: credentials.email },
        });

        if (!user || !user.hashedPassword) {
          throw new Error("Email or password is incorrect!");
        }

        const validPassowrd = await bcrypt.compare(
          credentials.password,
          user.hashedPassword
        );

        if (!validPassowrd) {
          throw new Error("Email or password is incorrect!");
        }
        return user;
      },
    }),
  ],
  pages: { signIn: "/login" },
  debug: process.env.NODE_ENV === "development",
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
};
