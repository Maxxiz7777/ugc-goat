import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

export async function GET(request: Request) {
  try {
    const cookieHeader = request.headers.get("cookie");

    const sessionToken = cookieHeader
      ?.split(";")
      .find((cookie) => cookie.trim().startsWith("session="))
      ?.split("=")[1];

    if (!sessionToken) {
      return NextResponse.json(
        { error: "Not authenticated." },
        { status: 401 }
      );
    }

    const session = await verifySession(sessionToken);

    const user = await prisma.user.findUnique({
      where: {
        id: session.userId,
      },
      include: {
        creator: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "User not found." },
        { status: 404 }
      );
    }

    return NextResponse.json({
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      creator: user.creator,
    });
  } catch (error) {
    console.error("Me API error:", error);

    return NextResponse.json(
      { error: "Invalid or expired session." },
      { status: 401 }
    );
  }
}