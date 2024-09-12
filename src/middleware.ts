import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// import { getToken } from "next-auth/jwt";
// import { NextRequest, NextResponse } from "next/server";
// import { auth } from "./auth";

// export async function middleware(req: NextRequest) {
//   console.log(process.env.AUTH_SECRET);
//   try {
//     const token = await getToken({
//       req,
//       secret: process.env.AUTH_SECRET!,
//       salt: "",
//     });
//     console.log("Token:", token);

//     const { pathname } = req.nextUrl;

//     if (pathname.startsWith("/admin")) {
//       if (!token) {
//         return NextResponse.redirect(new URL("/login", req.url));
//       }

//       if (!token.role) {
//         return NextResponse.redirect(new URL("/login", req.url));
//       }

//       if (token.role !== "admin") {
//         return NextResponse.redirect(new URL("/dashboard", req.url));
//       }
//     } else if (token?.role === "admin" && pathname === "/") {
//       return NextResponse.redirect(new URL("/admin/books", req.url));
//     }

//     return NextResponse.next();
//   } catch (error) {
//     console.error("Error retrieving token:", error);
//   }
// }

// export const config = {
//   matcher: ["/admin/:path*", "/dashboard"],
// };

// import { getToken } from "next-auth/jwt";
// import { NextResponse } from "next/server";
// import type { NextRequest } from "next/server";
// import { auth, NextAuth } from "./auth";

// export async function middleware(req: NextRequest) {
//   const user = await auth();
//   console.log("Loggedin user session: ", user);
//   const { pathname } = req.nextUrl;

//   if (pathname.startsWith("/admin")) {
//     if (!user?.user) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     if (!user.user.role) {
//       return NextResponse.redirect(new URL("/login", req.url));
//     }

//     if (user.user.role !== "admin") {
//       return NextResponse.redirect(new URL("/dashboard", req.url));
//     }
//   } else if (user?.user?.role === "admin" && pathname === "/") {
//     return NextResponse.redirect(new URL("/admin/books", req.url));
//   }

//   return NextResponse.next();
// }

// export const config = {
//   matcher: ["/admin/:path*", "/"],
// };
