import {
  adminProtectedRoutes,
  protectedRoutes,
  publicRoutes,
} from "@/routes/route";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

export function middleware(req: NextRequest) {
  const userId = req.cookies.get("userId")?.value;
  const role = req.cookies.get("role")?.value;

  const redirectToLogin = () => {
    req.cookies.delete("userId");
    req.cookies.delete("role");

    const response = NextResponse.redirect(new URL("/auth/login", req.url));
    // response.cookies.delete("userId");

    return response;
  };

  // Accessing client-only route
  if (
    protectedRoutes.some(
      (route) =>
        req.nextUrl.pathname.startsWith(route) ||
        req.nextUrl.pathname.endsWith("payment")
    ) &&
    (!userId || role !== "user")
  ) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin/dashboard", req.url));
    }
    return redirectToLogin();
  }

  if (
    adminProtectedRoutes.some((route) =>
      req.nextUrl.pathname.startsWith(route)
    ) &&
    (!userId || role !== "admin")
  ) {
    if (role === "user") {
      return NextResponse.redirect(new URL("/", req.url));
    }
    return redirectToLogin();
  }

  if (publicRoutes.some((route) => req.nextUrl.pathname.startsWith(route))) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    return;
  }
}
