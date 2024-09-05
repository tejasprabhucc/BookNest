import type { NextAuthConfig } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = true;
      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdminRoute = nextUrl.pathname.startsWith("/admin");

      if (isLoggedIn) {
        if (isAdmin) {
          if (isOnAdminRoute) return true;
          return Response.redirect(new URL("/admin/books", nextUrl));
        } else {
          if (isOnDashboard) return true;
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      }

      return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
