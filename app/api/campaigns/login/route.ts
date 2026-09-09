import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { scrypt } from "crypto";
import { promisify } from "util";

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

    if (!user) {
      return NextResponse.json(
        { error: "Invalid email or password." },
        { status: 401 }
      );
    }

    if (!user.passwordHash) {
      return NextResponse.json(
        { error: "This account needs a password before you can log in." },
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

    return NextResponse.json({
      success: true,
      role: user.role,
      name: user.name,
    });
  } catch (error) {
    console.error("Login error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}