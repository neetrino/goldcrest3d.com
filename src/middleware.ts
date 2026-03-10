import { auth } from "@/lib/auth";
import { NextResponse } from "next/server";

export default auth((req) => {
  const path = req.nextUrl.pathname;
  if (path.startsWith("/api")) return NextResponse.next();

  const isLoggedIn = !!req.auth;
  const isAuthPage = path.startsWith("/auth");
  const isAdminPage = path.startsWith("/admin");

  if (isAdminPage && !isLoggedIn) {
    return NextResponse.redirect(new URL("/auth/signin", req.nextUrl));
  }
  if (isAuthPage && isLoggedIn) {
    return NextResponse.redirect(new URL("/admin/leads", req.nextUrl));
  }
  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico|.*\\..*).*)"],
};
