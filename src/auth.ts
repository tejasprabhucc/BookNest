import NextAuth, { User } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/src/lib/actions";
import { IMember } from "@/src/lib/definitions";
import { z } from "zod";
import Google from "next-auth/providers/google";
import { GoogleProfile } from "next-auth/providers/google";
import { authConfig } from "./auth.config";

export const { handlers, signIn, signOut, auth } = NextAuth({
  pages: {
    signIn: "/login",
  },
  providers: [
    Google({
      profile(profile: GoogleProfile) {
        return { role: profile.role ?? "user", ...profile };
      },
    }),
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        email: { label: "email", type: "email" },
        password: { label: "password", type: "password" },
      },
      authorize: async (credentials) => {
        const parsedCredentials = z
          .object({ email: z.string().email(), password: z.string().min(6) })
          .safeParse(credentials);

        if (!parsedCredentials.success) {
          console.log("Invalid credentials format");
          return null;
        }

        const { email, password } = parsedCredentials.data;

        try {
          const user = (await getUserByEmail(email)) as IMember;
          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatched = await bcrypt.compare(password, user.password);
          if (!passwordMatched) {
            console.log("Password does not match");
            return null;
          }

          const userData = {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            role: user.role,
          };
          console.log("User data: ", userData);
          return userData;
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    ...authConfig.callbacks,

    async signIn({ user, account }) {
      if (account?.provider === "google") {
        try {
          if (user) {
            const existingUser = await getUserByEmail(user.email!);
            if (!existingUser) {
              const result = await createUser({
                name: user.name!,
                email: user.email!,
                age: null,
                password: user.id!,
                role: "user",
              });
            }
          }
        } catch (error) {
          console.error("Error creating user:", error);
          return false;
        }
      }
      return true;
    },
  },
});
export { NextAuth };
