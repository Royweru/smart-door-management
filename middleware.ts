import NextAuth from "next-auth";

import authConfig from "./auth.config";
import { apiAuthPrefix,authRoute,DEFAULT_LOGIN_REDIRECT, publicRoutes } from './routes'
const {auth } = NextAuth(authConfig)

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default auth((req): void | Response | Promise<void | Response> => {
  const { nextUrl } = req;
  const isLoggedIn = !!req.auth;

  const isApiRoute = nextUrl.pathname.startsWith(apiAuthPrefix);
  const isPublicRoutes = publicRoutes.includes(nextUrl.pathname);
  const isAuthRoute = nextUrl.pathname.startsWith(authRoute);

  if (isApiRoute) return; // return undefined instead of null

  if (isAuthRoute) {
    if (isLoggedIn) {
      return Response.redirect(new URL(DEFAULT_LOGIN_REDIRECT, nextUrl));
    }
    return; // return undefined instead of null
  }

  if (!isLoggedIn && !isPublicRoutes) {
    return Response.redirect(new URL("/auth", nextUrl));
  }
  
  return; // return undefined instead of null
});


export const config={
    matcher: [
        // Skip Next.js internals and all static files, unless found in search params
        '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
        // Always run for API routes
        '/(api|trpc)(.*)',
      ],
}