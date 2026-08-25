import { NextResponse } from "next/server";
import { Prisma } from "@prisma/client";
import { prisma } from "@/lib/db";
import { isValidEmail, normalizeEmail } from "@/lib/validation";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(request: Request) {
  if (!rateLimit(`waitlist:${clientIp(request.headers)}`, 5, 10 * 60 * 1000)) {
    return NextResponse.json(
      { status: "error", message: "Too many attempts. Please try again later." },
      { status: 429 },
    );
  }

  let email = "";
  try {
    const body = await request.json();
    email = normalizeEmail(body?.email);
  } catch {
    email = "";
  }

  if (!isValidEmail(email)) {
    return NextResponse.json(
      { status: "invalid", message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  try {
    await prisma.waitlistLead.create({ data: { email } });
    return NextResponse.json({ status: "joined" }, { status: 201 });
  } catch (error) {
    if (error instanceof Prisma.PrismaClientKnownRequestError && error.code === "P2002") {
      return NextResponse.json({ status: "duplicate" }, { status: 200 });
    }
    console.error("waitlist: failed to store lead", error);
    return NextResponse.json(
      { status: "error", message: "Something went wrong. Please try again." },
      { status: 500 },
    );
  }
}
