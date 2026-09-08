"use client";

import { useEffect, useMemo, useState } from "react";

type Campaign = {
  id: number;
  name: string;
  brand: string;
  description: string;
  platforms: string[];
  payoutRate: string;
  totalBudget: string;
  deadline: string;
  status: string;
  minT1Audience: number;
  creatorCriteria?: string;
  submissionRequirements?: string;
};

const navigation = [
  "Discover Campaigns",
  "My Campaigns",
  "My Submissions",
  "Earnings",
  "Profile",
];

const fallbackCampaigns: Campaign[] = [
  {
    id: 1,
    name: "PSL App Campaign",
    brand: "PSL",
    description:
      "Drive app downloads and product education through short-form lifestyle storytelling.",
    platforms: ["Instagram Reels", "TikTok"],
    payoutRate: "$1,200 / creator",
    totalBudget: "$18,500",
    deadline: "Sep 18, 2026",
    status: "Active",
    minT1Audience: 70,
    creatorCriteria: "Beauty, skincare, and wellness creators",
    submissionRequirements: "3 short-form videos and 1 story mention",
  },
  {
    id: 2,
    name: "Symmetrix Promotion",
    brand: "Symmetrix",
    description:
      "Create trend-led short-form content designed to build product awareness.",
    platforms: ["TikTok", "Instagram Reels"],
    payoutRate: "$900 / creator",
    totalBudget: "$12,000",
    deadline: "Sep 24, 2026",
    status: "Active",
    minT1Audience: 60,
    creatorCriteria: "Lifestyle, fashion, and product-review creators",
    submissionRequirements: "2 short-form videos",
  },
];

export default function CreatorPage() {
  const [activeTab, setActiveTab] = useState("Discover Campaigns");
  const [campaigns, setCampaigns] =
    useState<Campaign[]>(fallbackCampaigns);
  const [search, setSearch] = useState("");
  const [selectedCampaign, setSelectedCampaign] =
    useState<Campaign | null>(fallbackCampaigns[0]);
  const [appliedIds, setAppliedIds] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadCampaigns() {
      try {
        const response = await fetch("/api/campaigns");

        if (!response.ok) {
          throw new Error("Failed to load campaigns");
        }

        const data = await response.json();

        if (Array.isArray(data) && data.length > 0) {
          setCampaigns(data);
          setSelectedCampaign(data[0]);
        } else if (Array.isArray(data.campaigns) && data.campaigns.length > 0) {
          setCampaigns(data.campaigns);
          setSelectedCampaign(data.campaigns[0]);
        }
      } catch {
        // Keep the fallback campaigns.
      } finally {
        setLoading(false);
      }
    }

    loadCampaigns();
  }, []);

  const filteredCampaigns = useMemo(() => {
    const query = search.trim().toLowerCase();

    if (!query) return campaigns;

    return campaigns.filter(
      (campaign) =>
        campaign.name.toLowerCase().includes(query) ||
        campaign.brand.toLowerCase().includes(query) ||
        campaign.description.toLowerCase().includes(query)
    );
  }, [campaigns, search]);

  function handleApply(id: number) {
    setAppliedIds((current) =>
      current.includes(id) ? current : [...current, id]
    );
  }

  return (
    <main className="min-h-screen bg-[#f5f5f3] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/90 backdrop-blur">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-5 py-4">
          <div>
            <p className="text-lg font-bold tracking-tight">UGC GOAT</p>
            <p className="text-xs text-slate-500">Creator platform</p>
          </div>

          <div className="flex items-center gap-3">
            <div className="hidden text-right sm:block">
              <p className="text-sm font-medium">Creator</p>
              <p className="text-xs text-slate-500">Creator account</p>
            </div>

            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-slate-900 text-sm font-semibold text-white">
              C
            </div>
          </div>
        </div>
      </header>

      <div className="mx-auto max-w-7xl px-5 py-8">
        <section className="mb-6 rounded-2xl border border-slate-200 bg-white p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-slate-500">
            Creator portal
          </p>

          <div className="mt-2 flex flex-col justify-between gap-5 md:flex-row md:items-end">
            <div>
              <h1 className="text-3xl font-semibold tracking-[-0.05em]">
                Welcome back.
              </h1>

              <p className="mt-2 max-w-xl text-sm leading-6 text-slate-500">
                Discover campaigns, join opportunities, submit your content,
                and track your earnings.
              </p>
            </div>

            <div className="grid grid-cols-3 gap-2">
              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Campaigns</p>
                <p className="mt-1 text-lg font-semibold">{campaigns.length}</p>
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Joined</p>
                <p className="mt-1 text-lg font-semibold">
                  {appliedIds.length}
                </p>
              </div>

              <div className="rounded-xl bg-slate-50 px-4 py-3">
                <p className="text-xs text-slate-500">Status</p>
                <p className="mt-1 text-lg font-semibold">Active</p>
              </div>
            </div>
          </div>
        </section>

        <nav className="mb-6 overflow-x-auto rounded-2xl border border-slate-200 bg-white p-1">
          <div className="flex min-w-max gap-1">
            {navigation.map((item) => (
              <button
                key={item}
                type="button"
                onClick={() => setActiveTab(item)}
                className={`rounded-xl px-4 py-2.5 text-sm font-medium transition ${
                  activeTab === item
                    ? "bg-slate-900 text-white"
                    : "text-slate-500 hover:bg-slate-50 hover:text-slate-900"
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>

        {activeTab === "Discover Campaigns" && (
          <div className="grid gap-5 xl:grid-cols-[1.4fr_0.8fr]">
            <section className="rounded-2xl border border-slate-200 bg-white">
              <div className="border-b border-slate-200 p-5">
                <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
                  <div>
                    <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                      Discover
                    </p>
                    <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
                      Available campaigns
                    </h2>
                  </div>

                  <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-medium text-slate-600">
                    {loading ? "Loading..." : `${filteredCampaigns.length} live`}
                  </span>
                </div>

                <input
                  type="text"
                  placeholder="Search campaigns or brands..."
                  value={search}
                  onChange={(event) => setSearch(event.target.value)}
                  className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm outline-none transition focus:border-slate-400"
                />
              </div>

              <div className="space-y-3 p-4">
                {filteredCampaigns.map((campaign) => {
                  const applied = appliedIds.includes(campaign.id);
                  const selected = selectedCampaign?.id === campaign.id;

                  return (
                    <div
                      key={campaign.id}
                      onClick={() => setSelectedCampaign(campaign)}
                      className={`cursor-pointer rounded-2xl border p-4 transition ${
                        selected
                          ? "border-slate-400 bg-slate-50"
                          : "border-slate-200 hover:border-slate-300 hover:bg-slate-50"
                      }`}
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div>
                          <h3 className="font-semibold tracking-tight">
                            {campaign.name}
                          </h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {campaign.brand}
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-medium text-emerald-700">
                          {campaign.status}
                        </span>
                      </div>

                      <p className="mt-3 text-sm leading-6 text-slate-600">
                        {campaign.description}
                      </p>

                      <div className="mt-4 flex flex-wrap gap-2">
                        {campaign.platforms.map((platform) => (
                          <span
                            key={platform}
                            className="rounded-full border border-slate-200 bg-white px-2.5 py-1 text-xs text-slate-600"
                          >
                            {platform}
                          </span>
                        ))}
                      </div>

                      <div className="mt-4 grid gap-2 sm:grid-cols-3">
                        <div className="rounded-xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Payout</p>
                          <p className="mt-1 text-sm font-semibold">
                            {campaign.payoutRate}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Budget</p>
                          <p className="mt-1 text-sm font-semibold">
                            {campaign.totalBudget}
                          </p>
                        </div>

                        <div className="rounded-xl bg-slate-100 p-3">
                          <p className="text-xs text-slate-500">Deadline</p>
                          <p className="mt-1 text-sm font-semibold">
                            {campaign.deadline}
                          </p>
                        </div>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-3">
                        <span className="text-xs text-slate-500">
                          T1 audience: {campaign.minT1Audience}%+
                        </span>

                        <button
                          type="button"
                          onClick={(event) => {
                            event.stopPropagation();
                            handleApply(campaign.id);
                          }}
                          className={`rounded-full px-4 py-2 text-sm font-medium transition ${
                            applied
                              ? "border border-slate-200 bg-white text-slate-700"
                              : "bg-slate-900 text-white hover:bg-slate-700"
                          }`}
                        >
                          {applied ? "Applied" : "Apply / Join"}
                        </button>
                      </div>
                    </div>
                  );
                })}
              </div>
            </section>

            <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5">
              {selectedCampaign ? (
                <>
                  <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
                    Campaign brief
                  </p>

                  <h2 className="mt-2 text-2xl font-semibold tracking-[-0.04em]">
                    {selectedCampaign.name}
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    {selectedCampaign.brand}
                  </p>

                  <div className="mt-5 rounded-xl bg-slate-50 p-4">
                    <p className="text-sm leading-6 text-slate-600">
                      {selectedCampaign.description}
                    </p>
                  </div>

                  <div className="mt-5 space-y-3">
                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-500">Platforms</span>
                      <span className="text-right font-medium">
                        {selectedCampaign.platforms.join(", ")}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-500">Payout</span>
                      <span className="font-medium">
                        {selectedCampaign.payoutRate}
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-500">T1 requirement</span>
                      <span className="font-medium">
                        {selectedCampaign.minT1Audience}%+
                      </span>
                    </div>

                    <div className="flex justify-between gap-4 text-sm">
                      <span className="text-slate-500">Deadline</span>
                      <span className="font-medium">
                        {selectedCampaign.deadline}
                      </span>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => handleApply(selectedCampaign.id)}
                    className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 text-sm font-medium text-white transition hover:bg-slate-700"
                  >
                    {appliedIds.includes(selectedCampaign.id)
                      ? "Already Applied"
                      : "Apply to Campaign"}
                  </button>
                </>
              ) : (
                <p className="text-sm text-slate-500">
                  Select a campaign to view its brief.
                </p>
              )}
            </aside>
          </div>
        )}

        {activeTab === "My Campaigns" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-5">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              My campaigns
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
              Campaigns you joined
            </h2>

            <div className="mt-5 space-y-3">
              {appliedIds.length === 0 ? (
                <div className="rounded-xl bg-slate-50 p-6 text-center">
                  <p className="font-medium">No campaigns joined yet.</p>
                  <p className="mt-1 text-sm text-slate-500">
                    Discover a campaign and apply to get started.
                  </p>
                </div>
              ) : (
                campaigns
                  .filter((campaign) => appliedIds.includes(campaign.id))
                  .map((campaign) => (
                    <div
                      key={campaign.id}
                      className="rounded-xl border border-slate-200 p-4"
                    >
                      <div className="flex items-center justify-between gap-3">
                        <div>
                          <h3 className="font-semibold">{campaign.name}</h3>
                          <p className="mt-1 text-sm text-slate-500">
                            {campaign.brand}
                          </p>
                        </div>

                        <span className="rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
                          Joined
                        </span>
                      </div>
                    </div>
                  ))
              )}
            </div>
          </section>
        )}

        {activeTab === "My Submissions" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-8">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              My submissions
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
              Submission history
            </h2>

            <div className="mt-6 rounded-xl bg-slate-50 p-8 text-center">
              <p className="font-medium">No submissions yet</p>
              <p className="mt-1 text-sm text-slate-500">
                Your submitted campaign content will appear here.
              </p>
            </div>
          </section>
        )}

        {activeTab === "Earnings" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Earnings
            </p>
            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
              Your earnings
            </h2>

            <div className="mt-6 grid gap-4 sm:grid-cols-3">
              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Total earned</p>
                <p className="mt-2 text-3xl font-semibold">$0</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Pending</p>
                <p className="mt-2 text-3xl font-semibold">$0</p>
              </div>

              <div className="rounded-2xl bg-slate-50 p-5">
                <p className="text-sm text-slate-500">Paid</p>
                <p className="mt-2 text-3xl font-semibold">$0</p>
              </div>
            </div>
          </section>
        )}

        {activeTab === "Profile" && (
          <section className="rounded-2xl border border-slate-200 bg-white p-6">
            <p className="text-xs font-semibold uppercase tracking-[0.14em] text-slate-500">
              Profile
            </p>

            <h2 className="mt-1 text-2xl font-semibold tracking-[-0.04em]">
              Creator profile
            </h2>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-900 text-xl font-semibold text-white">
                C
              </div>

              <div>
                <h3 className="font-semibold">Creator Account</h3>
                <p className="text-sm text-slate-500">
                  Connect your social accounts and complete your profile.
                </p>
              </div>
            </div>
          </section>
        )}
      </div>
    </main>
  );
}