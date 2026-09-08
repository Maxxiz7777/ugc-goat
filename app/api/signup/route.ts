import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
const scryptAsync = promisify(scrypt);
export async function POST(request: Request) {
  try {
    const { name, username, email, password } = await request.json();

    if (!name || !username || !email || !password) {
      return NextResponse.json(
        { error: "All fields are required." },
        { status: 400 }
      );
    }

    if (password.length < 6) {
      return NextResponse.json(
        { error: "Password must be at least 6 characters." },
        { status: 400 }
      );
    }

    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const existingCreator = await prisma.creator.findUnique({
      where: { username },
    });

    if (existingCreator) {
      return NextResponse.json(
        { error: "That username is already taken." },
        { status: 409 }
      );
    }

    const salt = randomBytes(16).toString("hex");

const derivedKey = (await scryptAsync(password, salt, 64)) as Buffer;

const passwordHash = `${salt}:${derivedKey.toString("hex")}`;

    const user = await prisma.user.create({
      data: {
        email,
        name,
        passwordHash,
        role: "CREATOR",
      },
    });

    await prisma.creator.create({
      data: {
        userId: user.id,
        name,
        username,
        platforms: [],
        followers: 0,
      },
    });

    return NextResponse.json({
      success: true,
      message: "Creator account created successfully.",
    });
  } catch (error) {
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}