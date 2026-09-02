import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
  try {
    const campaigns = await prisma.campaign.findMany({
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(campaigns);
  } catch (error) {
    console.error("Failed to fetch campaigns:", error);

    return NextResponse.json(
      { error: "Failed to fetch campaigns" },
      { status: 500 }
    );
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const campaign = await prisma.campaign.create({
      data: {
        name: body.name,
        brand: body.brand,
        description: body.description,
        platforms: body.platforms || [],
        creatorRequirements: body.creatorRequirements,
        audienceRequirement: body.audienceRequirement,
        minT1Audience: body.minT1Audience,
        payoutRate: body.payoutRate,
        totalBudget: body.totalBudget,
        status: body.status?.toUpperCase() || "REVIEW",
        deadline: body.deadline,
        creators: body.creators,
        submissionCount: body.submissionCount,
        creatorCriteria: body.creatorCriteria,
        submissionRequirements: body.submissionRequirements,
      },
    });

    return NextResponse.json(campaign, { status: 201 });
  } catch (error) {
    console.error("Failed to create campaign:", error);

    return NextResponse.json(
      { error: "Failed to create campaign" },
      { status: 500 }
    );
  }
}