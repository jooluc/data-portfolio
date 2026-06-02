import { NextRequest, NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const { pathname } = req.nextUrl;

  if (pathname.startsWith("/cv")) {
    const cookie = req.cookies.get("cv_access");
    const token = process.env.CV_TOKEN ?? "granted";

    if (!cookie || cookie.value !== token) {
      const url = req.nextUrl.clone();
      url.pathname = "/cv/login";
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/cv/:path*"],
};