import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { verifySession } from "@/lib/session";

async function getSession(request: Request) {
  const cookieHeader = request.headers.get("cookie");

  const sessionToken = cookieHeader
    ?.split(";")
    .find((cookie) => cookie.trim().startsWith("session="))
    ?.split("=")[1];

  if (!sessionToken) {
    return null;
  }

  try {
    return await verifySession(sessionToken);
  } catch {
    return null;
  }
}

export async function GET(request: Request) {
  try {
    const session = await getSession(request);

    if (!session || session.role !== "CREATOR") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const creator = await prisma.creator.findUnique({
      where: {
        userId: session.userId,
      },
    });

    if (!creator) {
      return NextResponse.json(
        { error: "Creator profile not found." },
        { status: 404 }
      );
    }

    const applications = await prisma.application.findMany({
      where: {
        creatorId: creator.id,
      },
      include: {
        campaign: true,
      },
      orderBy: {
        appliedAt: "desc",
      },
    });

    return NextResponse.json(applications);
  } catch (error) {
    console.error("Failed to fetch applications:", error);

    return NextResponse.json(
      { error: "Failed to fetch applications." },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const session = await getSession(request);

    if (!session || session.role !== "CREATOR") {
      return NextResponse.json(
        { error: "Unauthorized." },
        { status: 401 }
      );
    }

    const body = await request.json();
    const campaignId = Number(body.campaignId);

    if (!campaignId || Number.isNaN(campaignId)) {
      return NextResponse.json(
        { error: "A valid campaign ID is required." },
        { status: 400 }
      );
    }

    const creator = await prisma.creator.findUnique({
      where: {
        userId: session.userId,
      },
    });

    if (!creator) {
      return NextResponse.json(
        { error: "Creator profile not found." },
        { status: 404 }
      );
    }

    const campaign = await prisma.campaign.findUnique({
      where: {
        id: campaignId,
      },
    });

    if (!campaign) {
      return NextResponse.json(
        { error: "Campaign not found." },
        { status: 404 }
      );
    }

    if (campaign.status !== "ACTIVE") {
      return NextResponse.json(
        { error: "This campaign is not currently accepting applications." },
        { status: 400 }
      );
    }

    const existingApplication = await prisma.application.findUnique({
      where: {
        creatorId_campaignId: {
          creatorId: creator.id,
          campaignId: campaign.id,
        },
      },
    });

    if (existingApplication) {
      return NextResponse.json(
        {
          error: "You have already applied to this campaign.",
          application: existingApplication,
        },
        { status: 409 }
      );
    }

    const application = await prisma.application.create({
      data: {
        creatorId: creator.id,
        campaignId: campaign.id,
        status: "PENDING",
      },
      include: {
        campaign: true,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Application submitted successfully.",
        application,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Failed to create application:", error);

    return NextResponse.json(
      { error: "Failed to submit application." },
      { status: 500 }
    );
  }
}