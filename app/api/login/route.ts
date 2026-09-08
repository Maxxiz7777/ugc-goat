import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrypt } from "crypto";
import { promisify } from "util";
import { createSession } from "@/lib/session";

const scryptAsync = promisify(scrypt);

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    if (!email || !password) {
      return NextResponse.json(
        { error: "Email and password are required." },
        { status: 400 }
      );
    }

    const user = await prisma.user.findUnique({
      where: {
        email: email.trim(),
      },
    });

    if (!user || !user.passwordHash) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const [salt, storedKey] = user.passwordHash.split(":");

    if (!salt || !storedKey) {
      return NextResponse.json(
        { error: "Invalid account password data." },
        { status: 500 }
      );
    }

    const derivedKey = (await scryptAsync(
      password,
      salt,
      64
    )) as Buffer;

    if (derivedKey.toString("hex") !== storedKey) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    const sessionToken = await createSession(user.id, user.role);

    const response = NextResponse.json({
      success: true,
      role: user.role,
      name: user.name,
    });

    response.cookies.set("session", sessionToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 60 * 60 * 24 * 7,
      path: "/",
    });

    return response;
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}