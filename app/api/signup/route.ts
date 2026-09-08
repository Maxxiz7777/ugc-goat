import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { randomBytes, scrypt } from "crypto";
import { promisify } from "util";
import { createSession } from "@/lib/session";

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
      where: { email: email.trim() },
    });

    if (existingUser) {
      return NextResponse.json(
        { error: "An account with this email already exists." },
        { status: 409 }
      );
    }

    const existingCreator = await prisma.creator.findUnique({
      where: { username: username.trim() },
    });

    if (existingCreator) {
      return NextResponse.json(
        { error: "That username is already taken." },
        { status: 409 }
      );
    }

    const salt = randomBytes(16).toString("hex");

    const derivedKey = (await scryptAsync(
      password,
      salt,
      64
    )) as Buffer;

    const passwordHash = `${salt}:${derivedKey.toString("hex")}`;

    const user = await prisma.user.create({
      data: {
        email: email.trim(),
        name: name.trim(),
        passwordHash,
        role: "CREATOR",
      },
    });

    await prisma.creator.create({
      data: {
        userId: user.id,
        name: name.trim(),
        username: username.trim(),
        platforms: [],
        followers: 0,
      },
    });

    const sessionToken = await createSession(user.id, user.role);

    const response = NextResponse.json({
      success: true,
      message: "Creator account created successfully.",
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
    console.error("Signup error:", error);

    return NextResponse.json(
      { error: "Something went wrong. Please try again." },
      { status: 500 }
    );
  }
}