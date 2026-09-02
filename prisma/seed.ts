import { PrismaClient, CampaignStatus, SubmissionStatus } from "@prisma/client";

const prisma = new PrismaClient();

const campaigns = [
  {
    id: 1,
    name: "PSL App Campaign",
    brand: "PSL",
    description:
      "Drive app downloads and product education through short-form lifestyle storytelling across high-intent creator communities.",
    platforms: ["Instagram Reels", "TikTok"],
    creatorRequirements: "Beauty + lifestyle creators, 10k-100k following",
    audienceRequirement: "T1 audience: US women 18-34 in beauty and wellness",
    minT1Audience: 70,
    payoutRate: "$1,200 / creator",
    totalBudget: "$18,500",
    status: CampaignStatus.ACTIVE,
    deadline: "Sep 18, 2026",
    creators: 24,
    submissionCount: 18,
    creatorCriteria:
      "Beauty, skincare, and wellness creators with strong UGC and tutorial style content",
    submissionRequirements:
      "3 short-form videos, 1 in-feed story mention, link in bio, post CTA in caption",
    creatorRoster: [
      { name: "Alicia N.", status: "Pending" },
      { name: "Maya L.", status: "Approved" },
      { name: "Jade R.", status: "Review" },
    ],
    recentSubmissions: [
      { creator: "Alicia N.", status: "Pending", date: "Aug 29" },
      { creator: "Maya L.", status: "Approved", date: "Aug 27" },
      { creator: "Jade R.", status: "Review", date: "Aug 28" },
    ],
  },
  {
    id: 2,
    name: "Symmetrix Promotion",
    brand: "Symmetrix",
    description:
      "Launch a trend-led creator push across short-form discovery platforms to build retail intent and uplift product awareness.",
    platforms: ["TikTok", "Instagram Reels"],
    creatorRequirements: "Lifestyle, fashion, and creator-led product reviews",
    audienceRequirement: "T1 audience: Gen Z and millennial trend shoppers",
    minT1Audience: 65,
    payoutRate: "$900 / creator",
    totalBudget: "$12,400",
    status: CampaignStatus.REVIEW,
    deadline: "Sep 16, 2026",
    creators: 12,
    submissionCount: 7,
    creatorCriteria:
      "Fashion and lifestyle creators with high save-to-view ratios and trend responsiveness",
    submissionRequirements:
      "1 product demo, 1 testimonial angle, 1 audience hook with branded callout",
    creatorRoster: [
      { name: "Ruben T.", status: "Approved" },
      { name: "Jade R.", status: "Pending" },
      { name: "Daria H.", status: "Review" },
    ],
    recentSubmissions: [
      { creator: "Ruben T.", status: "Approved", date: "Aug 19" },
      { creator: "Jade R.", status: "Pending", date: "Aug 28" },
      { creator: "Daria H.", status: "Review", date: "Aug 25" },
    ],
  },
  {
    id: 3,
    name: "FaceIQ Launch",
    brand: "FaceIQ",
    description:
      "Support a skincare launch with tutorial-driven creator storytelling and product education to convert trust into trial.",
    platforms: ["YouTube Shorts", "Instagram Reels"],
    creatorRequirements: "Skincare and self-care creators with tutorial content",
    audienceRequirement: "T1 audience: skincare enthusiasts in beauty vertical",
    minT1Audience: 75,
    payoutRate: "$1,500 / creator",
    totalBudget: "$22,800",
    status: CampaignStatus.ACTIVE,
    deadline: "Sep 25, 2026",
    creators: 18,
    submissionCount: 14,
    creatorCriteria:
      "Skincare and beauty creators with tutorial, before/after, and routine storytelling experience",
    submissionRequirements:
      "2 educational reels, 1 close-up product demo, clear before/after sequence",
    creatorRoster: [
      { name: "Alicia N.", status: "Pending" },
      { name: "Ruben T.", status: "Pending" },
      { name: "Maya L.", status: "Approved" },
    ],
    recentSubmissions: [
      { creator: "Alicia N.", status: "Pending", date: "Aug 29" },
      { creator: "Maya L.", status: "Approved", date: "Aug 27" },
      { creator: "Ruben T.", status: "Pending", date: "Aug 08" },
    ],
  },
  {
    id: 4,
    name: "Nexa Fit Challenge",
    brand: "Nexa",
    description:
      "Run a fitness challenge campaign focused on performance, confidence, and community-led UGC around active routines.",
    platforms: ["TikTok", "YouTube Shorts"],
    creatorRequirements: "Fitness creators, workout coaches, and lifestyle storytellers",
    audienceRequirement: "T1 audience: active gym-goers and health-conscious shoppers",
    minT1Audience: 68,
    payoutRate: "$1,050 / creator",
    totalBudget: "$16,300",
    status: CampaignStatus.PAUSED,
    deadline: "Sep 12, 2026",
    creators: 16,
    submissionCount: 9,
    creatorCriteria:
      "Fitness and active lifestyle talent with strong retention and high-energy on-camera delivery",
    submissionRequirements:
      "1 transformation clip, 1 challenge prompt, 1 product integration shot",
    creatorRoster: [
      { name: "Maya L.", status: "Approved" },
      { name: "Ruben T.", status: "Review" },
      { name: "Daria H.", status: "Paused" },
    ],
    recentSubmissions: [
      { creator: "Maya L.", status: "Approved", date: "Aug 27" },
      { creator: "Ruben T.", status: "Pending", date: "Aug 20" },
      { creator: "Daria H.", status: "Paused", date: "Aug 12" },
    ],
  },
  {
    id: 5,
    name: "Verve Home Collection",
    brand: "Verve",
    description:
      "Build a home decor launch around high-save design inspiration, aspirational styling shoots, and practical room transformation content.",
    platforms: ["Instagram Reels", "Pinterest"],
    creatorRequirements: "Home decor and interior creators with high-save content",
    audienceRequirement: "T1 audience: homeowners and design-forward shoppers",
    minT1Audience: 60,
    payoutRate: "$850 / creator",
    totalBudget: "$11,900",
    status: CampaignStatus.COMPLETED,
    deadline: "Sep 02, 2026",
    creators: 10,
    submissionCount: 34,
    creatorCriteria:
      "Interior, home styling, and moodboard-led creators with strong save rate and aesthetic storytelling",
    submissionRequirements:
      "2 room reveals, 1 before/after, 1 styling breakdown with product mention",
    creatorRoster: [
      { name: "Daria H.", status: "Rejected" },
      { name: "Alicia N.", status: "Approved" },
      { name: "Ruben T.", status: "Approved" },
    ],
    recentSubmissions: [
      { creator: "Daria H.", status: "Rejected", date: "Aug 25" },
      { creator: "Alicia N.", status: "Approved", date: "Aug 12" },
      { creator: "Ruben T.", status: "Approved", date: "Jul 30" },
    ],
  },
] as const;

const creators = [
  {
    id: 1,
    name: "Alicia N.",
    username: "@alicianwell",
    avatar: "AN",
    platforms: ["Instagram", "TikTok"],
    followers: 147000,
    averageEngagement: "8.4%",
    t1Audience: "72%",
    activeCampaigns: 2,
    submissionStatus: "Excellent",
    overallStatus: "Active",
    audience: "Beauty, skincare, and wellness consumers",
    campaignHistory: [
      "FaceIQ Launch",
      "PSL App Campaign",
      "Verve Home Collection",
    ],
    recentSubmissions: [
      { title: "FaceIQ Launch", status: "Pending", date: "Aug 29" },
      { title: "PSL App Campaign", status: "Approved", date: "Aug 12" },
      { title: "Verve Home Collection", status: "Rejected", date: "Jul 07" },
    ],
    engagementMetrics: {
      avgViews: 142000,
      avgCTR: "4.8%",
      saveRate: "9.1%",
      completionRate: "68%",
    },
    notes:
      "Strong storytelling and audience trust across beauty verticals. Response quality is consistently above benchmark.",
    paymentInfo: {
      method: "Bank transfer",
      accountHolder: "Alicia N. Wells",
      identifier: "IBAN • DE89 3704 0044 0532 0130 00",
      details: "Chase checking account • Routing 021000021 • USD payouts",
    },
  },
  {
    id: 2,
    name: "Maya L.",
    username: "@mayalifts",
    avatar: "ML",
    platforms: ["TikTok", "YouTube Shorts"],
    followers: 286000,
    averageEngagement: "9.6%",
    t1Audience: "81%",
    activeCampaigns: 3,
    submissionStatus: "Strong",
    overallStatus: "Active",
    audience: "Fitness, wellness, and active lifestyle shoppers",
    campaignHistory: [
      "Nexa Fit Challenge",
      "PSL App Campaign",
      "Symmetrix Promotion",
    ],
    recentSubmissions: [
      { title: "Nexa Fit Challenge", status: "Approved", date: "Aug 27" },
      { title: "PSL App Campaign", status: "Pending", date: "Aug 18" },
      { title: "Symmetrix Promotion", status: "Approved", date: "Aug 04" },
    ],
    engagementMetrics: {
      avgViews: 213000,
      avgCTR: "5.7%",
      saveRate: "11.2%",
      completionRate: "74%",
    },
    notes:
      "Excellent retention and conversion style. Great fit for product education and challenge-driven campaigns.",
    paymentInfo: {
      method: "PayPal",
      accountHolder: "Maya L. Patel",
      identifier: "PayPal • mayalifts@paypal.com",
      details: "Business account • USD settlement preferred • tax docs on file",
    },
  },
  {
    id: 3,
    name: "Jade R.",
    username: "@jadecreates",
    avatar: "JR",
    platforms: ["TikTok", "Instagram"],
    followers: 98000,
    averageEngagement: "7.9%",
    t1Audience: "68%",
    activeCampaigns: 1,
    submissionStatus: "Review",
    overallStatus: "Review",
    audience: "Lifestyle, beauty, and creator-led product storytelling",
    campaignHistory: ["PSL App Campaign", "Symmetrix Promotion"],
    recentSubmissions: [
      { title: "PSL App Campaign", status: "Pending", date: "Aug 28" },
      { title: "Symmetrix Promotion", status: "Pending", date: "Aug 21" },
      { title: "PSL App Campaign", status: "Approved", date: "Jul 16" },
    ],
    engagementMetrics: {
      avgViews: 98000,
      avgCTR: "4.1%",
      saveRate: "8.4%",
      completionRate: "61%",
    },
    notes:
      "Content is polished and on-brand, but a few deliverables still need compliance cleanup before approval.",
    paymentInfo: {
      method: "Wise",
      accountHolder: "Jade R. Clark",
      identifier: "WISE • jadeclark@wise.com",
      details: "Multi-currency transfer • GBP + USD enabled • account verified",
    },
  },
  {
    id: 4,
    name: "Daria H.",
    username: "@dariastudio",
    avatar: "DH",
    platforms: ["Instagram"],
    followers: 116000,
    averageEngagement: "6.8%",
    t1Audience: "65%",
    activeCampaigns: 1,
    submissionStatus: "Needs work",
    overallStatus: "Paused",
    audience: "Home decor, interiors, and lifestyle shoppers",
    campaignHistory: ["Verve Home Collection", "FaceIQ Launch"],
    recentSubmissions: [
      { title: "Verve Home Collection", status: "Rejected", date: "Aug 25" },
      { title: "FaceIQ Launch", status: "Pending", date: "Aug 14" },
      { title: "Verve Home Collection", status: "Approved", date: "Jun 26" },
    ],
    engagementMetrics: {
      avgViews: 76000,
      avgCTR: "3.5%",
      saveRate: "7.6%",
      completionRate: "58%",
    },
    notes:
      "Strong aesthetic content with steady saves, but product demo clarity needs improvement for longer-term campaign fit.",
    paymentInfo: {
      method: "PayPal",
      accountHolder: "Daria H. Stone",
      identifier: "PayPal • d.stone@paypal.com",
      details: "Personal account • USD payout • backup email verified",
    },
  },
  {
    id: 5,
    name: "Ruben T.",
    username: "@rubentravel",
    avatar: "RT",
    platforms: ["YouTube Shorts", "Instagram"],
    followers: 204000,
    averageEngagement: "8.1%",
    t1Audience: "74%",
    activeCampaigns: 2,
    submissionStatus: "Good",
    overallStatus: "Active",
    audience: "Lifestyle, travel, consumer products, and trend-led shopping",
    campaignHistory: ["Symmetrix Promotion", "FaceIQ Launch"],
    recentSubmissions: [
      { title: "Symmetrix Promotion", status: "Approved", date: "Aug 19" },
      { title: "FaceIQ Launch", status: "Pending", date: "Aug 08" },
      { title: "Symmetrix Promotion", status: "Approved", date: "Jul 19" },
    ],
    engagementMetrics: {
      avgViews: 168000,
      avgCTR: "4.9%",
      saveRate: "9.3%",
      completionRate: "66%",
    },
    notes:
      "Reliable storyteller with strong product narration and good platform diversity across campaign types.",
    paymentInfo: {
      method: "Bank transfer",
      accountHolder: "Ruben T. White",
      identifier: "ACH • 123456789 • Wells Fargo",
      details: "Checking account • USD payout • account holder matches tax profile",
    },
  },
] as const;

const submissions = [
  {
    id: 1,
    creatorName: "Alicia N.",
    campaignName: "FaceIQ Launch",
    platform: "Instagram Reels",
    submittedAt: "Aug 29, 2026",
    postLink: "https://instagram.com/p/faceiq-launch-01",
    views: 142000,
    likes: 11800,
    comments: 482,
    saves: 930,
    requirementStatus: {
      brandMentions: "Pass",
      productUse: "Pass",
      CTAIncluded: "Pass",
      compliance: "Pass",
    },
    status: SubmissionStatus.PENDING,
    notes: "",
  },
  {
    id: 2,
    creatorName: "Jade R.",
    campaignName: "PSL App Campaign",
    platform: "TikTok",
    submittedAt: "Aug 28, 2026",
    postLink: "https://tiktok.com/@jade/video/psl-cta",
    views: 98000,
    likes: 8700,
    comments: 311,
    saves: 640,
    requirementStatus: {
      brandMentions: "Pass",
      productUse: "Pass",
      CTAIncluded: "Pass",
      compliance: "Needs review",
    },
    status: SubmissionStatus.PENDING,
    notes: "",
  },
  {
    id: 3,
    creatorName: "Maya L.",
    campaignName: "Nexa Fit Challenge",
    platform: "TikTok",
    submittedAt: "Aug 27, 2026",
    postLink: "https://tiktok.com/@maya/fitchallenge",
    views: 213000,
    likes: 19600,
    comments: 742,
    saves: 1520,
    requirementStatus: {
      brandMentions: "Pass",
      productUse: "Pass",
      CTAIncluded: "Pass",
      compliance: "Pass",
    },
    status: SubmissionStatus.APPROVED,
    notes: "Strong hook and clear fit alignment. Approved by review team.",
  },
  {
    id: 4,
    creatorName: "Daria H.",
    campaignName: "Verve Home Collection",
    platform: "Instagram Reels",
    submittedAt: "Aug 25, 2026",
    postLink: "https://instagram.com/p/verve-home-collection",
    views: 76000,
    likes: 6100,
    comments: 202,
    saves: 510,
    requirementStatus: {
      brandMentions: "Pass",
      productUse: "Fail",
      CTAIncluded: "Pass",
      compliance: "Pass",
    },
    status: SubmissionStatus.REJECTED,
    notes: "Product usage was not visible in the posted content.",
  },
] as const;

const payouts = [
  {
    id: 1,
    creator: "Alicia N.",
    campaign: "FaceIQ Launch",
    amount: "$1,240.00",
    paymentMethod: "Bank transfer",
    status: "Pending",
    date: "Aug 29, 2026",
    notes: "Awaiting final review confirmation for August deliverables.",
    paymentHistory: [
      { label: "Base payout", value: "$980.00" },
      { label: "Bonus", value: "$160.00" },
      { label: "Taxes", value: "$100.00" },
    ],
    creatorInfo: {
      username: "@alicianwell",
      platform: "Instagram / TikTok",
      totalEarnings: "$4,870.00",
    },
    paymentInfo: {
      method: "Bank transfer",
      accountHolder: "Alicia N. Wells",
      identifier: "IBAN • DE89 3704 0044 0532 0130 00",
      details: "Chase checking account • Routing 021000021 • USD payouts",
    },
  },
  {
    id: 2,
    creator: "Maya L.",
    campaign: "Nexa Fit Challenge",
    amount: "$1,680.00",
    paymentMethod: "PayPal",
    status: "Processing",
    date: "Aug 27, 2026",
    notes: "Payment queued for transfer; vendor verification in progress.",
    paymentHistory: [
      { label: "Base payout", value: "$1,420.00" },
      { label: "Bonus", value: "$220.00" },
      { label: "Taxes", value: "$40.00" },
    ],
    creatorInfo: {
      username: "@mayalifts",
      platform: "TikTok / YouTube",
      totalEarnings: "$7,120.00",
    },
    paymentInfo: {
      method: "PayPal",
      accountHolder: "Maya L. Patel",
      identifier: "PayPal • mayalifts@paypal.com",
      details: "Business account • USD settlement preferred • tax docs on file",
    },
  },
  {
    id: 3,
    creator: "Ruben T.",
    campaign: "Symmetrix Promotion",
    amount: "$890.00",
    paymentMethod: "Wise",
    status: "Paid",
    date: "Aug 19, 2026",
    notes: "Payment successfully processed and sent to creator wallet.",
    paymentHistory: [
      { label: "Base payout", value: "$760.00" },
      { label: "Bonus", value: "$120.00" },
      { label: "Taxes", value: "$10.00" },
    ],
    creatorInfo: {
      username: "@rubentravel",
      platform: "YouTube / Instagram",
      totalEarnings: "$6,330.00",
    },
    paymentInfo: {
      method: "Bank transfer",
      accountHolder: "Ruben T. White",
      identifier: "ACH • 123456789 • Wells Fargo",
      details: "Checking account • USD payout • account holder matches tax profile",
    },
  },
  {
    id: 4,
    creator: "Jade R.",
    campaign: "PSL App Campaign",
    amount: "$960.00",
    paymentMethod: "Bank transfer",
    status: "Failed",
    date: "Aug 18, 2026",
    notes: "Bank transfer rejected due to account mismatch; payment retry required.",
    paymentHistory: [
      { label: "Base payout", value: "$820.00" },
      { label: "Bonus", value: "$140.00" },
      { label: "Taxes", value: "$0.00" },
    ],
    creatorInfo: {
      username: "@jadecreates",
      platform: "TikTok / Instagram",
      totalEarnings: "$3,910.00",
    },
    paymentInfo: {
      method: "Wise",
      accountHolder: "Jade R. Clark",
      identifier: "WISE • jadeclark@wise.com",
      details: "Multi-currency transfer • GBP + USD enabled • account verified",
    },
  },
  {
    id: 5,
    creator: "Daria H.",
    campaign: "Verve Home Collection",
    amount: "$760.00",
    paymentMethod: "PayPal",
    status: "Pending",
    date: "Aug 17, 2026",
    notes: "Waiting for campaign close-out confirmation and final review signoff.",
    paymentHistory: [
      { label: "Base payout", value: "$640.00" },
      { label: "Bonus", value: "$100.00" },
      { label: "Taxes", value: "$20.00" },
    ],
    creatorInfo: {
      username: "@dariastudio",
      platform: "Instagram",
      totalEarnings: "$2,940.00",
    },
    paymentInfo: {
      method: "PayPal",
      accountHolder: "Daria H. Stone",
      identifier: "PayPal • d.stone@paypal.com",
      details: "Personal account • USD payout • backup email verified",
    },
  },
] as const;

async function main() {
  await prisma.submission.deleteMany();
  await prisma.payout.deleteMany();
  await prisma.campaign.deleteMany();
  await prisma.creator.deleteMany();

  const createdCampaignMap = new Map<string, { id: number }>();
  for (const campaign of campaigns) {
    const created = await prisma.campaign.create({
      data: {
        name: campaign.name,
        brand: campaign.brand,
        description: campaign.description,
        platforms: [...campaign.platforms],
        creatorRequirements: campaign.creatorRequirements,
        audienceRequirement: campaign.audienceRequirement,
        minT1Audience: campaign.minT1Audience,
        payoutRate: campaign.payoutRate,
        totalBudget: campaign.totalBudget,
        status: campaign.status,
        deadline: campaign.deadline,
        creators: campaign.creators,
        submissionCount: campaign.submissionCount,
        creatorCriteria: campaign.creatorCriteria,
        submissionRequirements: campaign.submissionRequirements,
        creatorRoster: campaign.creatorRoster as any,
        recentSubmissions: campaign.recentSubmissions as any,
      },
    });

    createdCampaignMap.set(campaign.name, { id: created.id });
  }

  const createdCreatorMap = new Map<string, { id: number }>();
  for (const creator of creators) {
    const created = await prisma.creator.create({
      data: {
        name: creator.name,
        username: creator.username,
        avatar: creator.avatar,
        platforms: [...creator.platforms],
        followers: creator.followers,
        averageEngagement: creator.averageEngagement,
        t1Audience: creator.t1Audience,
        activeCampaigns: creator.activeCampaigns,
        submissionStatus: creator.submissionStatus,
        overallStatus: creator.overallStatus,
        audience: creator.audience,
        campaignHistory: [...creator.campaignHistory],
        recentSubmissions: creator.recentSubmissions as any,
        engagementMetrics: creator.engagementMetrics as any,
        notes: creator.notes,
        paymentInfo: creator.paymentInfo as any,
      },
    });

    createdCreatorMap.set(creator.name, { id: created.id });
  }

  for (const submission of submissions) {
    const creator = createdCreatorMap.get(submission.creatorName);
    const campaign = createdCampaignMap.get(submission.campaignName);

    if (!creator || !campaign) {
      throw new Error(`Missing creator or campaign for submission: ${submission.creatorName} / ${submission.campaignName}`);
    }

    await prisma.submission.create({
      data: {
        creatorId: creator.id,
        campaignId: campaign.id,
        creatorName: submission.creatorName,
        campaignName: submission.campaignName,
        platform: submission.platform,
        submittedAt: submission.submittedAt,
        postLink: submission.postLink,
        views: submission.views,
        likes: submission.likes,
        comments: submission.comments,
        saves: submission.saves,
        requirementStatus: submission.requirementStatus as any,
        status: submission.status,
        notes: submission.notes,
      },
    });
  }

  for (const payout of payouts) {
    const creator = createdCreatorMap.get(payout.creator);
    const campaign = createdCampaignMap.get(payout.campaign);

    if (!creator) {
      throw new Error(`Missing creator for payout: ${payout.creator}`);
    }

    await prisma.payout.create({
      data: {
        creatorId: creator.id,
        campaignId: campaign?.id ?? null,
        creatorName: payout.creator,
        campaignName: payout.campaign,
        amount: payout.amount,
        paymentMethod: payout.paymentMethod,
        status: payout.status,
        date: payout.date,
        notes: payout.notes,
        paymentHistory: payout.paymentHistory as any,
        creatorInfo: payout.creatorInfo as any,
        paymentInfo: payout.paymentInfo as any,
      },
    });
  }

  console.log("Seed data inserted successfully.");
}

main()
  .catch((error) => {
    console.error("Seed failed:", error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
