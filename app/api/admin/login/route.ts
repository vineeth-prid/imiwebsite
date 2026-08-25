import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import { createSessionToken, SESSION_COOKIE, sessionCookieOptions } from "@/lib/auth";
import { normalizeEmail } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

const invalid = () => NextResponse.json({ error: "Invalid email or password." }, { status: 401 });

export async function POST(request: Request) {
  if (!rateLimit(`login:${clientIp(request.headers)}`, 10, 10 * 60 * 1000)) {
    return NextResponse.json({ error: "Too many attempts. Please try again later." }, { status: 429 });
  }

  let email = "";
  let password = "";
  try {
    const body = await request.json();
    email = normalizeEmail(body?.email);
    password = typeof body?.password === "string" ? body.password : "";
  } catch {
    return invalid();
  }

  const adminEmail = normalizeEmail(process.env.ADMIN_EMAIL);
  const adminHash = process.env.ADMIN_PASSWORD_HASH;
  if (!adminEmail || !adminHash?.startsWith("$2")) {
    console.error(
      "admin login: ADMIN_EMAIL / ADMIN_PASSWORD_HASH are missing or malformed. " +
        "The hash must be a bcrypt string; escape its $ characters in .env (npm run admin:hash).",
    );
    return NextResponse.json({ error: "Something went wrong. Please try again." }, { status: 500 });
  }

  // Always run the compare so a wrong email and a wrong password cost the same.
  const passwordOk = await bcrypt.compare(password, adminHash);
  if (email !== adminEmail || !passwordOk) return invalid();

  const response = NextResponse.json({ ok: true });
  response.cookies.set(SESSION_COOKIE, await createSessionToken(adminEmail), sessionCookieOptions);
  return response;
}
