"use client";

import { useEffect, useMemo, useState } from "react";

type CreatorProfile = {
  name: string;
  username: string;
  avatar: string | null;
  platforms: string[];
  followers: number;
  averageEngagement?: number | null;
  t1Audience?: number | null;
  activeCampaigns?: number;
  recentSubmissions?: unknown[] | null;
  earnings?: number | null;
};

type MeResponse = {
  id: number;
  name: string | null;
  email: string;
  role: string;
  creator: CreatorProfile | null;
};

type Campaign = {
  id: number;
  name: string;
  brand: string;
  description: string;
  platforms: string[];
  creatorRequirements?: string | null;
  audienceRequirement?: string | null;
  minT1Audience?: number | null;
  payoutRate?: string | number | null;
  totalBudget?: string | number | null;
  status?: string | null;
  deadline?: string | null;
  creators?: number | null;
  submissionCount?: number | null;
  creatorCriteria?: string | null;
  submissionRequirements?: string | null;
};

const platformFilters = [
  "All",
  "Instagram",
  "TikTok",
  "YouTube",
];

function formatNumber(value: number | null | undefined) {
  if (value === null || value === undefined) return "—";
  return value.toLocaleString();
}

function formatMoney(value: string | number | null | undefined) {
  if (value === null || value === undefined || value === "") {
    return "—";
  }

  const number = Number(value);

  if (Number.isFinite(number)) {
    return `$${number.toLocaleString()}`;
  }

  return String(value);
}

function formatDeadline(deadline: string | null | undefined) {
  if (!deadline) return "No deadline";

  const date = new Date(deadline);

  if (Number.isNaN(date.getTime())) {
    return deadline;
  }

  return date.toLocaleDateString("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}

function getProgress(campaign: Campaign) {
  const budget = Number(campaign.totalBudget);
  const payout = Number(campaign.payoutRate);

  if (
    !Number.isFinite(budget) ||
    !Number.isFinite(payout) ||
    budget <= 0
  ) {
    return null;
  }

  return Math.min(
    100,
    Math.max(0, (payout / budget) * 100)
  );
}

function campaignMatchesPlatform(
  campaign: Campaign,
  filter: string
) {
  if (filter === "All") return true;

  return campaign.platforms?.some((platform) =>
    platform
      .toLowerCase()
      .includes(filter.toLowerCase())
  );
}

export default function CreatorPage() {
  const [me, setMe] = useState<MeResponse | null>(null);
  const [campaigns, setCampaigns] = useState<Campaign[]>([]);
  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(null);

  const [search, setSearch] = useState("");
  const [platformFilter, setPlatformFilter] =
    useState("All");

  const [applicationStatuses, setApplicationStatuses] = useState<
  Record<number, string>
>({});

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadCreatorData() {
      try {
        setLoading(true);
        setError("");

        const [meResponse, campaignsResponse] =
          await Promise.all([
            fetch("/api/me"),
            fetch("/api/campaigns"),
          ]);

        if (!meResponse.ok) {
          throw new Error("Unable to load your account.");
        }

        if (!campaignsResponse.ok) {
          throw new Error("Unable to load campaigns.");
        }

        const meData = await meResponse.json();
        const campaignsData =
          await campaignsResponse.json();

        setMe(meData);

        const campaignList = Array.isArray(campaignsData)
          ? campaignsData
          : campaignsData.campaigns || [];

        setCampaigns(campaignList);

        if (campaignList.length > 0) {
          setSelectedCampaign(campaignList[0]);
        }
      } catch (err) {
        console.error(err);
        setError(
          "We couldn't load your creator dashboard."
        );
      } finally {
        setLoading(false);
      }
    }

    loadCreatorData();
  }, []);

  const creator = me?.creator;

  const creatorName =
    creator?.name ||
    me?.name ||
    "Creator";

  const username =
    creator?.username || "";

  const initials =
    creatorName.charAt(0).toUpperCase();

  const followers =
    creator?.followers ?? 0;

  const platforms =
    creator?.platforms ?? [];

  const filteredCampaigns = useMemo(() => {
    const query = search.trim().toLowerCase();

    return campaigns.filter((campaign) => {
      const matchesSearch =
        !query ||
        campaign.name
          ?.toLowerCase()
          .includes(query) ||
        campaign.brand
          ?.toLowerCase()
          .includes(query) ||
        campaign.description
          ?.toLowerCase()
          .includes(query);

      return (
        matchesSearch &&
        campaignMatchesPlatform(
          campaign,
          platformFilter
        )
      );
    });
  }, [
    campaigns,
    search,
    platformFilter,
  ]);
useEffect(() => {
  async function loadApplications() {
    try {
      const response = await fetch("/api/applications");

      if (!response.ok) {
        return;
      }

      const applications = await response.json();

      const statuses: Record<number, string> = {};

      for (const application of applications) {
        statuses[application.campaignId] = application.status;
      }

      setApplicationStatuses(statuses);
    } catch (error) {
      console.error("Failed to load applications:", error);
    }
  }

  loadApplications();
}, []);
  async function handleJoin(campaignId: number) {
  try {
    const response = await fetch("/api/applications", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        campaignId,
      }),
    });

    const data = await response.json();

    if (!response.ok) {
      alert(data.error || "Failed to apply to campaign.");
      return;
    }

    setApplicationStatuses((current) => ({
      ...current,
      [campaignId]: "PENDING",
    }));
  } catch (error) {
    console.error("Apply error:", error);
    alert("Something went wrong. Please try again.");
  }
}


  return (
    <main className="min-h-screen bg-[#070708] text-white">
      {/* Background */}
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-180px] top-[-180px] h-[420px] w-[420px] rounded-full bg-violet-600/[0.08] blur-[140px]" />
        <div className="absolute right-[-180px] top-[35%] h-[420px] w-[420px] rounded-full bg-indigo-500/[0.06] blur-[140px]" />
      </div>

      {/* Header */}
      <header className="sticky top-0 z-40 border-b border-white/[0.07] bg-[#09090a]/85 backdrop-blur-2xl">
        <div className="mx-auto flex h-[72px] max-w-[1450px] items-center justify-between px-6">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white text-sm font-black text-black shadow-lg shadow-white/5">
              G
            </div>

            <div>
              <div className="text-[15px] font-bold tracking-tight">
                UGC GOAT
              </div>

              <div className="text-[9px] uppercase tracking-[0.28em] text-white/25">
                Creator Network
              </div>
            </div>
          </div>

          <nav className="hidden items-center gap-8 text-sm text-white/40 md:flex">
            <button className="text-white">
              Explore
            </button>

            <button className="transition hover:text-white">
              My Campaigns
            </button>

            <button className="transition hover:text-white">
              Submissions
            </button>

            <button className="transition hover:text-white">
              Earnings
            </button>
          </nav>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <div className="text-sm font-medium">
                {creatorName}
              </div>

              <div className="text-[11px] text-white/30">
                {username
                  ? `@${username}`
                  : "Creator"}
              </div>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/10 bg-white text-sm font-bold text-black">
              {initials}
            </div>
          </div>
        </div>
      </header>

      <div className="relative mx-auto max-w-[1450px] px-6 py-10">
        {/* Hero */}
        <section className="mb-10">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div>
              <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-violet-400/15 bg-violet-400/[0.06] px-3 py-1.5 text-[10px] font-semibold uppercase tracking-[0.22em] text-violet-300">
                <span className="h-1.5 w-1.5 rounded-full bg-violet-400" />
                Creator marketplace
              </div>

              <h1 className="max-w-3xl text-4xl font-bold tracking-[-0.045em] sm:text-5xl lg:text-6xl">
                Find campaigns
                <br />
                worth creating for.
              </h1>

              <p className="mt-5 max-w-2xl text-sm leading-7 text-white/40 sm:text-base">
                Discover paid opportunities matched to
                your platforms and audience. Create,
                submit, and get paid.
              </p>
            </div>

            <div className="rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 shadow-2xl shadow-black/20 lg:min-w-[260px]">
              <div className="flex items-center justify-between">
                <span className="text-xs text-white/30">
                  Your profile
                </span>

                <span className="rounded-full border border-emerald-400/15 bg-emerald-400/[0.07] px-2 py-1 text-[9px] font-semibold uppercase tracking-wider text-emerald-400">
                  Active
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between">
                <div>
                  <div className="text-2xl font-bold">
                    {formatNumber(followers)}
                  </div>

                  <div className="mt-1 text-[11px] text-white/30">
                    total followers
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-2xl font-bold">
                    {campaigns.length}
                  </div>

                  <div className="mt-1 text-[11px] text-white/30">
                    live campaigns
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Account stats */}
        <section className="mb-10 grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.035]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                Followers
              </span>

              <span className="text-white/20">
                ◉
              </span>
            </div>

            <div className="mt-5 text-2xl font-bold tracking-tight">
              {formatNumber(followers)}
            </div>

            <div className="mt-1 text-xs text-white/25">
              Connected account
            </div>
          </div>

          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.035]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                T1 Audience
              </span>

              <span className="text-white/20">
                ◎
              </span>
            </div>

            <div className="mt-5 text-2xl font-bold tracking-tight">
              {creator?.t1Audience != null
                ? `${creator.t1Audience}%`
                : "Not connected"}
            </div>

            <div className="mt-1 text-xs text-white/25">
              Audience quality
            </div>
          </div>

          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.035]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                Engagement
              </span>

              <span className="text-white/20">
                ↗
              </span>
            </div>

            <div className="mt-5 text-2xl font-bold tracking-tight">
              {creator?.averageEngagement != null
                ? `${creator.averageEngagement}%`
                : "Not connected"}
            </div>

            <div className="mt-1 text-xs text-white/25">
              Average engagement
            </div>
          </div>

          <div className="group rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 transition hover:border-white/[0.13] hover:bg-white/[0.035]">
            <div className="flex items-center justify-between">
              <span className="text-[10px] font-semibold uppercase tracking-[0.18em] text-white/25">
                Platforms
              </span>

              <span className="text-white/20">
                ◆
              </span>
            </div>

            <div className="mt-5 text-2xl font-bold tracking-tight">
              {platforms.length || 0}
            </div>

            <div className="mt-1 text-xs text-white/25">
              {platforms.length
                ? platforms.join(" · ")
                : "Connect your accounts"}
            </div>
          </div>
        </section>

        {/* Marketplace heading */}
        <section>
          <div className="mb-5 flex flex-col justify-between gap-4 lg:flex-row lg:items-end">
            <div>
              <div className="text-[10px] font-semibold uppercase tracking-[0.24em] text-white/25">
                Opportunities
              </div>

              <h2 className="mt-2 text-2xl font-bold tracking-tight">
                Campaigns for you
              </h2>

              <p className="mt-1 text-sm text-white/30">
                {loading
                  ? "Finding available opportunities..."
                  : `${filteredCampaigns.length} opportunities available`}
              </p>
            </div>
          </div>

          {/* Search + filters */}
          <div className="mb-7 flex flex-col gap-3 lg:flex-row">
            <div className="relative flex-1">
              <span className="pointer-events-none absolute left-4 top-1/2 -translate-y-1/2 text-lg text-white/20">
                ⌕
              </span>

              <input
                value={search}
                onChange={(event) =>
                  setSearch(event.target.value)
                }
                placeholder="Search campaigns, brands or categories..."
                className="w-full rounded-xl border border-white/[0.08] bg-white/[0.025] py-3.5 pl-11 pr-4 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-violet-400/30 focus:bg-white/[0.04]"
              />
            </div>

            <div className="flex overflow-x-auto rounded-xl border border-white/[0.08] bg-white/[0.02] p-1">
              {platformFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  onClick={() =>
                    setPlatformFilter(filter)
                  }
                  className={`whitespace-nowrap rounded-lg px-4 py-2.5 text-xs font-medium transition ${
                    platformFilter === filter
                      ? "bg-white text-black shadow-lg"
                      : "text-white/35 hover:text-white"
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          </div>

          {/* Campaign cards */}
          {error && (
            <div className="mb-6 rounded-2xl border border-red-400/15 bg-red-400/[0.06] p-4 text-sm text-red-300">
              {error}
            </div>
          )}

          <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-3">
            {filteredCampaigns.map((campaign) => {
              const progress =
                getProgress(campaign);

              const applicationStatus =
                applicationStatuses[campaign.id];

              return (
                <article
                  key={campaign.id}
                  onClick={() =>
                    setSelectedCampaign(campaign)
                  }
                  className="group cursor-pointer overflow-hidden rounded-2xl border border-white/[0.08] bg-[#111112] transition duration-300 hover:-translate-y-1 hover:border-violet-400/25 hover:bg-[#151516] hover:shadow-2xl hover:shadow-violet-950/20"
                >
                  <div className="p-5">
                    {/* Brand */}
                    <div className="flex items-start justify-between gap-4">
                      <div className="flex min-w-0 items-center gap-3">
                        <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-gradient-to-br from-violet-500/20 via-indigo-500/10 to-white/[0.03] text-lg font-bold">
                          {campaign.brand
                            ?.charAt(0)
                            .toUpperCase() || "U"}
                        </div>

                        <div className="min-w-0">
                          <div className="text-[10px] uppercase tracking-[0.15em] text-white/25">
                            {campaign.brand}
                          </div>

                          <h3 className="mt-1 truncate text-[15px] font-semibold">
                            {campaign.name}
                          </h3>
                        </div>
                      </div>

                      <div className="shrink-0 rounded-full border border-emerald-400/10 bg-emerald-400/[0.06] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-emerald-400">
                        {campaign.status || "Active"}
                      </div>
                    </div>

                    {/* Description */}
                    <p className="mt-5 line-clamp-2 text-sm leading-6 text-white/40">
                      {campaign.description}
                    </p>

                    {/* Platforms */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {campaign.platforms?.map(
                        (platform) => (
                          <span
                            key={platform}
                            className="rounded-md border border-white/[0.07] bg-white/[0.025] px-2 py-1 text-[10px] text-white/40"
                          >
                            {platform}
                          </span>
                        )
                      )}
                    </div>

                    {/* Payout */}
                    <div className="mt-5 rounded-xl border border-white/[0.06] bg-black/20 p-4">
                      <div className="flex items-end justify-between">
                        <div>
                          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/20">
                            Creator payout
                          </div>

                          <div className="mt-1 text-xl font-bold">
                            {formatMoney(
                              campaign.payoutRate
                            )}
                          </div>
                        </div>

                        <div className="text-right">
                          <div className="text-[9px] font-semibold uppercase tracking-[0.18em] text-white/20">
                            Budget
                          </div>

                          <div className="mt-1 text-sm font-semibold text-white/60">
                            {formatMoney(
                              campaign.totalBudget
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Progress */}
                    {progress !== null && (
                      <div className="mt-5">
                        <div className="mb-2 flex justify-between text-[9px] uppercase tracking-[0.12em] text-white/20">
                          <span>Campaign capacity</span>
                          <span>
                            {Math.round(progress)}%
                          </span>
                        </div>

                        <div className="h-1 overflow-hidden rounded-full bg-white/[0.07]">
                          <div
                            className="h-full rounded-full bg-gradient-to-r from-violet-500 to-indigo-400"
                            style={{
                              width: `${progress}%`,
                            }}
                          />
                        </div>
                      </div>
                    )}

                    {/* Footer */}
                    <div className="mt-5 flex items-center justify-between border-t border-white/[0.06] pt-4">
                      <div>
                        <div className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                          Deadline
                        </div>

                        <div className="mt-1 text-xs font-medium text-white/55">
                          {formatDeadline(
                            campaign.deadline
                          )}
                        </div>
                      </div>

                      <button
                        type="button"
                        onClick={(event) => {
                          event.stopPropagation();
                          setSelectedCampaign(campaign);
                        }}
                        className={`rounded-lg px-3.5 py-2 text-[11px] font-semibold transition ${
                          applicationStatus
                            ? "border border-white/10 bg-white/[0.04] text-white/45"
                            : "bg-white text-black hover:bg-white/90"
                        }`}
                      >
                        {applicationStatus === "PENDING"
                          ? "Application pending"
                          : applicationStatus === "APPROVED"
                          ? "Joined"
                          : applicationStatus === "REJECTED"
                          ? "Application rejected"
                          : "View opportunity"}
                      </button>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>

          {!loading &&
            filteredCampaigns.length === 0 && (
              <div className="rounded-2xl border border-white/[0.07] bg-white/[0.02] px-6 py-20 text-center">
                <div className="text-3xl text-white/20">
                  ⌕
                </div>

                <h3 className="mt-4 text-lg font-semibold">
                  No opportunities found
                </h3>

                <p className="mt-2 text-sm text-white/30">
                  Try another search or platform.
                </p>
              </div>
            )}
        </section>
      </div>

      {/* Campaign detail */}
      {selectedCampaign && (
        <div
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/75 p-0 backdrop-blur-md sm:items-center sm:p-6"
          onClick={() =>
            setSelectedCampaign(null)
          }
        >
          <div
            onClick={(event) =>
              event.stopPropagation()
            }
            className="max-h-[94vh] w-full max-w-3xl overflow-y-auto rounded-t-3xl border border-white/10 bg-[#101011] shadow-[0_30px_100px_rgba(0,0,0,0.7)] sm:rounded-3xl"
          >
            {/* Modal header */}
            <div className="sticky top-0 z-10 border-b border-white/[0.07] bg-[#101011]/95 px-6 py-5 backdrop-blur-xl">
              <div className="flex items-start justify-between gap-5">
                <div className="flex items-center gap-4">
                  <div className="flex h-14 w-14 items-center justify-center rounded-2xl border border-white/10 bg-gradient-to-br from-violet-500/20 to-indigo-500/10 text-xl font-bold">
                    {selectedCampaign.brand
                      ?.charAt(0)
                      .toUpperCase() || "U"}
                  </div>

                  <div>
                    <div className="text-[10px] uppercase tracking-[0.2em] text-white/25">
                      {selectedCampaign.brand}
                    </div>

                    <h2 className="mt-1 text-xl font-bold tracking-tight sm:text-2xl">
                      {selectedCampaign.name}
                    </h2>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setSelectedCampaign(null)
                  }
                  className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-white/[0.08] bg-white/[0.03] text-lg text-white/40 transition hover:bg-white/[0.07] hover:text-white"
                >
                  ×
                </button>
              </div>
            </div>

            <div className="p-6">
              {/* Main payout */}
              <div className="grid gap-3 sm:grid-cols-2">
                <div className="rounded-2xl border border-violet-400/10 bg-violet-400/[0.04] p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-violet-300/50">
                    Creator payout
                  </div>

                  <div className="mt-2 text-3xl font-bold">
                    {formatMoney(
                      selectedCampaign.payoutRate
                    )}
                  </div>

                  <div className="mt-1 text-xs text-white/25">
                    campaign payout
                  </div>
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <div className="text-[10px] uppercase tracking-[0.18em] text-white/25">
                    Campaign budget
                  </div>

                  <div className="mt-2 text-3xl font-bold">
                    {formatMoney(
                      selectedCampaign.totalBudget
                    )}
                  </div>

                  <div className="mt-1 text-xs text-white/25">
                    available campaign budget
                  </div>
                </div>
              </div>

              {/* Info */}
              <div className="mt-4 grid gap-3 sm:grid-cols-4">
                <div className="rounded-xl bg-white/[0.025] p-4">
                  <div className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                    Platforms
                  </div>

                  <div className="mt-2 text-xs font-medium text-white/60">
                    {selectedCampaign.platforms?.join(
                      " · "
                    ) || "—"}
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.025] p-4">
                  <div className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                    T1 requirement
                  </div>

                  <div className="mt-2 text-xs font-medium text-white/60">
                    {selectedCampaign.minT1Audience != null
                      ? `${selectedCampaign.minT1Audience}%+`
                      : "Not specified"}
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.025] p-4">
                  <div className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                    Deadline
                  </div>

                  <div className="mt-2 text-xs font-medium text-white/60">
                    {formatDeadline(
                      selectedCampaign.deadline
                    )}
                  </div>
                </div>

                <div className="rounded-xl bg-white/[0.025] p-4">
                  <div className="text-[9px] uppercase tracking-[0.15em] text-white/20">
                    Status
                  </div>

                  <div className="mt-2 text-xs font-medium text-emerald-400">
                    {selectedCampaign.status ||
                      "Active"}
                  </div>
                </div>
              </div>

              {/* Brief */}
              <div className="mt-8">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Campaign brief
                </div>

                <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                  <p className="whitespace-pre-line text-sm leading-7 text-white/55">
                    {selectedCampaign.description}
                  </p>
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-8">
                <div className="mb-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-white/25">
                  Requirements
                </div>

                <div className="space-y-3">
                  {selectedCampaign.creatorRequirements && (
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <div className="text-xs font-semibold text-white/70">
                        Creator requirements
                      </div>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/45">
                        {
                          selectedCampaign.creatorRequirements
                        }
                      </p>
                    </div>
                  )}

                  {selectedCampaign.creatorCriteria && (
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <div className="text-xs font-semibold text-white/70">
                        Creator criteria
                      </div>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/45">
                        {
                          selectedCampaign.creatorCriteria
                        }
                      </p>
                    </div>
                  )}

                  {selectedCampaign.audienceRequirement && (
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <div className="text-xs font-semibold text-white/70">
                        Audience requirement
                      </div>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/45">
                        {
                          selectedCampaign.audienceRequirement
                        }
                      </p>
                    </div>
                  )}

                  {selectedCampaign.submissionRequirements && (
                    <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5">
                      <div className="text-xs font-semibold text-white/70">
                        Submission requirements
                      </div>

                      <p className="mt-2 whitespace-pre-line text-sm leading-6 text-white/45">
                        {
                          selectedCampaign.submissionRequirements
                        }
                      </p>
                    </div>
                  )}

                  {!selectedCampaign.creatorRequirements &&
                    !selectedCampaign.creatorCriteria &&
                    !selectedCampaign.audienceRequirement &&
                    !selectedCampaign.submissionRequirements && (
                      <div className="rounded-2xl border border-white/[0.07] bg-white/[0.025] p-5 text-sm text-white/30">
                        No additional requirements
                        provided.
                      </div>
                    )}
                </div>
              </div>

              {/* Join */}
              <div className="mt-8 border-t border-white/[0.07] pt-6">
                <button
                  type="button"
                  onClick={() => {
                    const status =
                      applicationStatuses[selectedCampaign.id];

                    if (!status) {
                      handleJoin(selectedCampaign.id);
                    }
                  }}
                  className={`w-full rounded-xl py-4 text-sm font-bold transition ${
                    applicationStatuses[selectedCampaign.id]
                      ? "border border-white/10 bg-white/[0.04] text-white/50"
                      : "bg-white text-black hover:-translate-y-0.5 hover:bg-white/90"
                  }`}
                >
                  {applicationStatuses[selectedCampaign.id] === "PENDING"
                    ? "Application Pending"
                    : applicationStatuses[selectedCampaign.id] === "APPROVED"
                    ? "✓ Joined Campaign"
                    : applicationStatuses[selectedCampaign.id] === "REJECTED"
                    ? "Application Rejected"
                    : "Apply / Join Campaign"}
                </button>

                <p className="mt-3 text-center text-[10px] text-white/20">
                  Applications will be connected to your
                  creator account in the next step.
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </main>
  );
}