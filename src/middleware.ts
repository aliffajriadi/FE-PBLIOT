import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (!token && req.nextUrl.pathname === "/login") {
    return NextResponse.next();
  }
  if (!token) {
    return NextResponse.redirect(new URL("/login?error=unauth", req.url));
  }

  const payload = JSON.parse(
    Buffer.from(token.split(".")[1], "base64").toString()
  );
  console.log("PAYLOAD:", payload);

  const role = payload.role;

  if (req.nextUrl.pathname.startsWith("/admin") && role !== "admin") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/guru") && role !== "guru") {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (req.nextUrl.pathname.startsWith("/siswa") && role !== "siswa") {
    return NextResponse.redirect(new URL("/login", req.url));
  }
  

  if (token && req.nextUrl.pathname.startsWith("/login")) {
    if (role === "admin") {
      return NextResponse.redirect(new URL("/admin", req.url));
    }
    if (role === "guru") {
      return NextResponse.redirect(new URL("/guru", req.url));
    }
    if (role === "siswa") {
      return NextResponse.redirect(new URL("/siswa", req.url));
    }
  }
  

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/guru/:path*", "/siswa/:path*", "/login"],
};
