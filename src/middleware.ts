import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const ADMIN_COOKIE = "admin_session";

async function getExpectedToken(password: string, date: string): Promise<string> {
  const data = new TextEncoder().encode(password + ":" + date);
  const hash = await crypto.subtle.digest("SHA-256", data);
  return Array.from(new Uint8Array(hash))
    .map((b) => b.toString(16).padStart(2, "0"))
    .join("");
}

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  if (!pathname.startsWith("/admin")) return NextResponse.next();
  if (pathname === "/admin/login") return NextResponse.next();

  const rawPassword = process.env.ADMIN_PASSWORD;
  const password = typeof rawPassword === "string" ? rawPassword.trim() : "";
  const cookie = request.cookies.get(ADMIN_COOKIE)?.value;
  const date = new Date().toISOString().slice(0, 10); // YYYY-MM-DD
  const expected = password ? await getExpectedToken(password, date) : "";

  if (!expected || cookie !== expected) {
    const login = new URL("/admin/login", request.url);
    return NextResponse.redirect(login);
  }
  return NextResponse.next();
}
