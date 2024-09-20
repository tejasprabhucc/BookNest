import type { NextAuthConfig, Session } from "next-auth";

export const authConfig = {
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user, profile }) {
      if (user) {
        const userData = {
          id: user?.id,
          name: user?.name,
          email: user?.email,
          role: user?.role,
          image: profile?.picture ?? "",
        };
        token = { ...userData };
      }
      return token;
    },

    session({ session, token }: { session: Session; token: any }) {
      if (token) {
        session.user = token;
      }
      return session;
    },

    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isAdmin = auth?.user?.role === "admin";

      const isOnDashboard = nextUrl.pathname.startsWith("/dashboard");
      const isOnAdminRoute = nextUrl.pathname.startsWith("/admin");

      const isOnPublicPage = ["/", "/login", "/signup"].includes(
        nextUrl.pathname
      );

      if (isLoggedIn) {
        if (isAdmin) {
          if (isOnAdminRoute) return true;
          return Response.redirect(new URL("/admin/books", nextUrl));
        } else {
          if (isOnDashboard) return true;
          return Response.redirect(new URL("/dashboard", nextUrl));
        }
      } else {
        if (isOnPublicPage) {
          return true;
        }
        return false;
      }
      // return true;
    },
  },
  providers: [],
} satisfies NextAuthConfig;
