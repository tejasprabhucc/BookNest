import NextAuth from "next-auth";
import { authConfig } from "./auth.config";

export default NextAuth(authConfig).auth;

export const config = {
  // https://nextjs.org/docs/app/building-your-application/routing/middleware#matcher
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};

// import { NextRequest, NextResponse } from "next/server";
// import NextAuth from "next-auth";
// import { authConfig } from "./auth.config";
// import createMiddleware from "next-intl/middleware";
// import { routing } from "./i18n/routing";
// // Initialize the middlewares
// const authMiddleware = NextAuth(authConfig).auth;
// const intlMiddleware = createMiddleware(routing);
// // Type-safe middleware function
// export async function middleware(req: NextRequest) {
//   // 1. Internationalization middleware
//   const intlResponse = intlMiddleware(req);
//   if (intlResponse instanceof NextResponse) {
//     return intlResponse; // If internationalization logic modifies the request, return the response
//   }
//   // 2. Authentication middleware
//   const authResponse = await authMiddleware();
//   if (authResponse instanceof NextResponse) {
//     return authResponse; // If authentication logic modifies the request, return the response
//   }
//   // Continue with the request if no middleware returns a response
//   return NextResponse.next();
// }
// // Define matcher for applying both middlewares
// export const config = {
//   matcher: [
//     // Auth should apply to all pages except static assets and API routes
//     "/((?!api|_next/static|_next/image|.*\\.png$).*)",
//     // Internationalized paths
//     "/(kn|en)/:path*",
//   ],
// };
