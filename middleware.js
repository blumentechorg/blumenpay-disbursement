import { NextResponse } from "next/server";

export function middleware(req) {
  const token = req.cookies.get("authToken");
  const url = req.nextUrl.clone();

  if (!token) {
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/Explore/:path*"], // Secure only specific routes
};
