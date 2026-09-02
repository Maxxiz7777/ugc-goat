"use client";

import { useEffect, useMemo, useState } from "react";

const navigation = ["Overview", "Campaigns", "Creators", "Submissions", "Payouts"];
const creatorNavigation = ["Discover Campaigns", "My Campaigns", "My Submissions", "Earnings", "Profile"];

const stats = [
  { label: "Active campaigns", value: "12", change: "+3 this month" },
  { label: "Total creators", value: "248", change: "+28 new" },
  { label: "Pending submissions", value: "36", change: "8 need approval" },
  { label: "Gross engagement", value: "8.4M", change: "+14.2%" },
];

const recentActivity = [
  { title: "PSL App Campaign", detail: "3 new creator submissions were approved", time: "12 min ago" },
  { title: "Symmetrix Promotion", detail: "Brand brief was updated by marketing", time: "1 hour ago" },
  { title: "FaceIQ Launch", detail: "Creator payout batch is ready for review", time: "4 hours ago" },
  { title: "Creator outreach", detail: "25 new applications came in from beauty creators", time: "Today" },
];

const pendingSubmissions = [
  { name: "Alicia N.", campaign: "FaceIQ Launch", score: "92%" },
  { name: "Jade R.", campaign: "PSL App Campaign", score: "88%" },
  { name: "Mara S.", campaign: "Symmetrix Promotion", score: "94%" },
];

const creatorPerformance = [
  { name: "Alicia N.", niche: "Beauty", content: "42 videos", conversion: "8.6%", payout: "$1,240" },
  { name: "Ruben T.", niche: "Lifestyle", content: "31 videos", conversion: "6.9%", payout: "$890" },
  { name: "Maya L.", niche: "Fitness", content: "58 videos", conversion: "9.1%", payout: "$1,670" },
  { name: "Daria H.", niche: "Skincare", content: "26 videos", conversion: "7.4%", payout: "$760" },
];

const initialCampaigns = [
  {
    id: 1,
    name: "PSL App Campaign",
    brand: "PSL",
    description: "Drive app downloads and product education through short-form lifestyle storytelling across high-intent creator communities.",
    platforms: ["Instagram Reels", "TikTok"],
    creatorRequirements: "Beauty + lifestyle creators, 10k-100k following",
    audienceRequirement: "T1 audience: US women 18-34 in beauty and wellness",
    minT1Audience: 70,
    payoutRate: "$1,200 / creator",
    totalBudget: "$18,500",
    status: "Active",
    deadline: "Sep 18, 2026",
    creators: 24,
    submissions: 18,
    creatorCriteria: "Beauty, skincare, and wellness creators with strong UGC and tutorial style content",
    submissionRequirements: "3 short-form videos, 1 in-feed story mention, link in bio, post CTA in caption",
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
    description: "Launch a trend-led creator push across short-form discovery platforms to build retail intent and uplift product awareness.",
    platforms: ["TikTok", "Instagram Reels"],
    creatorRequirements: "Lifestyle, fashion, and creator-led product reviews",
    audienceRequirement: "T1 audience: Gen Z and millennial trend shoppers",
    minT1Audience: 65,
    payoutRate: "$900 / creator",
    totalBudget: "$12,400",
    status: "Review",
    deadline: "Sep 16, 2026",
    creators: 12,
    submissions: 7,
    creatorCriteria: "Fashion and lifestyle creators with high save-to-view ratios and trend responsiveness",
    submissionRequirements: "1 product demo, 1 testimonial angle, 1 audience hook with branded callout",
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
    description: "Support a skincare launch with tutorial-driven creator storytelling and product education to convert trust into trial.",
    platforms: ["YouTube Shorts", "Instagram Reels"],
    creatorRequirements: "Skincare and self-care creators with tutorial content",
    audienceRequirement: "T1 audience: skincare enthusiasts in beauty vertical",
    minT1Audience: 75,
    payoutRate: "$1,500 / creator",
    totalBudget: "$22,800",
    status: "Active",
    deadline: "Sep 25, 2026",
    creators: 18,
    submissions: 14,
    creatorCriteria: "Skincare and beauty creators with tutorial, before/after, and routine storytelling experience",
    submissionRequirements: "2 educational reels, 1 close-up product demo, clear before/after sequence",
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
    description: "Run a fitness challenge campaign focused on performance, confidence, and community-led UGC around active routines.",
    platforms: ["TikTok", "YouTube Shorts"],
    creatorRequirements: "Fitness creators, workout coaches, and lifestyle storytellers",
    audienceRequirement: "T1 audience: active gym-goers and health-conscious shoppers",
    minT1Audience: 68,
    payoutRate: "$1,050 / creator",
    totalBudget: "$16,300",
    status: "Paused",
    deadline: "Sep 12, 2026",
    creators: 16,
    submissions: 9,
    creatorCriteria: "Fitness and active lifestyle talent with strong retention and high-energy on-camera delivery",
    submissionRequirements: "1 transformation clip, 1 challenge prompt, 1 product integration shot",
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
    description: "Build a home decor launch around high-save design inspiration, aspirational styling shoots, and practical room transformation content.",
    platforms: ["Instagram Reels", "Pinterest"],
    creatorRequirements: "Home decor and interior creators with high-save content",
    audienceRequirement: "T1 audience: homeowners and design-forward shoppers",
    minT1Audience: 60,
    payoutRate: "$850 / creator",
    totalBudget: "$11,900",
    status: "Completed",
    deadline: "Sep 02, 2026",
    creators: 10,
    submissions: 34,
    creatorCriteria: "Interior, home styling, and moodboard-led creators with strong save rate and aesthetic storytelling",
    submissionRequirements: "2 room reveals, 1 before/after, 1 styling breakdown with product mention",
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
];

const createCampaignDefaults = {
  name: "",
  brand: "",
  description: "",
  platforms: ["Instagram Reels"],
  payoutRate: "",
  totalBudget: "",
  status: "Review",
  deadline: "",
  maxCreators: "",
  creatorCriteria: "",
  minT1Audience: "60",
  submissionRequirements: "",
};

const initialSubmissions = [
  {
    id: 1,
    creatorName: "Alicia N.",
    campaign: "FaceIQ Launch",
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
    status: "Pending",
    notes: "",
  },
  {
    id: 2,
    creatorName: "Jade R.",
    campaign: "PSL App Campaign",
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
    status: "Pending",
    notes: "",
  },
  {
    id: 3,
    creatorName: "Maya L.",
    campaign: "Nexa Fit Challenge",
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
    status: "Approved",
    notes: "Strong hook and clear fit alignment. Approved by review team.",
  },
  {
    id: 4,
    creatorName: "Daria H.",
    campaign: "Verve Home Collection",
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
    status: "Rejected",
    notes: "Product usage was not visible in the posted content.",
  },
];

type CreatorPaymentInfo = {
  method: string;
  accountHolder: string;
  identifier: string;
  details: string;
  email?: string;
  bankName?: string;
  accountNumber?: string;
  routingNumber?: string;
  swiftBic?: string;
};

const initialCreators: Array<{
  id: number;
  name: string;
  username: string;
  avatar: string;
  platforms: string[];
  followers: number;
  averageEngagement: string;
  t1Audience: string;
  activeCampaigns: number;
  submissionStatus: string;
  overallStatus: string;
  audience: string;
  campaignHistory: string[];
  recentSubmissions: Array<{ title: string; status: string; date: string }>;
  engagementMetrics: {
    avgViews: number;
    avgCTR: string;
    saveRate: string;
    completionRate: string;
  };
  notes: string;
  paymentInfo: CreatorPaymentInfo;
}> = [
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
    notes: "Strong storytelling and audience trust across beauty verticals. Response quality is consistently above benchmark.",
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
    notes: "Excellent retention and conversion style. Great fit for product education and challenge-driven campaigns.",
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
    campaignHistory: [
      "PSL App Campaign",
      "Symmetrix Promotion",
    ],
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
    notes: "Content is polished and on-brand, but a few deliverables still need compliance cleanup before approval.",
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
    campaignHistory: [
      "Verve Home Collection",
      "FaceIQ Launch",
    ],
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
    notes: "Strong aesthetic content with steady saves, but product demo clarity needs improvement for longer-term campaign fit.",
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
    campaignHistory: [
      "Symmetrix Promotion",
      "FaceIQ Launch",
    ],
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
    notes: "Reliable storyteller with strong product narration and good platform diversity across campaign types.",
    paymentInfo: {
      method: "Bank transfer",
      accountHolder: "Ruben T. White",
      identifier: "ACH • 123456789 • Wells Fargo",
      details: "Checking account • USD payout • account holder matches tax profile",
    },
  },
];

const initialPayouts: Array<{
  id: number;
  creator: string;
  campaign: string;
  amount: string;
  paymentMethod: string;
  status: "Pending" | "Processing" | "Paid" | "Failed";
  date: string;
  notes: string;
  paymentHistory: Array<{ label: string; value: string }>;
  creatorInfo: {
    username: string;
    platform: string;
    totalEarnings: string;
  };
  paymentInfo: CreatorPaymentInfo;
}> = [
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
];

export default function Home() {
  const [activeTab, setActiveTab] = useState("Overview");
  const [campaigns, setCampaigns] = useState(initialCampaigns);

useEffect(() => {
  async function loadCampaigns() {
    try {
      const response = await fetch("/api/campaigns");

      if (!response.ok) {
        throw new Error("Failed to load campaigns");
      }

      const data = await response.json();
      setCampaigns(data);
    } catch (error) {
      console.error("Error loading campaigns:", error);
    }
  }

  loadCampaigns();
}, []);
  const [payouts, setPayouts] = useState(initialPayouts);
  const [creators, setCreators] = useState(initialCreators);
  const [submissions, setSubmissions] = useState(initialSubmissions);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [campaignPlatformFilter, setCampaignPlatformFilter] = useState("All");
  const [campaignSort, setCampaignSort] = useState("deadline");
  const [selectedCampaignId, setSelectedCampaignId] = useState(initialCampaigns[0].id);
  const [payoutSearchTerm, setPayoutSearchTerm] = useState("");
  const [payoutStatusFilter, setPayoutStatusFilter] = useState("All");
  const [payoutMethodFilter, setPayoutMethodFilter] = useState("All");
  const [payoutSort, setPayoutSort] = useState("date");
  const [selectedPayoutId, setSelectedPayoutId] = useState(initialPayouts[0].id);
  const [submissionSearchTerm, setSubmissionSearchTerm] = useState("");
  const [submissionStatusFilter, setSubmissionStatusFilter] = useState("All");
  const [submissionPlatformFilter, setSubmissionPlatformFilter] = useState("All");
  const [submissionCampaignFilter, setSubmissionCampaignFilter] = useState("All");
  const [submissionSort, setSubmissionSort] = useState("newest");
  const [creatorSearchTerm, setCreatorSearchTerm] = useState("");
  const [creatorPlatformFilter, setCreatorPlatformFilter] = useState("All");
  const [creatorStatusFilter, setCreatorStatusFilter] = useState("All");
  const [creatorSort, setCreatorSort] = useState("followers");
  const [selectedCreatorId, setSelectedCreatorId] = useState(initialCreators[0].id);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [newCampaign, setNewCampaign] = useState(createCampaignDefaults);
  const [selectedSubmissionId, setSelectedSubmissionId] = useState(initialSubmissions[0].id);
  const [reviewNotes, setReviewNotes] = useState(initialSubmissions[0].notes);
  const [rejectReasonOpen, setRejectReasonOpen] = useState(false);
  const [submissionNotice, setSubmissionNotice] = useState<string | null>(null);
  const [isReducedMotion, setIsReducedMotion] = useState(false);
  const [portalMode, setPortalMode] = useState<"Admin" | "Creator">("Admin");
  const [creatorPortalTab, setCreatorPortalTab] = useState("Discover Campaigns");
  const [creatorCampaignPlatformFilter, setCreatorCampaignPlatformFilter] = useState("All");
  const [creatorCampaignStatusFilter, setCreatorCampaignStatusFilter] = useState("All");
  const [selectedCreatorCampaignId, setSelectedCreatorCampaignId] = useState<number | null>(initialCampaigns[0].id);
  const [appliedCampaignIds, setAppliedCampaignIds] = useState<number[]>([1, 3]);

  const campaignPlatformOptions = ["All", ...new Set(campaigns.flatMap((campaign) => campaign.platforms))];

  const filteredCampaigns = useMemo(() => {
    const nextCampaigns = campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.brand.toLowerCase().includes(searchTerm.toLowerCase()) ||
        campaign.platforms.some((platform) => platform.toLowerCase().includes(searchTerm.toLowerCase())) ||
        campaign.creatorRequirements.toLowerCase().includes(searchTerm.toLowerCase());

      const matchesStatus = statusFilter === "All" || campaign.status === statusFilter;
      const matchesPlatform =
        campaignPlatformFilter === "All" || campaign.platforms.includes(campaignPlatformFilter);

      return matchesSearch && matchesStatus && matchesPlatform;
    });

    return [...nextCampaigns].sort((a, b) => {
      if (campaignSort === "budget") {
        return Number.parseFloat(b.totalBudget.replace(/[^\d.]/g, "")) - Number.parseFloat(a.totalBudget.replace(/[^\d.]/g, ""));
      }

      if (campaignSort === "status") {
        return Number(b.status === "Active") - Number(a.status === "Active");
      }

      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    });
  }, [campaignPlatformFilter, campaigns, campaignSort, searchTerm, statusFilter]);

  const selectedCampaign =
    filteredCampaigns.find((campaign) => campaign.id === selectedCampaignId) ||
    filteredCampaigns[0] ||
    campaigns[0];

  const handleCreateCampaign = async () => {
    if (!newCampaign.name.trim() || !newCampaign.brand.trim()) {
      return;
    }

    const nextCampaign = {
      id: Date.now(),
      name: newCampaign.name.trim(),
      brand: newCampaign.brand.trim(),
      description: newCampaign.description.trim() || "New campaign brief is being assembled for creator outreach.",
      platforms: newCampaign.platforms.length ? newCampaign.platforms : ["Instagram Reels"],
      creatorRequirements: newCampaign.creatorCriteria.trim() || "General creator outreach",
      audienceRequirement: `T1 audience: ${newCampaign.minT1Audience}%+ target customer segment`,
      minT1Audience: Number(newCampaign.minT1Audience) || 60,
      payoutRate: newCampaign.payoutRate.trim() || "$800 / creator",
      totalBudget: newCampaign.totalBudget.trim() || "$0",
      status: newCampaign.status,
      deadline: newCampaign.deadline || "TBD",
      creators: Number(newCampaign.maxCreators) || 0,
      submissions: 0,
      creatorCriteria: newCampaign.creatorCriteria.trim() || "General creator outreach",
      submissionRequirements: newCampaign.submissionRequirements.trim() || "Standard short-form delivery and product usage requirements",
      creatorRoster: [],
      recentSubmissions: [],
    };

    try {
  const response = await fetch("/api/campaigns", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(nextCampaign),
  });

  if (!response.ok) {
    throw new Error("Failed to create campaign");
  }

  const savedCampaign = await response.json();

  setCampaigns((current) => [savedCampaign, ...current]);
} catch (error) {
  console.error("Error creating campaign:", error);
  alert("Failed to save campaign to the database.");
  return;
}
    setSelectedCampaignId(nextCampaign.id);
    setNewCampaign(createCampaignDefaults);
    setIsCreateModalOpen(false);
    setActiveTab("Campaigns");
  };

  const handleOpenCreateCampaign = () => {
    setActiveTab("Campaigns");
    setIsCreateModalOpen(true);
  };

  const handleExportDashboard = () => {
    const rows = [
      ["Campaign", "Brand", "Status", "Budget", "Deadline", "Creators", "Submissions"],
      ...campaigns.map((campaign) => [
        campaign.name,
        campaign.brand,
        campaign.status,
        campaign.totalBudget,
        campaign.deadline,
        String(campaign.creators),
        String(campaign.submissions),
      ]),
    ];

    const csvContent = rows
      .map((row) => row.map((cell) => `"${String(cell).replace(/"/g, '""')}"`).join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ugcgoat-campaign-export.csv";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const toggleCampaignStatus = (id: number) => {
    setCampaigns((current) =>
      current.map((campaign) => {
        if (campaign.id !== id) {
          return campaign;
        }

        return {
          ...campaign,
          status: campaign.status === "Active" ? "Paused" : "Active",
        };
      })
    );
  };

  const submissionPlatformOptions = ["All", ...new Set(submissions.map((submission) => submission.platform))];
  const submissionCampaignOptions = ["All", ...new Set(submissions.map((submission) => submission.campaign))];

  const filteredSubmissions = useMemo(() => {
    const nextSubmissions = submissions.filter((submission) => {
      const matchesSearch =
        submission.creatorName.toLowerCase().includes(submissionSearchTerm.toLowerCase()) ||
        submission.campaign.toLowerCase().includes(submissionSearchTerm.toLowerCase());

      const matchesStatus =
        submissionStatusFilter === "All" || submission.status === submissionStatusFilter;
     
      const matchesPlatform =
        submissionPlatformFilter === "All" || submission.platform === submissionPlatformFilter;

      const matchesCampaign =
        submissionCampaignFilter === "All" || submission.campaign === submissionCampaignFilter;

      return matchesSearch && matchesStatus && matchesPlatform && matchesCampaign;
    });

    return [...nextSubmissions].sort((a, b) => {
      if (submissionSort === "highest-engagement") {
        return b.likes + b.comments + b.saves - (a.likes + a.comments + a.saves);
      }

      return b.id - a.id;
    });
  }, [submissionCampaignFilter, submissionPlatformFilter, submissionSearchTerm, submissionSort, submissionStatusFilter, submissions]);

  const payoutMethodOptions = ["All", ...new Set(payouts.map((payout) => payout.paymentMethod))];

  const filteredPayouts = useMemo(() => {
    const nextPayouts = payouts.filter((payout) => {
      const matchesSearch =
        payout.creator.toLowerCase().includes(payoutSearchTerm.toLowerCase()) ||
        payout.campaign.toLowerCase().includes(payoutSearchTerm.toLowerCase()) ||
        payout.paymentMethod.toLowerCase().includes(payoutSearchTerm.toLowerCase());

      const matchesStatus = payoutStatusFilter === "All" || payout.status === payoutStatusFilter;
      const matchesMethod =
        payoutMethodFilter === "All" || payout.paymentMethod === payoutMethodFilter;

      return matchesSearch && matchesStatus && matchesMethod;
    });

    return [...nextPayouts].sort((a, b) => {
      if (payoutSort === "amount") {
        return Number.parseFloat(b.amount.replace(/[$,]/g, "")) - Number.parseFloat(a.amount.replace(/[$,]/g, ""));
      }

      if (payoutSort === "creator") {
        return a.creator.localeCompare(b.creator);
      }

      return new Date(b.date).getTime() - new Date(a.date).getTime();
    });
  }, [payoutMethodFilter, payoutSearchTerm, payoutSort, payoutStatusFilter, payouts]);

  const selectedPayout =
    filteredPayouts.find((payout) => payout.id === selectedPayoutId) || filteredPayouts[0] || payouts[0];

  const creatorPlatformOptions = ["All", ...new Set(creators.flatMap((creator) => creator.platforms))];
  const creatorStatusOptions = ["All", "Active", "Review", "Paused"];

  const filteredCreators = useMemo(() => {
    const nextCreators = creators.filter((creator) => {
      const matchesSearch =
        creator.name.toLowerCase().includes(creatorSearchTerm.toLowerCase()) ||
        creator.username.toLowerCase().includes(creatorSearchTerm.toLowerCase()) ||
        creator.campaignHistory.some((campaign) =>
          campaign.toLowerCase().includes(creatorSearchTerm.toLowerCase())
        );

      const matchesPlatform =
        creatorPlatformFilter === "All" ||
        creator.platforms.some((platform) => platform === creatorPlatformFilter);

      const matchesStatus =
        creatorStatusFilter === "All" || creator.overallStatus === creatorStatusFilter;

      return matchesSearch && matchesPlatform && matchesStatus;
    });

    return [...nextCreators].sort((a, b) => {
      if (creatorSort === "followers") {
        return b.followers - a.followers;
      }

      if (creatorSort === "engagement") {
        return Number.parseFloat(b.averageEngagement) - Number.parseFloat(a.averageEngagement);
      }

      if (creatorSort === "campaigns") {
        return b.activeCampaigns - a.activeCampaigns;
      }

      return b.t1Audience.localeCompare(a.t1Audience, undefined, { numeric: true });
    });
  }, [creatorPlatformFilter, creatorSearchTerm, creatorSort, creatorStatusFilter]);

  const selectedCreator =
    filteredCreators.find((creator) => creator.id === selectedCreatorId) || filteredCreators[0] || creators[0];

  const creatorProfile: {
    name: string;
    username: string;
    avatar: string;
    platforms: string[];
    followers: number;
    engagement: string;
    t1Audience: string;
    audience: string;
    paymentInfo: CreatorPaymentInfo;
  } = {
    name: "Alicia N.",
    username: "@alicianwell",
    avatar: "AN",
    platforms: ["Instagram", "TikTok"],
    followers: 147000,
    engagement: "8.4%",
    t1Audience: "72%",
    audience: "Beauty, skincare, and wellness consumers",
    paymentInfo: {
      method: "Bank transfer",
      accountHolder: "Alicia N. Wells",
      identifier: "IBAN • DE89 3704 0044 0532 0130 00",
      details: "Chase checking account • Routing 021000021 • USD payouts",
      bankName: "Chase Bank",
      accountNumber: "DE89 3704 0044 0532 0130 00",
      routingNumber: "021000021",
      email: "",
      swiftBic: "",
    },
  };

  const getPaymentMethodFields = (method: string) => {
    switch (method) {
      case "PayPal":
        return {
          accountHolderLabel: "Account holder / payee name",
          accountHolderValue: creatorPaymentInfo.accountHolder,
          identifierLabel: "PayPal Email Address",
          identifierValue: creatorPaymentInfo.email || creatorPaymentInfo.identifier || "",
          detailsLabel: "Additional notes",
          extraFields: null,
        };
      case "Bank transfer":
        return {
          accountHolderLabel: "Account holder name",
          accountHolderValue: creatorPaymentInfo.accountHolder,
          identifierLabel: "Account Number / IBAN",
          identifierValue: creatorPaymentInfo.accountNumber || creatorPaymentInfo.identifier || "",
          detailsLabel: "Additional notes",
          extraFields: [
            {
              label: "Bank Name",
              value: creatorPaymentInfo.bankName || "",
              key: "bankName",
              placeholder: "Bank name",
            },
            {
              label: "SWIFT/BIC or Routing Number",
              value: creatorPaymentInfo.swiftBic || creatorPaymentInfo.routingNumber || "",
              key: "swiftBic",
              placeholder: "SWIFT/BIC or routing number",
            },
          ],
        };
      case "Wise":
        return {
          accountHolderLabel: "Account holder / payee name",
          accountHolderValue: creatorPaymentInfo.accountHolder,
          identifierLabel: "Wise email or account reference",
          identifierValue: creatorPaymentInfo.email || creatorPaymentInfo.identifier || "",
          detailsLabel: "Additional notes",
          extraFields: null,
        };
      default:
        return {
          accountHolderLabel: "Account holder / payee name",
          accountHolderValue: creatorPaymentInfo.accountHolder,
          identifierLabel: "Payment identifier / reference",
          identifierValue: creatorPaymentInfo.identifier || "",
          detailsLabel: "Additional notes",
          extraFields: null,
        };
    }
  };

  const [creatorPaymentInfo, setCreatorPaymentInfo] = useState<CreatorPaymentInfo>(creatorProfile.paymentInfo);

  useEffect(() => {
    const syncedCreator = creators.find((creator) => creator.name === creatorProfile.name);
    if (syncedCreator) {
      setCreatorPaymentInfo((current) => ({
        ...syncedCreator.paymentInfo,
        method: syncedCreator.paymentInfo.method || current.method || "Bank transfer",
        accountHolder: syncedCreator.paymentInfo.accountHolder || current.accountHolder || "",
        identifier: syncedCreator.paymentInfo.identifier || current.identifier || "",
        email: syncedCreator.paymentInfo.email || current.email || "",
        bankName: syncedCreator.paymentInfo.bankName || current.bankName || "",
        accountNumber: syncedCreator.paymentInfo.accountNumber || current.accountNumber || "",
        routingNumber: syncedCreator.paymentInfo.routingNumber || current.routingNumber || "",
        swiftBic: syncedCreator.paymentInfo.swiftBic || current.swiftBic || "",
        details: syncedCreator.paymentInfo.details || current.details || "",
      }));
    }
  }, [creators]);

  const [creatorSubmissionDraft, setCreatorSubmissionDraft] = useState({
    campaignId: initialCampaigns[0].id,
    platform: "Instagram Reels",
    link: "",
    notes: "",
    requiredInfo: "",
  });
  const [creatorSubmissionModalOpen, setCreatorSubmissionModalOpen] = useState(false);

  const creatorCampaignPlatformOptions = ["All", ...new Set(campaigns.flatMap((campaign) => campaign.platforms))];
  const creatorCampaignStatusOptions = ["All", "Active", "Review", "Paused", "Completed"];

  const creatorAvailableCampaigns = useMemo(() => {
    return campaigns.filter((campaign) => {
      const matchesSearch =
        campaign.name.toLowerCase().includes(creatorSearchTerm.toLowerCase()) ||
        campaign.brand.toLowerCase().includes(creatorSearchTerm.toLowerCase()) ||
        campaign.platforms.some((platform) => platform.toLowerCase().includes(creatorSearchTerm.toLowerCase()));

      const matchesPlatform =
        creatorCampaignPlatformFilter === "All" || campaign.platforms.includes(creatorCampaignPlatformFilter);

      const matchesStatus =
        creatorCampaignStatusFilter === "All" || campaign.status === creatorCampaignStatusFilter;

      return matchesSearch && matchesPlatform && matchesStatus && campaign.status !== "Completed";
    });
  }, [campaigns, creatorCampaignPlatformFilter, creatorCampaignStatusFilter, creatorSearchTerm]);

  const creatorSelectedCampaign =
    creatorAvailableCampaigns.find((campaign) => campaign.id === selectedCreatorCampaignId) ||
    creatorAvailableCampaigns[0] ||
    campaigns[0];

  const creatorEligibilityForCampaign = (campaign: (typeof campaigns)[number]) => {
    const matchesPlatform = campaign.platforms.some((platform) => creatorProfile.platforms.includes(platform.split(" ")[0] || platform));
    const matchesFollowers = creatorProfile.followers >= 25000;
    const matchesEngagement = Number.parseFloat(creatorProfile.engagement) >= 6.0;
    const matchesT1 = Number.parseFloat(creatorProfile.t1Audience) >= campaign.minT1Audience;

    return {
      matchesPlatform,
      matchesFollowers,
      matchesEngagement,
      matchesT1,
      eligible: matchesPlatform && matchesFollowers && matchesEngagement && matchesT1,
    };
  };

  const creatorMyCampaigns = campaigns.filter((campaign) => appliedCampaignIds.includes(campaign.id));
  const creatorMySubmissions = submissions.filter((submission) => submission.creatorName === creatorProfile.name);
  const creatorPayouts = payouts.filter((payout) => payout.creator === creatorProfile.name);
  const creatorTotalEarnings = creatorPayouts
    .filter((payout) => payout.status === "Paid")
    .reduce((total, payout) => total + Number.parseFloat(payout.amount.replace(/[$,]/g, "")), 0);
  const creatorPendingEarnings = creatorPayouts
    .filter((payout) => payout.status === "Pending" || payout.status === "Processing")
    .reduce((total, payout) => total + Number.parseFloat(payout.amount.replace(/[$,]/g, "")), 0);

  const handleCreatorApply = (campaignId: number) => {
    setAppliedCampaignIds((current) => (current.includes(campaignId) ? current : [...current, campaignId]));
    setCampaigns((current) =>
      current.map((campaign) =>
        campaign.id === campaignId
          ? { ...campaign, submissions: campaign.submissions + 0 }
          : campaign
      )
    );
    setSelectedCreatorCampaignId(campaignId);
    setCreatorPortalTab("My Campaigns");
  };

  const handleCreatorSubmitContent = () => {
    const selectedCampaign = campaigns.find((campaign) => campaign.id === creatorSubmissionDraft.campaignId);

    if (!selectedCampaign || !creatorSubmissionDraft.link.trim()) {
      return;
    }

    const nextSubmission = {
      id: Date.now(),
      creatorName: creatorProfile.name,
      campaign: selectedCampaign.name,
      platform: creatorSubmissionDraft.platform,
      submittedAt: new Date().toLocaleDateString("en-US", {
        month: "short",
        day: "numeric",
        year: "numeric",
      }),
      postLink: creatorSubmissionDraft.link.trim(),
      views: 0,
      likes: 0,
      comments: 0,
      saves: 0,
      requirementStatus: {
        brandMentions: "Pending",
        productUse: "Pending",
        CTAIncluded: "Pending",
        compliance: "Pending",
      },
      status: "Pending",
      notes: creatorSubmissionDraft.notes.trim() || "Submitted for moderator review.",
    };

    setSubmissions((current) => [nextSubmission, ...current]);
    setCampaigns((current) =>
      current.map((campaign) =>
        campaign.id === selectedCampaign.id
          ? { ...campaign, submissions: campaign.submissions + 1 }
          : campaign
      )
    );
    setCreatorSubmissionDraft({
      campaignId: creatorSelectedCampaign?.id ?? selectedCampaign.id,
      platform: selectedCampaign.platforms[0] ?? "Instagram Reels",
      link: "",
      notes: "",
      requiredInfo: "",
    });
    setCreatorSubmissionModalOpen(false);
    setCreatorPortalTab("My Submissions");
  };

  const saveCreatorPayoutInfo = () => {
    const nextPaymentInfo = { ...creatorPaymentInfo };

    if (nextPaymentInfo.method === "PayPal") {
      nextPaymentInfo.identifier = nextPaymentInfo.email || nextPaymentInfo.identifier || "";
      nextPaymentInfo.details = nextPaymentInfo.details || "";
    }

    if (nextPaymentInfo.method === "Bank transfer") {
      nextPaymentInfo.identifier = nextPaymentInfo.accountNumber || nextPaymentInfo.identifier || "";
      nextPaymentInfo.details = [
        nextPaymentInfo.bankName ? `Bank: ${nextPaymentInfo.bankName}` : null,
        nextPaymentInfo.swiftBic ? `SWIFT/BIC: ${nextPaymentInfo.swiftBic}` : null,
        nextPaymentInfo.routingNumber ? `Routing: ${nextPaymentInfo.routingNumber}` : null,
        nextPaymentInfo.details,
      ]
        .filter(Boolean)
        .join(" • ");
    }

    if (nextPaymentInfo.method === "Wise") {
      nextPaymentInfo.identifier = nextPaymentInfo.email || nextPaymentInfo.identifier || "";
    }

    setCreatorPaymentInfo(nextPaymentInfo);

    setCreators((current) =>
      current.map((creator) =>
        creator.name === creatorProfile.name
          ? {
              ...creator,
              paymentInfo: nextPaymentInfo,
            }
          : creator
      )
    );

    setPayouts((current) =>
      current.map((payout) =>
        payout.creator === creatorProfile.name
          ? {
              ...payout,
              paymentMethod: nextPaymentInfo.method,
              paymentInfo: {
                ...payout.paymentInfo,
                method: nextPaymentInfo.method,
                accountHolder: nextPaymentInfo.accountHolder,
                identifier: nextPaymentInfo.identifier,
                details: nextPaymentInfo.details,
                email: nextPaymentInfo.email,
                bankName: nextPaymentInfo.bankName,
                accountNumber: nextPaymentInfo.accountNumber,
                routingNumber: nextPaymentInfo.routingNumber,
                swiftBic: nextPaymentInfo.swiftBic,
              },
            }
          : payout
      )
    );
  };

  const openCreatorSubmissionModal = (campaignId?: number) => {
    const targetCampaignId = campaignId ?? creatorSelectedCampaign?.id ?? creatorMyCampaigns[0]?.id ?? campaigns[0]?.id;
    const targetCampaign = campaigns.find((campaign) => campaign.id === targetCampaignId) ?? campaigns[0];

    if (!targetCampaign) {
      return;
    }

    setCreatorSubmissionDraft({
      campaignId: targetCampaign.id,
      platform: targetCampaign.platforms[0] ?? "Instagram Reels",
      link: "",
      notes: "",
      requiredInfo: "",
    });
    setCreatorSubmissionModalOpen(true);
  };

  const selectedSubmission =
    filteredSubmissions.find((submission) => submission.id === selectedSubmissionId) ||
    filteredSubmissions[0] ||
    submissions[0];

  useEffect(() => {
    const mediaQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    const updatePreference = () => setIsReducedMotion(mediaQuery.matches);

    updatePreference();

    if (typeof mediaQuery.addEventListener === "function") {
      mediaQuery.addEventListener("change", updatePreference);
      return () => mediaQuery.removeEventListener("change", updatePreference);
    }

    mediaQuery.addListener(updatePreference);
    return () => mediaQuery.removeListener(updatePreference);
  }, []);

  const handleSubmissionSelect = (submissionId: number) => {
    const nextSubmission = submissions.find((submission) => submission.id === submissionId);
    setSelectedSubmissionId(submissionId);
    setReviewNotes(nextSubmission?.notes ?? "");
    setRejectReasonOpen(false);
    setSubmissionNotice(null);
  };

  const handleSubmissionDecision = (decision: "Approved" | "Rejected") => {
    if (!selectedSubmission) {
      return;
    }

    if (decision === "Rejected" && !reviewNotes.trim()) {
      setRejectReasonOpen(true);
      setSubmissionNotice("Add a rejection reason to continue.");
      return;
    }

    const resolvedNotes =
      decision === "Rejected"
        ? reviewNotes.trim() || "Rejected due to creative and requirement mismatch."
        : reviewNotes.trim() || "Approved after compliance review.";

    setSubmissions((current) =>
      current.map((submission) =>
        submission.id === selectedSubmission.id
          ? {
              ...submission,
              status: decision,
              notes: resolvedNotes,
            }
          : submission
      )
    );

    setSelectedSubmissionId(selectedSubmission.id);
    setReviewNotes(resolvedNotes);
    setRejectReasonOpen(false);
    setSubmissionNotice(
      decision === "Approved" ? "Submission approved" : "Submission rejected"
    );
  };

  const renderOverview = () => (
    <div className="space-y-5">
      <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Welcome back
            </p>
            <h1 className="mt-2 text-[1.9rem] font-semibold tracking-[-0.06em] text-slate-900 sm:text-[2.15rem]">
              Here’s your campaign overview.
            </h1>
          </div>

          <div className="flex items-center gap-2.5">
            <button
              type="button"
              onClick={handleExportDashboard}
              className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Export
            </button>
            <button
              type="button"
              onClick={handleOpenCreateCampaign}
              className="rounded-full bg-slate-900 px-3.5 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
            >
              + Create campaign
            </button>
          </div>
        </div>
      </section>

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((item) => (
          <div
            key={item.label}
            className="rounded-lg border border-slate-200 bg-white p-4"
          >
            <p className="text-sm text-slate-500">{item.label}</p>
            <div className="mt-4 flex items-end justify-between gap-3">
              <span className="text-[2rem] font-semibold tracking-[-0.05em] text-slate-900">
                {item.value}
              </span>
              <span className="text-[10px] font-medium text-emerald-600">{item.change}</span>
            </div>
          </div>
        ))}
      </div>

      <div className="grid gap-4 xl:grid-cols-[1.35fr_0.95fr]">
        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.04em] text-slate-900">
                Recent activity
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Team updates and campaign progress
              </p>
            </div>
            <button
              onClick={() => setActiveTab("Campaigns")}
              className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
            >
              View all
            </button>
          </div>

          <div className="mt-4 space-y-2.5">
            {recentActivity.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start justify-between gap-4 rounded-lg border border-slate-200 bg-slate-50 p-3"
              >
                <div>
                  <p className="font-medium text-slate-800">{activity.title}</p>
                  <p className="mt-1 text-sm text-slate-500">{activity.detail}</p>
                </div>
                <span className="whitespace-nowrap text-xs font-medium text-slate-400">
                  {activity.time}
                </span>
              </div>
            ))}
          </div>
        </section>

        <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
          <div className="flex items-center justify-between gap-4">
            <div>
              <h2 className="text-base font-semibold tracking-[-0.04em] text-slate-900">
                Pending submissions
              </h2>
              <p className="mt-1 text-sm text-slate-500">Needs review</p>
            </div>
            <div className="rounded-full bg-amber-50 px-2.5 py-1 text-sm font-medium text-amber-700">
              36
            </div>
          </div>

          <div className="mt-4 space-y-2.5">
            {pendingSubmissions.map((submission) => (
              <div key={submission.name} className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                <div className="flex items-center justify-between gap-3">
                  <div>
                    <p className="font-medium text-slate-800">{submission.name}</p>
                    <p className="mt-1 text-sm text-slate-500">{submission.campaign}</p>
                  </div>
                  <span className="rounded-full bg-white px-2.5 py-1 text-xs font-medium text-slate-700 shadow-sm">
                    {submission.score}
                  </span>
                </div>
                <div className="mt-3 h-2.5 rounded-full bg-slate-200">
                  <div
                    className="h-2.5 rounded-full bg-slate-900"
                    style={{ width: `${Number.parseInt(submission.score, 10)}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>

      <section className="rounded-xl border border-slate-200 bg-white p-4 sm:p-5">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-base font-semibold tracking-[-0.04em] text-slate-900">
              Creator performance summary
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Top performing creators across active opportunities
            </p>
          </div>
          <button
            onClick={() => setActiveTab("Creators")}
            className="text-sm font-medium text-slate-600 transition hover:text-slate-900"
          >
            View all creators
          </button>
        </div>

        <div className="mt-4 overflow-hidden rounded-lg border border-slate-200">
          <div className="grid grid-cols-[1.35fr_1fr_1fr_0.8fr_0.8fr] gap-4 bg-slate-50 px-4 py-2.5 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
            <span>Creator</span>
            <span>Niche</span>
            <span>Content</span>
            <span>Conversion</span>
            <span>Payout</span>
          </div>

          {creatorPerformance.map((creator) => (
            <div
              key={creator.name}
              className="grid grid-cols-[1.35fr_1fr_1fr_0.8fr_0.8fr] gap-4 border-t border-slate-200 px-4 py-3 text-sm text-slate-700"
            >
              <span className="font-medium text-slate-900">{creator.name}</span>
              <span>{creator.niche}</span>
              <span>{creator.content}</span>
              <span className="font-medium text-emerald-600">{creator.conversion}</span>
              <span className="font-medium text-slate-900">{creator.payout}</span>
            </div>
          ))}
        </div>
      </section>
    </div>
  );

  const renderCampaigns = () => (
    <div className="grid gap-5 xl:grid-cols-[1.55fr_0.9fr]">
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Campaigns
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              Campaign management
            </h2>
          </div>

          <button
            onClick={() => setIsCreateModalOpen(true)}
            className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
          >
            + Create Campaign
          </button>
        </div>

        <div className="border-b border-slate-200 px-5 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={searchTerm}
                onChange={(event) => setSearchTerm(event.target.value)}
                placeholder="Search campaign or brand"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none sm:max-w-xs"
              />

              <select
                value={statusFilter}
                onChange={(event) => setStatusFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {['All', 'Active', 'Review', 'Paused', 'Completed'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={campaignPlatformFilter}
                onChange={(event) => setCampaignPlatformFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {campaignPlatformOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All platforms" : option}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={campaignSort}
              onChange={(event) => setCampaignSort(event.target.value)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
            >
              <option value="deadline">Deadline</option>
              <option value="budget">Budget</option>
              <option value="status">Status</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1040px]">
            <div className="grid grid-cols-[1.5fr_1.2fr_1fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              <span>Campaign</span>
              <span>Brand</span>
              <span>Platforms</span>
              <span>Status</span>
              <span>Budget</span>
              <span>Deadline</span>
              <span>Creators</span>
              <span>Submissions</span>
            </div>

            {filteredCampaigns.map((campaign) => (
              <button
                key={campaign.id}
                type="button"
                onClick={() => setSelectedCampaignId(campaign.id)}
                className={`grid w-full grid-cols-[1.5fr_1.2fr_1fr_1fr_0.8fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 px-4 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-slate-50 ${
                  selectedCampaign?.id === campaign.id ? "bg-slate-50" : "bg-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-[11px] font-semibold text-slate-700">
                    {campaign.name
                      .split(" ")
                      .slice(0, 2)
                      .map((word) => word[0])
                      .join("")
                      .slice(0, 2)}
                  </span>
                  <span className="font-medium text-slate-900">{campaign.name}</span>
                </span>
                <span>{campaign.brand}</span>
                <span>{campaign.platforms.join(", ")}</span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      campaign.status === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : campaign.status === "Review"
                          ? "bg-amber-50 text-amber-700"
                          : campaign.status === "Paused"
                            ? "bg-slate-200 text-slate-700"
                            : "bg-slate-100 text-slate-700"
                    }`}
                  >
                    {campaign.status}
                  </span>
                </span>
                <span className="font-medium text-slate-900">{campaign.totalBudget}</span>
                <span>{campaign.deadline}</span>
                <span>{campaign.creators}</span>
                <span>{campaign.submissions}</span>
              </button>
            ))}

            {filteredCampaigns.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No campaigns match your search or filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedCampaign && (
        <aside className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Campaign details
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.05em] text-slate-900">
                {selectedCampaign.name}
              </h3>
              <p className="mt-1 text-sm text-slate-500">{selectedCampaign.brand}</p>
            </div>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                selectedCampaign.status === "Active"
                  ? "bg-emerald-50 text-emerald-700"
                  : selectedCampaign.status === "Review"
                    ? "bg-amber-50 text-amber-700"
                    : selectedCampaign.status === "Paused"
                      ? "bg-slate-200 text-slate-700"
                      : "bg-slate-100 text-slate-700"
              }`}
            >
              {selectedCampaign.status}
            </span>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-900">Brief</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{selectedCampaign.description}</p>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Budget</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCampaign.totalBudget}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Payout</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCampaign.payoutRate || "$0 / creator"}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Deadline</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCampaign.deadline}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Creators</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCampaign.creators}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-medium text-slate-900">Platforms</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCampaign.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Campaign requirements</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="font-medium text-slate-900">Creator profile:</span> {selectedCampaign.creatorCriteria}
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="font-medium text-slate-900">Minimum T1 audience:</span> {selectedCampaign.minT1Audience || 60}%
              </div>
              <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                <span className="font-medium text-slate-900">Submission rules:</span> {selectedCampaign.submissionRequirements}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Creators</p>
            <div className="mt-3 space-y-2">
              {(selectedCampaign.creatorRoster || []).map((creator) => (
                <div key={creator.name} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <span>{creator.name}</span>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      creator.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : creator.status === "Review"
                          ? "bg-amber-50 text-amber-700"
                          : creator.status === "Rejected"
                            ? "bg-rose-50 text-rose-700"
                            : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {creator.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Recent submissions</p>
            <div className="mt-3 space-y-2">
              {(selectedCampaign.recentSubmissions || []).map((submission) => (
                <div key={`${selectedCampaign.id}-${submission.creator}-${submission.date}`} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <div>
                    <p className="font-medium text-slate-900">{submission.creator}</p>
                    <p className="text-xs text-slate-500">{submission.date}</p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      submission.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : submission.status === "Rejected"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </aside>
      )}

      {isCreateModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-[2px]">
          <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5">
            <div className="flex items-center justify-between gap-3">
              <div>
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                  Campaign
                </p>
                <h3 className="mt-1 text-xl font-semibold tracking-[-0.05em] text-slate-900">
                  Create campaign
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
              >
                Close
              </button>
            </div>

            <div className="mt-5 grid gap-4 md:grid-cols-2">
              <label className="text-sm text-slate-600">
                Campaign name
                <input
                  value={newCampaign.name}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, name: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="Summer launch"
                />
              </label>

              <label className="text-sm text-slate-600">
                Brand / app name
                <input
                  value={newCampaign.brand}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, brand: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="PSL"
                />
              </label>

              <label className="text-sm text-slate-600 md:col-span-2">
                Description / brief
                <textarea
                  rows={3}
                  value={newCampaign.description}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, description: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="Describe the campaign objective, product, and creative vision."
                />
              </label>

              <div className="text-sm text-slate-600 md:col-span-2">
                Platforms
                <div className="mt-2 flex flex-wrap gap-2">
                  {['Instagram Reels', 'TikTok', 'YouTube Shorts', 'Meta Ads', 'Pinterest'].map((platform) => (
                    <label
                      key={platform}
                      className="inline-flex items-center gap-2 rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700"
                    >
                      <input
                        type="checkbox"
                        checked={newCampaign.platforms.includes(platform)}
                        onChange={() =>
                          setNewCampaign((current) => ({
                            ...current,
                            platforms: current.platforms.includes(platform)
                              ? current.platforms.filter((item) => item !== platform)
                              : [...current.platforms, platform],
                          }))
                        }
                        className="h-4 w-4 rounded border-slate-300 text-slate-900 focus:ring-slate-500"
                      />
                      {platform}
                    </label>
                  ))}
                </div>
              </div>

              <label className="text-sm text-slate-600">
                Payout / rate
                <input
                  value={newCampaign.payoutRate}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, payoutRate: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="$1,200 / creator"
                />
              </label>

              <label className="text-sm text-slate-600">
                Total budget
                <input
                  value={newCampaign.totalBudget}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, totalBudget: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="$18,500"
                />
              </label>

              <label className="text-sm text-slate-600">
                Deadline
                <input
                  type="date"
                  value={newCampaign.deadline}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, deadline: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                />
              </label>

              <label className="text-sm text-slate-600">
                Max creators
                <input
                  type="number"
                  min="0"
                  value={newCampaign.maxCreators}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, maxCreators: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="24"
                />
              </label>

              <label className="text-sm text-slate-600 md:col-span-2">
                Required creator criteria
                <input
                  value={newCampaign.creatorCriteria}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, creatorCriteria: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="Beauty and skincare creators with tutorial and UGC experience"
                />
              </label>

              <label className="text-sm text-slate-600">
                Min T1 audience %
                <input
                  type="number"
                  min="0"
                  max="100"
                  value={newCampaign.minT1Audience}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, minT1Audience: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="60"
                />
              </label>

              <label className="text-sm text-slate-600">
                Status
                <select
                  value={newCampaign.status}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, status: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                >
                  {['Review', 'Active', 'Paused', 'Completed'].map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </label>

              <label className="text-sm text-slate-600 md:col-span-2">
                Additional submission requirements
                <textarea
                  rows={3}
                  value={newCampaign.submissionRequirements}
                  onChange={(event) =>
                    setNewCampaign((current) => ({ ...current, submissionRequirements: event.target.value }))
                  }
                  className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  placeholder="List any deliverables, CTAs, usage rules, or brand safety requirements."
                />
              </label>
            </div>

            <div className="mt-6 flex justify-end gap-3">
              <button
                type="button"
                onClick={() => setIsCreateModalOpen(false)}
                className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Cancel
              </button>
              <button
                type="button"
                onClick={handleCreateCampaign}
                className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Save campaign
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );

  const renderSubmissions = () => (
    <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Submissions
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              Moderator review queue
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
            {submissions.filter((submission) => submission.status === "Pending").length} pending
          </div>
        </div>

        <div className="border-b border-slate-200 px-5 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={submissionSearchTerm}
                onChange={(event) => setSubmissionSearchTerm(event.target.value)}
                placeholder="Search creator or campaign"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none sm:max-w-xs"
              />

              <select
                value={submissionStatusFilter}
                onChange={(event) => setSubmissionStatusFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {['All', 'Pending', 'Approved', 'Rejected'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={submissionPlatformFilter}
                onChange={(event) => setSubmissionPlatformFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {submissionPlatformOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All platforms" : option}
                  </option>
                ))}
              </select>

              <select
                value={submissionCampaignFilter}
                onChange={(event) => setSubmissionCampaignFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {submissionCampaignOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All campaigns" : option}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={submissionSort}
              onChange={(event) => setSubmissionSort(event.target.value)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
            >
              <option value="newest">Newest submission</option>
              <option value="highest-engagement">Highest engagement</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[920px]">
            <div className="grid grid-cols-[1.2fr_1.1fr_0.9fr_0.8fr_1.1fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              <span>Creator</span>
              <span>Campaign</span>
              <span>Platform</span>
              <span>Date</span>
              <span>Post link</span>
              <span>Views</span>
              <span>Engagement</span>
              <span>Status</span>
            </div>

            {filteredSubmissions.map((submission) => (
              <button
                key={submission.id}
                type="button"
                onClick={() => handleSubmissionSelect(submission.id)}
                className={`grid w-full grid-cols-[1.2fr_1.1fr_0.9fr_0.8fr_1.1fr_0.8fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 px-4 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-slate-50 ${
                  selectedSubmissionId === submission.id ? "bg-slate-50" : "bg-white"
                }`}
              >
                <span className="font-medium text-slate-900">{submission.creatorName}</span>
                <span>{submission.campaign}</span>
                <span>{submission.platform}</span>
                <span>{submission.submittedAt}</span>
                <span className="truncate text-slate-500">{submission.postLink}</span>
                <span>{submission.views.toLocaleString()}</span>
                <span>{submission.likes.toLocaleString()}</span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      submission.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : submission.status === "Rejected"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {submission.status}
                  </span>
                </span>
              </button>
            ))}

            {filteredSubmissions.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No submissions match your current search or filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedSubmission && (
        <aside className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Submission review
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.05em] text-slate-900">
                {selectedSubmission.creatorName}
              </h3>
            </div>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                selectedSubmission.status === "Approved"
                  ? "bg-emerald-50 text-emerald-700"
                  : selectedSubmission.status === "Rejected"
                    ? "bg-rose-50 text-rose-700"
                    : "bg-amber-50 text-amber-700"
              }`}
            >
              {selectedSubmission.status}
            </span>
          </div>

          <div className="mt-5 space-y-3 text-sm text-slate-600">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-900">Campaign</span>
                <span>{selectedSubmission.campaign}</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-900">Platform</span>
                <span>{selectedSubmission.platform}</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <div className="flex items-center justify-between gap-2">
                <span className="font-medium text-slate-900">Submitted</span>
                <span>{selectedSubmission.submittedAt}</span>
              </div>
            </div>

            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <span className="font-medium text-slate-900">Post link</span>
              <a
                href={selectedSubmission.postLink}
                target="_blank"
                rel="noreferrer"
                className="mt-2 block truncate text-slate-600 hover:text-slate-900"
              >
                {selectedSubmission.postLink}
              </a>
            </div>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Views</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedSubmission.views.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Likes</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedSubmission.likes.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Comments</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedSubmission.comments}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-white p-3">
              <p className="text-slate-500">Saves</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedSubmission.saves}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-900">Requirement status</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {Object.entries(selectedSubmission.requirementStatus).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between gap-3">
                  <span className="capitalize">{key.replace(/([A-Z])/g, " $1").trim()}</span>
                  <span
                    className={`rounded-full px-2 py-0.5 text-[11px] font-medium ${
                      value === "Pass"
                        ? "bg-emerald-50 text-emerald-700"
                        : value === "Fail"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {value}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div
            className={`mt-5 overflow-hidden transition-all duration-200 ease-out ${
              rejectReasonOpen ? "max-h-80 opacity-100" : "max-h-0 opacity-0"
            } ${isReducedMotion ? "duration-0" : ""}`}
          >
            <label className="block text-sm font-medium text-slate-700">Notes / rejection reason</label>
            <textarea
              value={reviewNotes}
              onChange={(event) => setReviewNotes(event.target.value)}
              rows={4}
              className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none transition-all duration-200 ease-out"
              placeholder="Add moderator notes or rejection reason..."
            />
          </div>

          {submissionNotice ? (
            <div
              className={`mt-5 rounded-full border border-emerald-200 bg-emerald-50 px-3 py-2 text-xs font-medium text-emerald-700 transition-all duration-200 ease-out ${
                isReducedMotion ? "duration-0" : ""
              }`}
            >
              {submissionNotice}
            </div>
          ) : null}

          <div className="mt-5 flex items-center gap-3">
            <button
              type="button"
              onClick={() => handleSubmissionDecision("Approved")}
              className={`flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition-all duration-200 ease-out hover:bg-slate-700 ${
                selectedSubmission?.status === "Approved" ? "scale-[1.01] ring-1 ring-emerald-200" : ""
              } ${isReducedMotion ? "duration-0" : ""}`}
            >
              {selectedSubmission?.status === "Approved" ? "Approved" : "Approve"}
            </button>
            <button
              type="button"
              onClick={() => {
                if (!rejectReasonOpen) {
                  setRejectReasonOpen(true);
                  setSubmissionNotice(null);
                  return;
                }
                handleSubmissionDecision("Rejected");
              }}
              className={`flex-1 rounded-full border px-4 py-2.5 text-sm font-medium transition-all duration-200 ease-out ${
                selectedSubmission?.status === "Rejected"
                  ? "border-rose-200 bg-rose-50 text-rose-700"
                  : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
              } ${isReducedMotion ? "duration-0" : ""}`}
            >
              {rejectReasonOpen ? "Confirm reject" : "Reject"}
            </button>
          </div>
        </aside>
      )}
    </div>
  );

  const renderCreators = () => (
    <div className="grid gap-5 xl:grid-cols-[1.6fr_0.9fr]">
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Creators
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              Creator management
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
            {filteredCreators.length} creators
          </div>
        </div>

        <div className="border-b border-slate-200 px-5 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex flex-1 flex-col gap-3 sm:flex-row">
              <input
                type="text"
                value={creatorSearchTerm}
                onChange={(event) => setCreatorSearchTerm(event.target.value)}
                placeholder="Search creators or campaigns"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none sm:max-w-xs"
              />

              <select
                value={creatorPlatformFilter}
                onChange={(event) => setCreatorPlatformFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {creatorPlatformOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All platforms" : option}
                  </option>
                ))}
              </select>

              <select
                value={creatorStatusFilter}
                onChange={(event) => setCreatorStatusFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {creatorStatusOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All status" : option}
                  </option>
                ))}
              </select>
            </div>

            <select
              value={creatorSort}
              onChange={(event) => setCreatorSort(event.target.value)}
              className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
            >
              <option value="followers">Followers</option>
              <option value="engagement">Avg engagement</option>
              <option value="campaigns">Active campaigns</option>
              <option value="t1">T1 audience</option>
            </select>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1080px]">
            <div className="grid grid-cols-[1.35fr_1.2fr_1fr_0.9fr_0.9fr_0.8fr_0.9fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              <span>Creator</span>
              <span>Username</span>
              <span>Platforms</span>
              <span>Followers</span>
              <span>Engagement</span>
              <span>T1</span>
              <span>Campaigns</span>
              <span>Submission</span>
              <span>Status</span>
            </div>

            {filteredCreators.map((creator) => (
              <button
                key={creator.id}
                type="button"
                onClick={() => setSelectedCreatorId(creator.id)}
                className={`grid w-full grid-cols-[1.35fr_1.2fr_1fr_0.9fr_0.9fr_0.8fr_0.9fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 px-4 py-3 text-left text-sm transition last:border-b-0 hover:bg-slate-50 ${
                  selectedCreator?.id === creator.id ? "bg-slate-50" : "bg-white"
                }`}
              >
                <span className="flex items-center gap-3">
                  <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-900 text-[11px] font-medium text-white">
                    {creator.avatar}
                  </span>
                  <span className="font-medium text-slate-900">{creator.name}</span>
                </span>
                <span className="text-slate-500">{creator.username}</span>
                <span className="text-slate-600">{creator.platforms.join(", ")}</span>
                <span>{creator.followers.toLocaleString()}</span>
                <span>{creator.averageEngagement}</span>
                <span>{creator.t1Audience}</span>
                <span>{creator.activeCampaigns}</span>
                <span className="text-slate-600">{creator.submissionStatus}</span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      creator.overallStatus === "Active"
                        ? "bg-emerald-50 text-emerald-700"
                        : creator.overallStatus === "Review"
                          ? "bg-amber-50 text-amber-700"
                          : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {creator.overallStatus}
                  </span>
                </span>
              </button>
            ))}

            {filteredCreators.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No creators match the current search or filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedCreator && (
        <aside className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div className="flex items-center gap-3">
              <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                {selectedCreator.avatar}
              </div>
              <div>
                <h3 className="text-xl font-semibold tracking-[-0.05em] text-slate-900">
                  {selectedCreator.name}
                </h3>
                <p className="text-sm text-slate-500">{selectedCreator.username}</p>
              </div>
            </div>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                selectedCreator.overallStatus === "Active"
                  ? "bg-emerald-50 text-emerald-700"
                  : selectedCreator.overallStatus === "Review"
                    ? "bg-amber-50 text-amber-700"
                    : "bg-slate-200 text-slate-700"
              }`}
            >
              {selectedCreator.overallStatus}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Followers</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCreator.followers.toLocaleString()}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Engagement</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCreator.averageEngagement}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">T1 audience</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCreator.t1Audience}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Campaigns</p>
              <p className="mt-1 text-lg font-semibold tracking-[-0.04em] text-slate-900">
                {selectedCreator.activeCampaigns}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-900">Connected platforms</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {selectedCreator.platforms.map((platform) => (
                <span
                  key={platform}
                  className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs font-medium text-slate-700"
                >
                  {platform}
                </span>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Audience</p>
            <p className="mt-2 text-sm text-slate-600">{selectedCreator.audience}</p>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Campaign history</p>
            <div className="mt-3 space-y-2">
              {selectedCreator.campaignHistory.map((campaign) => (
                <div key={campaign} className="rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  {campaign}
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Recent submissions</p>
            <div className="mt-3 space-y-2">
              {selectedCreator.recentSubmissions.map((submission) => (
                <div key={`${selectedCreator.id}-${submission.title}`} className="flex items-center justify-between gap-3 rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700">
                  <div>
                    <p className="font-medium text-slate-900">{submission.title}</p>
                    <p className="text-xs text-slate-500">{submission.date}</p>
                  </div>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      submission.status === "Approved"
                        ? "bg-emerald-50 text-emerald-700"
                        : submission.status === "Rejected"
                          ? "bg-rose-50 text-rose-700"
                          : "bg-amber-50 text-amber-700"
                    }`}
                  >
                    {submission.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-900">Engagement metrics</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <span>Avg views</span>
                <span className="font-medium text-slate-900">{selectedCreator.engagementMetrics.avgViews.toLocaleString()}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>CTR</span>
                <span className="font-medium text-slate-900">{selectedCreator.engagementMetrics.avgCTR}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Save rate</span>
                <span className="font-medium text-slate-900">{selectedCreator.engagementMetrics.saveRate}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Completion</span>
                <span className="font-medium text-slate-900">{selectedCreator.engagementMetrics.completionRate}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-medium text-slate-900">Payment info</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <span>Method</span>
                <span className="font-medium text-slate-900">{selectedCreator.paymentInfo.method}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Account holder</span>
                <span className="font-medium text-slate-900">{selectedCreator.paymentInfo.accountHolder}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Identifier</span>
                <span className="font-medium text-slate-900">{selectedCreator.paymentInfo.identifier}</span>
              </div>
              <div className="pt-2 text-xs leading-5 text-slate-500">
                {selectedCreator.paymentInfo.details}
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Notes</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{selectedCreator.notes}</p>
          </div>
        </aside>
      )}
    </div>
  );

  const handlePayoutStatusUpdate = (status: "Processing" | "Paid") => {
    const nextPayout = filteredPayouts.find((payout) => payout.id === selectedPayoutId) || selectedPayout;

    if (!nextPayout) {
      return;
    }

    setPayouts((current) =>
      current.map((payout) =>
        payout.id === nextPayout.id
          ? {
              ...payout,
              status,
              notes:
                status === "Processing"
                  ? "Payout is now processing and queued for transfer review."
                  : "Payout has been successfully marked as paid and sent to creator.",
            }
          : payout
      )
    );

    setSelectedPayoutId(nextPayout.id);
  };

  const renderPayouts = () => (
    <div className="grid gap-5 xl:grid-cols-[1.55fr_0.9fr]">
      <section className="rounded-xl border border-slate-200 bg-white">
        <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
          <div>
            <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
              Payouts
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              Payout management
            </h2>
          </div>
          <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
            {payouts.filter((payout) => payout.status === "Pending").length} pending
          </div>
        </div>

        <div className="grid gap-4 border-b border-slate-200 bg-slate-50 p-5 md:grid-cols-3">
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Total pending</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              ${payouts
                .filter((payout) => payout.status === "Pending" || payout.status === "Processing")
                .reduce((total, payout) => total + Number.parseFloat(payout.amount.replace(/[$,]/g, "")), 0)
                .toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Total paid</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              ${payouts
                .filter((payout) => payout.status === "Paid")
                .reduce((total, payout) => total + Number.parseFloat(payout.amount.replace(/[$,]/g, "")), 0)
                .toLocaleString(undefined, { maximumFractionDigits: 0 })}
            </p>
          </div>
          <div className="rounded-xl border border-slate-200 bg-white p-4">
            <p className="text-sm text-slate-500">Awaiting payment</p>
            <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
              {payouts.filter((payout) => payout.status === "Pending").length}
            </p>
          </div>
        </div>

        <div className="border-b border-slate-200 px-5 py-3">
          <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
            <div className="w-full lg:max-w-xs">
              <input
                type="text"
                value={payoutSearchTerm}
                onChange={(event) => setPayoutSearchTerm(event.target.value)}
                placeholder="Search creator or campaign"
                className="w-full rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
              />
            </div>

            <div className="ml-auto flex flex-wrap items-center justify-end gap-2.5">
              <select
                value={payoutStatusFilter}
                onChange={(event) => setPayoutStatusFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {['All', 'Pending', 'Processing', 'Paid', 'Failed'].map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>

              <select
                value={payoutMethodFilter}
                onChange={(event) => setPayoutMethodFilter(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                {payoutMethodOptions.map((option) => (
                  <option key={option} value={option}>
                    {option === "All" ? "All methods" : option}
                  </option>
                ))}
              </select>

              <select
                value={payoutSort}
                onChange={(event) => setPayoutSort(event.target.value)}
                className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
              >
                <option value="date">Newest</option>
                <option value="amount">Amount</option>
                <option value="creator">Creator</option>
              </select>
            </div>
          </div>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[880px]">
            <div className="grid grid-cols-[1.2fr_1.1fr_0.8fr_1fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 bg-slate-50 px-4 py-3 text-[10px] font-medium uppercase tracking-[0.12em] text-slate-500">
              <span>Creator</span>
              <span>Campaign</span>
              <span>Amount</span>
              <span>Method</span>
              <span>Status</span>
              <span>Date</span>
            </div>

            {filteredPayouts.map((payout) => (
              <button
                key={payout.id}
                type="button"
                onClick={() => setSelectedPayoutId(payout.id)}
                className={`grid w-full grid-cols-[1.2fr_1.1fr_0.8fr_1fr_0.8fr_0.8fr] gap-4 border-b border-slate-200 px-4 py-3 text-left text-sm text-slate-700 transition last:border-b-0 hover:bg-slate-50 ${
                  selectedPayout?.id === payout.id ? "bg-slate-50" : "bg-white"
                }`}
              >
                <span className="font-medium text-slate-900">{payout.creator}</span>
                <span>{payout.campaign}</span>
                <span>{payout.amount}</span>
                <span>{payout.paymentMethod}</span>
                <span>
                  <span
                    className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                      payout.status === "Paid"
                        ? "bg-emerald-50 text-emerald-700"
                        : payout.status === "Failed"
                          ? "bg-rose-50 text-rose-700"
                          : payout.status === "Processing"
                            ? "bg-amber-50 text-amber-700"
                            : "bg-slate-200 text-slate-700"
                    }`}
                  >
                    {payout.status}
                  </span>
                </span>
                <span>{payout.date}</span>
              </button>
            ))}

            {filteredPayouts.length === 0 && (
              <div className="px-4 py-8 text-center text-sm text-slate-500">
                No payout matches your current search or filters.
              </div>
            )}
          </div>
        </div>
      </section>

      {selectedPayout && (
        <aside className="rounded-xl border border-slate-200 bg-white p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                Payout detail
              </p>
              <h3 className="mt-1 text-xl font-semibold tracking-[-0.05em] text-slate-900">
                {selectedPayout.creator}
              </h3>
            </div>
            <span
              className={`inline-flex rounded-full px-2.5 py-1 text-[11px] font-medium ${
                selectedPayout.status === "Paid"
                  ? "bg-emerald-50 text-emerald-700"
                  : selectedPayout.status === "Failed"
                    ? "bg-rose-50 text-rose-700"
                    : selectedPayout.status === "Processing"
                      ? "bg-amber-50 text-amber-700"
                      : "bg-slate-200 text-slate-700"
              }`}
            >
              {selectedPayout.status}
            </span>
          </div>

          <div className="mt-5 grid grid-cols-2 gap-3 text-sm">
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Campaign</p>
              <p className="mt-1 text-base font-semibold tracking-[-0.04em] text-slate-900">
                {selectedPayout.campaign}
              </p>
            </div>
            <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
              <p className="text-slate-500">Amount</p>
              <p className="mt-1 text-base font-semibold tracking-[-0.04em] text-slate-900">
                {selectedPayout.amount}
              </p>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
            <p className="text-sm font-medium text-slate-900">Creator info</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <span>Username</span>
                <span className="font-medium text-slate-900">{selectedPayout.creatorInfo.username}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Platform</span>
                <span className="font-medium text-slate-900">{selectedPayout.creatorInfo.platform}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Total earnings</span>
                <span className="font-medium text-slate-900">{selectedPayout.creatorInfo.totalEarnings}</span>
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-medium text-slate-900">Earnings breakdown</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              {selectedPayout.paymentHistory.map((entry) => (
                <div key={entry.label} className="flex items-center justify-between gap-3">
                  <span>{entry.label}</span>
                  <span className="font-medium text-slate-900">{entry.value}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-medium text-slate-900">Payment method</p>
            <p className="mt-2 text-sm text-slate-600">{selectedPayout.paymentMethod}</p>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-medium text-slate-900">Payment information</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <span>Method</span>
                <span className="font-medium text-slate-900">{selectedPayout.paymentInfo.method}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Account holder</span>
                <span className="font-medium text-slate-900">{selectedPayout.paymentInfo.accountHolder}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Identifier</span>
                <span className="font-medium text-slate-900">{selectedPayout.paymentInfo.identifier}</span>
              </div>
              <div className="pt-2 text-xs leading-5 text-slate-500">
                {selectedPayout.paymentInfo.details}
              </div>
            </div>
          </div>

          <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
            <p className="text-sm font-medium text-slate-900">Payment history</p>
            <div className="mt-3 space-y-2 text-sm text-slate-600">
              <div className="flex items-center justify-between gap-3">
                <span>Last updated</span>
                <span className="font-medium text-slate-900">{selectedPayout.date}</span>
              </div>
              <div className="flex items-center justify-between gap-3">
                <span>Current state</span>
                <span className="font-medium text-slate-900">{selectedPayout.status}</span>
              </div>
            </div>
          </div>

          <div className="mt-5">
            <p className="text-sm font-medium text-slate-900">Notes</p>
            <p className="mt-2 text-sm leading-6 text-slate-600">{selectedPayout.notes}</p>
          </div>

          <div className="mt-5 flex items-center gap-3">
            {selectedPayout.status === "Pending" || selectedPayout.status === "Processing" ? (
              <button
                type="button"
                onClick={() => handlePayoutStatusUpdate("Paid")}
                className="flex-1 rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
              >
                Mark as Paid
              </button>
            ) : null}
            {selectedPayout.status !== "Paid" && selectedPayout.status !== "Failed" ? (
              <button
                type="button"
                onClick={() => handlePayoutStatusUpdate("Processing")}
                className="flex-1 rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Mark processing
              </button>
            ) : null}
          </div>
        </aside>
      )}
    </div>
  );

  const renderOtherSections = (title: string, description: string) => (
    <div className="rounded-xl border border-slate-200 bg-white p-8 text-center">
      <h2 className="text-2xl font-semibold tracking-[-0.05em] text-slate-900">{title}</h2>
      <p className="mt-3 text-sm text-slate-500">{description}</p>
    </div>
  );

  const renderCreatorPortal = () => {
    const creatorPortalContent =
      creatorPortalTab === "Discover Campaigns"
        ? (
          <div className="grid gap-5 xl:grid-cols-[1.55fr_0.9fr]">
            <section className="rounded-xl border border-slate-200 bg-white">
              <div className="flex flex-col gap-4 border-b border-slate-200 px-5 py-4 lg:flex-row lg:items-center lg:justify-between">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">
                    Discover
                  </p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
                    Discover campaigns
                  </h2>
                </div>
                <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
                  {creatorAvailableCampaigns.length} live
                </div>
              </div>

              <div className="border-b border-slate-200 px-5 py-3">
                <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
                  <div className="flex flex-1 flex-col gap-3 sm:flex-row">
                    <input
                      type="text"
                      value={creatorSearchTerm}
                      onChange={(event) => setCreatorSearchTerm(event.target.value)}
                      placeholder="Search campaigns or brands"
                      className="w-full rounded-full border border-slate-200 bg-slate-50 px-3.5 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none sm:max-w-xs"
                    />

                    <select
                      value={creatorCampaignPlatformFilter}
                      onChange={(event) => setCreatorCampaignPlatformFilter(event.target.value)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
                    >
                      {creatorCampaignPlatformOptions.map((option) => (
                        <option key={option} value={option}>
                          {option === "All" ? "All platforms" : option}
                        </option>
                      ))}
                    </select>

                    <select
                      value={creatorCampaignStatusFilter}
                      onChange={(event) => setCreatorCampaignStatusFilter(event.target.value)}
                      className="rounded-full border border-slate-200 bg-slate-50 px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
                    >
                      {creatorCampaignStatusOptions.map((option) => (
                        <option key={option} value={option}>
                          {option === "All" ? "All status" : option}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>
              </div>

              <div className="space-y-3 p-4">
                {creatorAvailableCampaigns.map((campaign) => {
                  const eligibility = creatorEligibilityForCampaign(campaign);
                  const isApplied = appliedCampaignIds.includes(campaign.id);

                  return (
                    <div
                      key={campaign.id}
                      role="button"
                      tabIndex={0}
                      onClick={() => setSelectedCreatorCampaignId(campaign.id)}
                      onKeyDown={(event) => {
                        if (event.key === "Enter" || event.key === " ") {
                          event.preventDefault();
                          setSelectedCreatorCampaignId(campaign.id);
                        }
                      }}
                      className={`w-full cursor-pointer rounded-xl border p-4 text-left transition ${
                        selectedCreatorCampaignId === campaign.id
                          ? "border-slate-300 bg-slate-50"
                          : "border-slate-200 bg-white hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold tracking-[-0.04em] text-slate-900">{campaign.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{campaign.brand}</p>
                        </div>
                        <span
                          className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                            campaign.status === "Active"
                              ? "bg-emerald-50 text-emerald-700"
                              : campaign.status === "Review"
                                ? "bg-amber-50 text-amber-700"
                                : campaign.status === "Paused"
                                  ? "bg-slate-200 text-slate-700"
                                  : "bg-slate-100 text-slate-700"
                          }`}
                        >
                          {campaign.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">{campaign.description}</p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {campaign.platforms.map((platform) => (
                          <span key={platform} className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-[11px] font-medium text-slate-700">
                            {platform}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-slate-500">Payout</p>
                          <p className="mt-1 font-medium text-slate-900">{campaign.payoutRate}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-slate-500">Budget</p>
                          <p className="mt-1 font-medium text-slate-900">{campaign.totalBudget}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-slate-50 p-3">
                          <p className="text-slate-500">Deadline</p>
                          <p className="mt-1 font-medium text-slate-900">{campaign.deadline}</p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <div className="text-xs text-slate-500">
                          {eligibility.eligible ? "Eligible for this campaign" : "Not yet eligible"}
                        </div>
                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleCreatorApply(campaign.id);
                          }}
                          className={`rounded-full px-3.5 py-2 text-sm font-medium transition ${
                            isApplied
                              ? "border border-slate-200 bg-white text-slate-700"
                              : "bg-slate-900 text-white hover:bg-slate-700"
                          }`}
                        >
                          {isApplied ? "Applied" : "Apply / Join"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            {creatorSelectedCampaign && (
              <aside className="rounded-xl border border-slate-200 bg-white p-5">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Campaign brief</p>
                    <h3 className="mt-1 text-xl font-semibold tracking-[-0.05em] text-slate-900">{creatorSelectedCampaign.name}</h3>
                    <p className="mt-1 text-sm text-slate-500">{creatorSelectedCampaign.brand}</p>
                  </div>
                  <span className="rounded-full bg-slate-100 px-2.5 py-1 text-[11px] font-medium text-slate-700">
                    {creatorSelectedCampaign.status}
                  </span>
                </div>

                <div className="mt-5 rounded-xl border border-slate-200 bg-slate-50 p-3">
                  <p className="text-sm font-medium text-slate-900">Full brief</p>
                  <p className="mt-2 text-sm leading-6 text-slate-600">{creatorSelectedCampaign.description}</p>
                </div>

                <div className="mt-5 rounded-xl border border-slate-200 bg-white p-3">
                  <p className="text-sm font-medium text-slate-900">Eligibility check</p>
                  <div className="mt-3 space-y-2 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-3">
                      <span>Platforms</span>
                      <span className={`font-medium ${creatorEligibilityForCampaign(creatorSelectedCampaign).matchesPlatform ? "text-emerald-700" : "text-slate-900"}`}>
                        {creatorEligibilityForCampaign(creatorSelectedCampaign).matchesPlatform ? "Match" : "No match"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Followers</span>
                      <span className={`font-medium ${creatorEligibilityForCampaign(creatorSelectedCampaign).matchesFollowers ? "text-emerald-700" : "text-slate-900"}`}>
                        {creatorEligibilityForCampaign(creatorSelectedCampaign).matchesFollowers ? "Eligible" : "Need 25k+"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Engagement</span>
                      <span className={`font-medium ${creatorEligibilityForCampaign(creatorSelectedCampaign).matchesEngagement ? "text-emerald-700" : "text-slate-900"}`}>
                        {creatorEligibilityForCampaign(creatorSelectedCampaign).matchesEngagement ? "Eligible" : "Need 6%+"}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Min T1 audience</span>
                      <span className={`font-medium ${creatorEligibilityForCampaign(creatorSelectedCampaign).matchesT1 ? "text-emerald-700" : "text-slate-900"}`}>
                        {creatorEligibilityForCampaign(creatorSelectedCampaign).matchesT1 ? `Meets ${creatorSelectedCampaign.minT1Audience}%` : `Need ${creatorSelectedCampaign.minT1Audience}%`}
                      </span>
                    </div>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-medium text-slate-900">Creator profile:</span> {creatorSelectedCampaign.creatorCriteria}
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-medium text-slate-900">Minimum T1 audience:</span> {creatorSelectedCampaign.minT1Audience}%
                  </div>
                  <div className="rounded-lg border border-slate-200 bg-white px-3 py-2">
                    <span className="font-medium text-slate-900">Submission rules:</span> {creatorSelectedCampaign.submissionRequirements}
                  </div>
                </div>

                <div className="mt-5 flex items-center gap-3">
                  <button
                    type="button"
                    onClick={() => handleCreatorApply(creatorSelectedCampaign.id)}
                    className={`flex-1 rounded-full px-4 py-2.5 text-sm font-medium text-white transition ${
                      appliedCampaignIds.includes(creatorSelectedCampaign.id)
                        ? "border border-slate-200 bg-white text-slate-700"
                        : "bg-slate-900 hover:bg-slate-700"
                    }`}
                  >
                    {appliedCampaignIds.includes(creatorSelectedCampaign.id) ? "Applied" : "Apply / Join Campaign"}
                  </button>
                </div>
              </aside>
            )}
          </div>
        )
        : creatorPortalTab === "My Campaigns"
          ? (
            <div className="grid gap-5 xl:grid-cols-[1.5fr_0.9fr]">
              <section className="rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center justify-between border-b border-slate-200 px-5 py-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">My campaigns</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Campaigns you joined</h2>
                  </div>
                  <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
                    {creatorMyCampaigns.length} active
                  </div>
                </div>

                <div className="space-y-3 p-4">
                  {creatorMyCampaigns.map((campaign) => (
                    <div key={campaign.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-lg font-semibold tracking-[-0.04em] text-slate-900">{campaign.name}</p>
                          <p className="mt-1 text-sm text-slate-500">{campaign.brand}</p>
                        </div>
                        <span className="rounded-full bg-emerald-50 px-2 py-1 text-[11px] font-medium text-emerald-700">
                          Joined
                        </span>
                      </div>

                      <div className="mt-4 grid gap-3 text-sm text-slate-600 sm:grid-cols-3">
                        <div className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-slate-500">Status</p>
                          <p className="mt-1 font-medium text-slate-900">{campaign.status}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-slate-500">Deadline</p>
                          <p className="mt-1 font-medium text-slate-900">{campaign.deadline}</p>
                        </div>
                        <div className="rounded-lg border border-slate-200 bg-white p-3">
                          <p className="text-slate-500">Payout</p>
                          <p className="mt-1 font-medium text-slate-900">{campaign.payoutRate}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>

              <aside className="rounded-xl border border-slate-200 bg-white p-5">
                <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Creator profile</p>
                <div className="mt-3 flex items-center gap-3">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                    {creatorProfile.avatar}
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold tracking-[-0.05em] text-slate-900">{creatorProfile.name}</h3>
                    <p className="text-sm text-slate-500">{creatorProfile.username}</p>
                  </div>
                </div>

                <div className="mt-5 space-y-2 text-sm text-slate-600">
                  <div className="flex items-center justify-between gap-3">
                    <span>Followers</span>
                    <span className="font-medium text-slate-900">{creatorProfile.followers.toLocaleString()}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Engagement</span>
                    <span className="font-medium text-slate-900">{creatorProfile.engagement}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>T1 audience</span>
                    <span className="font-medium text-slate-900">{creatorProfile.t1Audience}</span>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <span>Platforms</span>
                    <span className="font-medium text-slate-900">{creatorProfile.platforms.join(", ")}</span>
                  </div>
                </div>
              </aside>
            </div>
          )
          : creatorPortalTab === "My Submissions"
            ? (
              <div className="rounded-xl border border-slate-200 bg-white p-4">
                <div className="flex items-center justify-between border-b border-slate-200 pb-4">
                  <div>
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">My submissions</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Submission history</h2>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="rounded-full bg-slate-100 px-2.5 py-1 text-sm font-medium text-slate-700">
                      {creatorMySubmissions.length} items
                    </div>
                    <button
                      type="button"
                      onClick={() => openCreatorSubmissionModal()}
                      className="rounded-full bg-slate-900 px-3 py-2 text-sm font-medium text-white transition hover:bg-slate-700"
                    >
                      + Submit content
                    </button>
                  </div>
                </div>

                <div className="mt-4 space-y-3">
                  {creatorMySubmissions.map((submission) => (
                    <div key={submission.id} className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                      <div className="flex items-start justify-between gap-3">
                        <div>
                          <p className="text-base font-semibold tracking-[-0.04em] text-slate-900">{submission.campaign}</p>
                          <p className="mt-1 text-sm text-slate-500">{submission.platform} • {submission.submittedAt}</p>
                        </div>
                        <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                          submission.status === "Approved"
                            ? "bg-emerald-50 text-emerald-700"
                            : submission.status === "Rejected"
                              ? "bg-rose-50 text-rose-700"
                              : submission.status === "Needs Changes"
                                ? "bg-orange-50 text-orange-700"
                                : "bg-amber-50 text-amber-700"
                        }`}>
                          {submission.status}
                        </span>
                      </div>

                      <div className="mt-3 rounded-lg border border-slate-200 bg-white p-3 text-sm text-slate-600">
                        <div className="flex items-center justify-between gap-3">
                          <span className="font-medium text-slate-900">Post link</span>
                          <a href={submission.postLink} target="_blank" rel="noreferrer" className="max-w-[60%] truncate text-slate-600 hover:text-slate-900">
                            {submission.postLink}
                          </a>
                        </div>
                        <div className="mt-2 flex items-center justify-between gap-3">
                          <span>Feedback</span>
                          <span className="text-right text-slate-700">{submission.notes || "No feedback yet."}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )
            : creatorPortalTab === "Earnings"
              ? (
                <div className="grid gap-5 xl:grid-cols-[1.2fr_0.8fr]">
                  <section className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Earnings</p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Payout overview</h2>

                    <div className="mt-5 grid gap-4 md:grid-cols-2">
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Total paid</p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
                          ${creatorTotalEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                      <div className="rounded-xl border border-slate-200 bg-slate-50 p-4">
                        <p className="text-sm text-slate-500">Pending</p>
                        <p className="mt-2 text-2xl font-semibold tracking-[-0.05em] text-slate-900">
                          ${creatorPendingEarnings.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                        </p>
                      </div>
                    </div>

                    <div className="mt-5 space-y-3">
                      {creatorPayouts.map((payout) => (
                        <div key={payout.id} className="rounded-xl border border-slate-200 bg-white p-4">
                          <div className="flex items-center justify-between gap-3">
                            <div>
                              <p className="font-medium text-slate-900">{payout.campaign}</p>
                              <p className="mt-1 text-sm text-slate-500">{payout.date}</p>
                            </div>
                            <span className={`inline-flex rounded-full px-2 py-1 text-[11px] font-medium ${
                              payout.status === "Paid"
                                ? "bg-emerald-50 text-emerald-700"
                                : payout.status === "Failed"
                                  ? "bg-rose-50 text-rose-700"
                                  : payout.status === "Processing"
                                    ? "bg-amber-50 text-amber-700"
                                    : "bg-slate-200 text-slate-700"
                            }`}>
                              {payout.status}
                            </span>
                          </div>
                          <div className="mt-3 flex items-center justify-between gap-3 text-sm text-slate-600">
                            <span>Amount</span>
                            <span className="font-medium text-slate-900">{payout.amount}</span>
                          </div>
                        </div>
                      ))}
                    </div>
                  </section>

                  <aside className="rounded-xl border border-slate-200 bg-white p-5">
                    <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Payment info</p>
                    <div className="mt-3 space-y-2 text-sm text-slate-600">
                      <div className="flex items-center justify-between gap-3">
                        <span>Method</span>
                        <span className="font-medium text-slate-900">{creatorPaymentInfo.method}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Holder</span>
                        <span className="font-medium text-slate-900">{creatorPaymentInfo.accountHolder}</span>
                      </div>
                      <div className="flex items-center justify-between gap-3">
                        <span>Identifier</span>
                        <span className="font-medium text-slate-900">{creatorPaymentInfo.identifier}</span>
                      </div>
                      <div className="pt-2 text-xs leading-5 text-slate-500">
                        {creatorPaymentInfo.details}
                      </div>
                    </div>
                  </aside>
                </div>
              )
              : (
                <div className="rounded-xl border border-slate-200 bg-white p-5">
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Profile</p>
                  <h2 className="mt-1 text-2xl font-semibold tracking-[-0.05em] text-slate-900">Creator profile</h2>

                  <div className="mt-5 flex items-center gap-3">
                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                      {creatorProfile.avatar}
                    </div>
                    <div>
                      <p className="text-lg font-semibold tracking-[-0.04em] text-slate-900">{creatorProfile.name}</p>
                      <p className="text-sm text-slate-500">{creatorProfile.username}</p>
                    </div>
                  </div>

                  <div className="mt-5 space-y-3 text-sm text-slate-600">
                    <div className="flex items-center justify-between gap-3">
                      <span>Audience</span>
                      <span className="font-medium text-slate-900">{creatorProfile.audience}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Platforms</span>
                      <span className="font-medium text-slate-900">{creatorProfile.platforms.join(", ")}</span>
                    </div>
                    <div className="flex items-center justify-between gap-3">
                      <span>Followers</span>
                      <span className="font-medium text-slate-900">{creatorProfile.followers.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="mt-6 rounded-xl border border-slate-200 bg-slate-50 p-4">
                    <div className="flex items-center justify-between gap-3">
                      <p className="text-sm font-medium text-slate-900">Payout information</p>
                      <button
                        type="button"
                        onClick={saveCreatorPayoutInfo}
                        className="rounded-full bg-slate-900 px-3 py-2 text-xs font-medium text-white transition hover:bg-slate-700"
                      >
                        Save
                      </button>
                    </div>

                    <div className="mt-4 space-y-3">
                      <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                        Payment method
                        <select
                          value={creatorPaymentInfo.method}
                          onChange={(event) =>
                            setCreatorPaymentInfo((current) => ({
                              ...current,
                              method: event.target.value,
                            }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
                        >
                          <option value="Bank transfer">Bank transfer</option>
                          <option value="PayPal">PayPal</option>
                          <option value="Wise">Wise</option>
                          <option value="Other">Other</option>
                        </select>
                      </label>

                      <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                        {creatorPaymentInfo.method === "PayPal"
                          ? "Account holder / payee name"
                          : creatorPaymentInfo.method === "Bank transfer"
                            ? "Account holder name"
                            : "Account holder / payee name"}
                        <input
                          value={creatorPaymentInfo.accountHolder}
                          onChange={(event) =>
                            setCreatorPaymentInfo((current) => ({ ...current, accountHolder: event.target.value }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
                        />
                      </label>

                      {creatorPaymentInfo.method === "PayPal" && (
                        <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                          PayPal Email Address
                          <input
                            type="email"
                            value={creatorPaymentInfo.email || creatorPaymentInfo.identifier || ""}
                            onChange={(event) =>
                              setCreatorPaymentInfo((current) => ({
                                ...current,
                                email: event.target.value,
                                identifier: event.target.value,
                              }))
                            }
                            placeholder="creator@example.com"
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                          />
                        </label>
                      )}

                      {creatorPaymentInfo.method === "Bank transfer" && (
                        <>
                          <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                            Bank Name
                            <input
                              value={creatorPaymentInfo.bankName || ""}
                              onChange={(event) =>
                                setCreatorPaymentInfo((current) => ({ ...current, bankName: event.target.value }))
                              }
                              placeholder="Bank name"
                              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                            />
                          </label>

                          <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                            Account Number / IBAN
                            <input
                              value={creatorPaymentInfo.accountNumber || creatorPaymentInfo.identifier || ""}
                              onChange={(event) =>
                                setCreatorPaymentInfo((current) => ({
                                  ...current,
                                  accountNumber: event.target.value,
                                  identifier: event.target.value,
                                }))
                              }
                              placeholder="IBAN or account number"
                              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                            />
                          </label>

                          <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                            SWIFT/BIC or Routing Number
                            <input
                              value={creatorPaymentInfo.swiftBic || creatorPaymentInfo.routingNumber || ""}
                              onChange={(event) =>
                                setCreatorPaymentInfo((current) => ({
                                  ...current,
                                  swiftBic: event.target.value,
                                  routingNumber: event.target.value,
                                }))
                              }
                              placeholder="SWIFT/BIC or routing number"
                              className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                            />
                          </label>
                        </>
                      )}

                      {(creatorPaymentInfo.method === "Wise" || creatorPaymentInfo.method === "Other") && (
                        <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                          {creatorPaymentInfo.method === "Wise"
                            ? "Wise email or account reference"
                            : "Payment identifier / reference"}
                          <input
                            value={creatorPaymentInfo.email || creatorPaymentInfo.identifier || ""}
                            onChange={(event) =>
                              setCreatorPaymentInfo((current) => ({
                                ...current,
                                email: event.target.value,
                                identifier: event.target.value,
                              }))
                            }
                            placeholder={creatorPaymentInfo.method === "Wise" ? "name@wise.com" : "Identifier or reference"}
                            className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 placeholder:text-slate-400 focus:border-slate-300 focus:outline-none"
                          />
                        </label>
                      )}

                      <label className="block text-xs font-medium uppercase tracking-[0.12em] text-slate-500">
                        Extra notes
                        <textarea
                          rows={3}
                          value={creatorPaymentInfo.details}
                          onChange={(event) =>
                            setCreatorPaymentInfo((current) => ({ ...current, details: event.target.value }))
                          }
                          className="mt-1 w-full rounded-lg border border-slate-200 bg-white px-3 py-2 text-sm text-slate-700 focus:border-slate-300 focus:outline-none"
                        />
                      </label>
                    </div>
                  </div>
                </div>
              );

    return (
      <div className="space-y-5">
        <section className="rounded-xl border border-slate-200 bg-white p-5 sm:p-6">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Creator portal</p>
              <h1 className="mt-2 text-[1.9rem] font-semibold tracking-[-0.06em] text-slate-900 sm:text-[2.15rem]">
                Welcome back, {creatorProfile.name.split(" ")[0]}.
              </h1>
            </div>

            <div className="flex items-center gap-2.5">
              <button
                type="button"
                onClick={() => setPortalMode("Admin")}
                className="rounded-full border border-slate-200 bg-white px-3 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
              >
                Admin view
              </button>
            </div>
          </div>
        </section>

        <div className="rounded-xl border border-slate-200 bg-white p-1">
          <nav className="flex flex-wrap items-center gap-1">
            {creatorNavigation.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setCreatorPortalTab(item)}
                className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                  creatorPortalTab === item
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </nav>
        </div>

        {creatorPortalContent}

        {creatorSubmissionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-900/20 p-4 backdrop-blur-[2px]">
            <div className="w-full max-w-2xl rounded-2xl border border-slate-200 bg-white p-5">
              <div className="flex items-center justify-between gap-3">
                <div>
                  <p className="text-[10px] font-medium uppercase tracking-[0.14em] text-slate-500">Campaign submission</p>
                  <h3 className="mt-1 text-xl font-semibold tracking-[-0.05em] text-slate-900">Submit content</h3>
                </div>
                <button
                  type="button"
                  onClick={() => setCreatorSubmissionModalOpen(false)}
                  className="text-sm font-medium text-slate-500 transition hover:text-slate-900"
                >
                  Close
                </button>
              </div>

              <div className="mt-5 grid gap-4 md:grid-cols-2">
                <label className="text-sm text-slate-600 md:col-span-2">
                  Campaign
                  <select
                    value={creatorSubmissionDraft.campaignId}
                    onChange={(event) =>
                      setCreatorSubmissionDraft((current) => ({
                        ...current,
                        campaignId: Number(event.target.value),
                      }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  >
                    {creatorMyCampaigns.map((campaign) => (
                      <option key={campaign.id} value={campaign.id}>
                        {campaign.name}
                      </option>
                    ))}
                  </select>
                </label>

                <label className="text-sm text-slate-600">
                  Platform
                  <select
                    value={creatorSubmissionDraft.platform}
                    onChange={(event) =>
                      setCreatorSubmissionDraft((current) => ({ ...current, platform: event.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                  >
                    {campaigns
                      .find((campaign) => campaign.id === creatorSubmissionDraft.campaignId)?.platforms.map((platform) => (
                        <option key={platform} value={platform}>
                          {platform}
                        </option>
                      )) ?? []}
                  </select>
                </label>

                <label className="text-sm text-slate-600">
                  Post / video link
                  <input
                    value={creatorSubmissionDraft.link}
                    onChange={(event) =>
                      setCreatorSubmissionDraft((current) => ({ ...current, link: event.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                    placeholder="https://..."
                  />
                </label>

                <label className="text-sm text-slate-600 md:col-span-2">
                  Notes for the moderator
                  <textarea
                    rows={3}
                    value={creatorSubmissionDraft.notes}
                    onChange={(event) =>
                      setCreatorSubmissionDraft((current) => ({ ...current, notes: event.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                    placeholder="Add context, creative angle, or any required info for review."
                  />
                </label>

                <label className="text-sm text-slate-600 md:col-span-2">
                  Required info / deliverables
                  <textarea
                    rows={3}
                    value={creatorSubmissionDraft.requiredInfo}
                    onChange={(event) =>
                      setCreatorSubmissionDraft((current) => ({ ...current, requiredInfo: event.target.value }))
                    }
                    className="mt-1 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2.5 text-slate-900 focus:border-slate-300 focus:outline-none"
                    placeholder="Any required product usage, CTA, or campaign specifics."
                  />
                </label>
              </div>

              <div className="mt-6 flex justify-end gap-3">
                <button
                  type="button"
                  onClick={() => setCreatorSubmissionModalOpen(false)}
                  className="rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleCreatorSubmitContent}
                  className="rounded-full bg-slate-900 px-4 py-2.5 text-sm font-medium text-white transition hover:bg-slate-700"
                >
                  Submit for review
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  const tabContent =
    portalMode === "Creator"
      ? renderCreatorPortal()
      : activeTab === "Overview"
        ? renderOverview()
        : activeTab === "Campaigns"
          ? renderCampaigns()
          : activeTab === "Creators"
            ? renderCreators()
            : activeTab === "Submissions"
              ? renderSubmissions()
              : activeTab === "Payouts"
                ? renderPayouts()
                : renderOtherSections("Payouts", "Payout tracking, approvals, and payment status will live here.");

  return (
    <main className="min-h-screen bg-[#f7f7f5] text-slate-900">
      <div className="mx-auto max-w-[1500px] px-4 py-5 sm:px-6 lg:px-8">
        <header className="rounded-xl border border-slate-200 bg-white px-4 py-3 sm:px-5">
          <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
            <div className="flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 text-sm font-semibold text-white">
                G
              </div>
              <div className="flex items-center gap-1 text-xl font-semibold tracking-[-0.06em] text-slate-900">
                UGC<span className="text-slate-500">GOAT</span>
              </div>
            </div>

            <nav className="flex flex-wrap items-center gap-1 rounded-full border border-slate-200 bg-slate-50 p-1">
              {portalMode === "Admin" ? navigation.map((item) => (
                <button
                  key={item}
                  onClick={() => setActiveTab(item)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    activeTab === item
                      ? "bg-white text-slate-900 ring-1 ring-slate-200"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item}
                </button>
              )) : creatorNavigation.map((item) => (
                <button
                  key={item}
                  onClick={() => setCreatorPortalTab(item)}
                  className={`rounded-full px-3 py-2 text-sm font-medium transition ${
                    creatorPortalTab === item
                      ? "bg-white text-slate-900 ring-1 ring-slate-200"
                      : "text-slate-500 hover:text-slate-900"
                  }`}
                >
                  {item}
                </button>
              ))}
            </nav>

            <div className="flex items-center gap-3 self-end lg:self-auto">
              <button
                type="button"
                onClick={() => setPortalMode(portalMode === "Admin" ? "Creator" : "Admin")}
                className="hidden rounded-full border border-slate-200 bg-white px-4 py-2.5 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50 sm:inline-flex"
              >
                {portalMode === "Admin" ? "Creator portal" : "Admin dashboard"}
              </button>
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-medium text-white">
                {portalMode === "Admin" ? "MG" : "AN"}
              </div>
            </div>
          </div>
        </header>

        <div className="mt-6">{tabContent}</div>
      </div>
    </main>
  );
}
