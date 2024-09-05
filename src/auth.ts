import NextAuth, { User } from "next-auth";
import { authConfig } from "./auth.config";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";
import { createUser, getUserByEmail } from "@/src/lib/actions";
import { IMember } from "@/src/models/member.schema";
import { z } from "zod";
import Google from "next-auth/providers/google";

function mapMemberToUser(member: IMember): User {
  return {
    id: member.id.toString(),
    name: member.name,
    email: member.email,
  };
}

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Google,
    CredentialsProvider({
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
          const user = await getUserByEmail(email);
          if (!user) {
            console.log("User not found");
            return null;
          }

          const passwordMatched = await bcrypt.compare(password, user.password);
          if (!passwordMatched) {
            console.log("Password does not match");
            return null;
          }

          return mapMemberToUser(user);
        } catch (error) {
          console.error("Error during authentication:", error);
          return null;
        }
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile }) {
      if (account?.provider === "google") {
        try {
          if (user && profile) {
            const existingUser = await getUserByEmail(user.email!);
            if (!existingUser) {
              await createUser({
                name: profile.name!,
                email: user.email!,
                age: 0,
                password: "",
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
