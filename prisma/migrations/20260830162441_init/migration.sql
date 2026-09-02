-- CreateEnum
CREATE TYPE "CampaignStatus" AS ENUM ('DRAFT', 'REVIEW', 'ACTIVE', 'PAUSED', 'COMPLETED');

-- CreateEnum
CREATE TYPE "SubmissionStatus" AS ENUM ('PENDING', 'REVIEW', 'APPROVED', 'REJECTED', 'PAUSED');

-- CreateEnum
CREATE TYPE "RequirementStatus" AS ENUM ('PASS', 'FAIL', 'NEEDS_REVIEW');

-- CreateTable
CREATE TABLE "Campaign" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "brand" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "platforms" TEXT[],
    "creatorRequirements" TEXT,
    "audienceRequirement" TEXT,
    "minT1Audience" INTEGER,
    "payoutRate" TEXT,
    "totalBudget" TEXT,
    "status" "CampaignStatus" NOT NULL DEFAULT 'REVIEW',
    "deadline" TEXT,
    "creators" INTEGER,
    "submissionCount" INTEGER,
    "creatorCriteria" TEXT,
    "submissionRequirements" TEXT,
    "creatorRoster" JSONB,
    "recentSubmissions" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Campaign_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Creator" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "username" TEXT NOT NULL,
    "avatar" TEXT,
    "platforms" TEXT[],
    "followers" INTEGER,
    "averageEngagement" TEXT,
    "t1Audience" TEXT,
    "activeCampaigns" INTEGER DEFAULT 0,
    "submissionStatus" TEXT,
    "overallStatus" TEXT,
    "audience" TEXT,
    "campaignHistory" TEXT[],
    "recentSubmissions" JSONB,
    "engagementMetrics" JSONB,
    "notes" TEXT,
    "paymentInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Creator_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Submission" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "campaignId" INTEGER NOT NULL,
    "creatorName" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "platform" TEXT NOT NULL,
    "submittedAt" TEXT NOT NULL,
    "postLink" TEXT,
    "views" INTEGER,
    "likes" INTEGER,
    "comments" INTEGER,
    "saves" INTEGER,
    "requirementStatus" JSONB NOT NULL,
    "status" "SubmissionStatus" NOT NULL DEFAULT 'PENDING',
    "notes" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Submission_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Payout" (
    "id" SERIAL NOT NULL,
    "creatorId" INTEGER NOT NULL,
    "campaignId" INTEGER,
    "creatorName" TEXT NOT NULL,
    "campaignName" TEXT NOT NULL,
    "amount" TEXT NOT NULL,
    "paymentMethod" TEXT NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'Pending',
    "date" TEXT NOT NULL,
    "notes" TEXT,
    "paymentHistory" JSONB,
    "creatorInfo" JSONB,
    "paymentInfo" JSONB,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Payout_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Creator_username_key" ON "Creator"("username");

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Submission" ADD CONSTRAINT "Submission_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_creatorId_fkey" FOREIGN KEY ("creatorId") REFERENCES "Creator"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Payout" ADD CONSTRAINT "Payout_campaignId_fkey" FOREIGN KEY ("campaignId") REFERENCES "Campaign"("id") ON DELETE SET NULL ON UPDATE CASCADE;
