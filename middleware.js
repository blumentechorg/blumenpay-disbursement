import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("accessToken");

  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/auth/login";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Explore/:path*"], // Secure only specific routes
};
