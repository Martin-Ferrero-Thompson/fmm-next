// middleware.ts
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { createMiddlewareClient } from "@supabase/auth-helpers-nextjs";

export async function middleware(req: NextRequest) {
  const res = NextResponse.next();

  // Create a Supabase client for the middleware
  const supabase = createMiddlewareClient({ req, res });

  // Get the current user session
  const {
    data: { session },
  } = await supabase.auth.getSession();

  // Protect /admin routes
  if (req.nextUrl.pathname.startsWith("/admin")) {
    // Not logged in? Redirect to login
    if (!session) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/login"; // You'll need to create this page
      redirectUrl.searchParams.set("redirectedFrom", req.nextUrl.pathname);
      return NextResponse.redirect(redirectUrl);
    }

    // Optional: Restrict to "editor" role
    const user = session.user;
    const isEditor = user?.app_metadata?.role === "editor"; 
    // ^ depends how you set roles in Supabase

    if (!isEditor) {
      const redirectUrl = req.nextUrl.clone();
      redirectUrl.pathname = "/403"; // Forbidden page
      return NextResponse.redirect(redirectUrl);
    }
  }

  return res;
}

// Only run middleware on specific routes
export const config = {
  matcher: ["/admin/:path*"],
};
