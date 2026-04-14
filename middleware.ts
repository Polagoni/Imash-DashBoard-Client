import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const token = request.cookies.get("token")?.value;
  const role = request.cookies.get("role")?.value;

  const path = request.nextUrl.pathname;

  console.log("token:", token);
  console.log("role:", role);
  console.log("path:", path);

  // 1️⃣ If NOT logged in → block protected pages
  if (!token) {
    if (path.startsWith("/dashboard") || (path.startsWith("/admin") && !path.startsWith("/adminlogin"))) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  }

  // 2️⃣ Logged user trying login page
  if (token && (path === "/" || path.startsWith("/userlogin"))) {

    if (role === "admin") {
      return NextResponse.redirect(new URL("/admindashboard", request.url));
    }

    if (role === "user") {
      return NextResponse.redirect(new URL("/dashboard", request.url));
    }
  }

  // 3️⃣ Admin should NOT access user pages
  if (token && role === "admin" && path.startsWith("/dashboard")) {
    return NextResponse.redirect(new URL("/admin", request.url));
  }

  // 4️⃣ User should NOT access admin pages
  if (token && role === "user" && path.startsWith("/admin")) {
    return NextResponse.redirect(new URL("/dashboard", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    "/",
    "/userlogin",
    "/register",
    "/dashboard/:path*",
    "/admin/:path*",
  ],
};