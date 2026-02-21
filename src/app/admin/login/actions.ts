"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import crypto from "crypto";

const ADMIN_COOKIE = "admin_session";

function getToken(password: string, date: string): string {
  return crypto
    .createHash("sha256")
    .update(password + ":" + date)
    .digest("hex");
}

export async function login(formData: FormData) {
  const password = process.env.ADMIN_PASSWORD;
  const input = formData.get("password") as string | null;
  if (!password || !input || input !== password) {
    return { error: "Pogrešna lozinka." };
  }
  const date = new Date().toISOString().slice(0, 10);
  const token = getToken(password, date);
  const store = await cookies();
  store.set(ADMIN_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24,
    path: "/",
  });
  redirect("/admin");
}
