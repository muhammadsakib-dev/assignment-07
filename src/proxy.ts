// Complete Proxy Function: proxy.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { getSessionCookie } from "better-auth/cookies";

// Function to handle proxy requests and check for session cookie
export function proxy(request: NextRequest) {
  // Check for session cookie
  const sessionCookie = getSessionCookie(request);

  // If session cookie is not present, redirect to sign-in page with callback URL
  if (!sessionCookie) {
    const signInUrl = new URL("/sign-in", request.url);

    // Set the callback URL to the current page
    const callbackUrl = request.nextUrl.pathname + request.nextUrl.search;

    signInUrl.searchParams.set("callbackUrl", callbackUrl);

    return NextResponse.redirect(signInUrl);
  }

  return NextResponse.next();
}

// Configuration for the proxy function to match specific routes
export const config = {
  matcher: ["/products/:id"],
};
