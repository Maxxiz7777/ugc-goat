import { NextRequest, NextResponse } from "next/server";
import { verifySession } from "@/lib/session";

export async function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  const isCreatorRoute = pathname.startsWith("/creator");
  const isAdminRoute = pathname.startsWith("/admin");

  if (!isCreatorRoute && !isAdminRoute) {
    return NextResponse.next();
  }

  const token = request.cookies.get("session")?.value;

  if (!token) {
    return NextResponse.redirect(new URL("/login", request.url));
  }

  try {
    const session = await verifySession(token);

    if (isCreatorRoute && session.role !== "CREATOR") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    if (isAdminRoute && session.role !== "ADMIN") {
      return NextResponse.redirect(new URL("/login", request.url));
    }

    return NextResponse.next();
  } catch {
    return NextResponse.redirect(new URL("/login", request.url));
  }
}

export const config = {
  matcher: ["/creator/:path*", "/admin/:path*"],
};