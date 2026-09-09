import Link from "next/link";

const opportunities = [
  {
    category: "Lifestyle",
    title: "Lifestyle Creator Campaign",
    payout: "$180",
    platforms: ["Instagram", "TikTok"],
    spots: "12 spots left",
    icon: "✦",
  },
  {
    category: "Technology",
    title: "Tech Product Launch",
    payout: "$250",
    platforms: ["YouTube", "TikTok"],
    spots: "8 spots left",
    icon: "◈",
  },
  {
    category: "Fashion",
    title: "Fashion Creator Campaign",
    payout: "$150",
    platforms: ["Instagram", "TikTok"],
    spots: "20 spots left",
    icon: "◇",
  },
  {
    category: "Gaming",
    title: "Gaming Campaign",
    payout: "$200",
    platforms: ["YouTube", "Twitch"],
    spots: "15 spots left",
    icon: "⌁",
  },
];

const steps = [
  {
    number: "01",
    icon: "⌕",
    title: "Discover",
    text: "Browse campaigns that match your content, audience, and style.",
  },
  {
    number: "02",
    icon: "◉",
    title: "Create",
    text: "Join an opportunity, follow the brief, and create your content.",
  },
  {
    number: "03",
    icon: "✓",
    title: "Get approved",
    text: "Submit your content and let brands review your work.",
  },
  {
    number: "04",
    icon: "$",
    title: "Get paid",
    text: "Track your earnings and manage your opportunities in one place.",
  },
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-[#05070c] text-white">
      <style>{`
        @keyframes floatOne {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50% { transform: translateY(-14px) rotate(1deg); }
        }

        @keyframes floatTwo {
          0%, 100% { transform: translateY(0) rotate(1deg); }
          50% { transform: translateY(12px) rotate(-1deg); }
        }

        @keyframes floatThree {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-9px); }
        }

        @keyframes glowPulse {
          0%, 100% { opacity: .35; transform: scale(1); }
          50% { opacity: .6; transform: scale(1.08); }
        }

        @keyframes gridMove {
          from { transform: translateY(0); }
          to { transform: translateY(40px); }
        }

        @keyframes shine {
          0% { transform: translateX(-140%) skewX(-18deg); }
          100% { transform: translateX(260%) skewX(-18deg); }
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .hero-one {
          animation: floatOne 6s ease-in-out infinite;
        }

        .hero-two {
          animation: floatTwo 7s ease-in-out infinite;
        }

        .hero-three {
          animation: floatThree 5s ease-in-out infinite;
        }

        .glow-pulse {
          animation: glowPulse 6s ease-in-out infinite;
        }

        .grid-move {
          animation: gridMove 12s linear infinite;
        }

        .shine {
          animation: shine 3.5s ease-in-out infinite;
        }

        .fade-up {
          animation: fadeUp .8s ease-out both;
        }

        .delay-1 {
          animation-delay: .12s;
        }

        .delay-2 {
          animation-delay: .24s;
        }

        .delay-3 {
          animation-delay: .36s;
        }
      `}</style>

      {/* Ambient background */}
      <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
        <div className="glow-pulse absolute left-[-15%] top-[5%] h-[520px] w-[520px] rounded-full bg-violet-600/20 blur-[150px]" />
        <div className="glow-pulse absolute right-[-12%] top-[20%] h-[560px] w-[560px] rounded-full bg-blue-600/15 blur-[160px]" />
        <div className="absolute left-[38%] top-[20%] h-[500px] w-[500px] rounded-full bg-indigo-500/[0.08] blur-[150px]" />

        <div
          className="grid-move absolute inset-0 opacity-[0.055]"
          style={{
            backgroundImage:
              "linear-gradient(rgba(255,255,255,.35) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.35) 1px, transparent 1px)",
            backgroundSize: "48px 48px",
          }}
        />
      </div>

      {/* Navbar */}
      <nav className="relative z-20 mx-auto flex max-w-7xl items-center justify-between px-6 py-6 lg:px-10">
        <Link href="/" className="group flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white text-sm font-black text-black shadow-[0_0_30px_rgba(255,255,255,.12)] transition duration-300 group-hover:scale-105">
            G
          </div>

          <div>
            <div className="text-[17px] font-bold tracking-[-0.02em]">
              UGC GOAT
            </div>
            <div className="text-[9px] font-medium uppercase tracking-[0.28em] text-white/35">
              Creator Platform
            </div>
          </div>
        </Link>

        <div className="hidden items-center gap-9 text-sm text-white/45 md:flex">
          <a
            href="#how-it-works"
            className="transition duration-200 hover:text-white"
          >
            How it works
          </a>

          <a
            href="#opportunities"
            className="transition duration-200 hover:text-white"
          >
            Opportunities
          </a>

          <a
            href="#creators"
            className="transition duration-200 hover:text-white"
          >
            For creators
          </a>

          <a
            href="#brands"
            className="transition duration-200 hover:text-white"
          >
            For brands
          </a>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/login"
            className="rounded-xl border border-white/10 bg-white/[0.025] px-5 py-2.5 text-sm font-medium text-white/80 transition duration-300 hover:border-white/20 hover:bg-white/[0.07] hover:text-white"
          >
            Log in
          </Link>

          <Link
            href="/creator"
            className="hidden rounded-xl bg-white px-5 py-2.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-0.5 hover:bg-white/90 sm:block"
          >
            Join as a Creator →
          </Link>
        </div>
      </nav>

      {/* Hero */}
      <section className="relative z-10 mx-auto max-w-7xl px-6 pb-24 pt-20 lg:px-10 lg:pb-32 lg:pt-28">
        <div className="grid items-center gap-16 lg:grid-cols-[.95fr_1.05fr]">
          {/* Hero copy */}
          <div className="fade-up max-w-2xl">
            <div className="mb-7 inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/[0.035] px-4 py-2 text-xs text-white/55 shadow-[0_0_30px_rgba(99,102,241,.08)] backdrop-blur">
              <span className="h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,.8)]" />
              The creator economy, upgraded
            </div>

            <h1 className="text-[clamp(3.5rem,7vw,6.5rem)] font-semibold leading-[.94] tracking-[-0.065em]">
              Turn your content
              <br />
              into{" "}
              <span className="bg-gradient-to-r from-violet-300 via-indigo-400 to-blue-400 bg-clip-text text-transparent">
                opportunities.
              </span>
            </h1>

            <p className="mt-8 max-w-xl text-lg leading-8 text-white/45 sm:text-xl">
              Discover campaigns, create content, and get paid — all from one
              creator platform built for opportunities.
            </p>

            <div className="mt-10 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/creator"
                className="group relative overflow-hidden rounded-xl bg-white px-7 py-4 text-center text-sm font-semibold text-black shadow-[0_10px_40px_rgba(255,255,255,.08)] transition duration-300 hover:-translate-y-1 hover:shadow-[0_15px_50px_rgba(255,255,255,.14)]"
              >
                <span className="relative z-10">
                  Join as a Creator
                  <span className="ml-2 inline-block transition-transform duration-300 group-hover:translate-x-1">
                    →
                  </span>
                </span>

                <span className="shine absolute inset-y-0 left-0 w-1/3 bg-white/50 blur-md" />
              </Link>

              <Link
                href="/login"
                className="rounded-xl border border-white/10 bg-white/[0.025] px-7 py-4 text-center text-sm font-semibold text-white/80 transition duration-300 hover:-translate-y-1 hover:border-white/20 hover:bg-white/[0.06] hover:text-white"
              >
                Log in
              </Link>
            </div>

            <div className="mt-9 flex flex-wrap gap-x-7 gap-y-3 text-xs text-white/35">
              <span>✓ Discover campaigns</span>
              <span>✓ Submit content</span>
              <span>✓ Track earnings</span>
              <span>✓ Get paid</span>
            </div>
          </div>

          {/* Product visual */}
          <div className="relative mx-auto h-[520px] w-full max-w-[650px]">
            {/* Main glow */}
            <div className="glow-pulse absolute left-1/2 top-1/2 h-[330px] w-[330px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-violet-600/20 blur-[100px]" />

            {/* Main dashboard */}
            <div className="hero-three absolute right-[1%] top-[9%] w-[82%] overflow-hidden rounded-2xl border border-white/15 bg-[#0c1019]/95 shadow-[0_30px_100px_rgba(0,0,0,.55),0_0_80px_rgba(79,70,229,.12)] backdrop-blur-xl">
              {/* Dashboard topbar */}
              <div className="flex items-center justify-between border-b border-white/10 px-5 py-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-7 w-7 items-center justify-center rounded-lg bg-white text-[10px] font-black text-black">
                    G
                  </div>
                  <span className="text-xs font-semibold text-white/80">
                    UGC GOAT
                  </span>
                </div>

                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-white/10 text-[10px] text-white/70">
                  C
                </div>
              </div>

              <div className="grid grid-cols-[125px_1fr]">
                {/* Sidebar */}
                <div className="border-r border-white/10 p-3">
                  {[
                    "Dashboard",
                    "Campaigns",
                    "Submissions",
                    "Earnings",
                    "Messages",
                  ].map((item, index) => (
                    <div
                      key={item}
                      className={`mb-1 rounded-lg px-3 py-2 text-[9px] ${
                        index === 0
                          ? "bg-indigo-500/15 text-indigo-300"
                          : "text-white/30"
                      }`}
                    >
                      {item}
                    </div>
                  ))}
                </div>

                {/* Dashboard content */}
                <div className="p-5">
                  <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">
                    Creator dashboard
                  </div>

                  <div className="mt-2 text-xl font-semibold">
                    Good evening, Creator.
                  </div>

                  <div className="mt-6 grid grid-cols-2 gap-3">
                    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="text-[8px] text-white/30">
                        TOTAL EARNINGS
                      </div>

                      <div className="mt-2 text-2xl font-semibold">
                        $1,840
                      </div>

                      <div className="mt-1 text-[9px] text-emerald-400">
                        +18.4% this month
                      </div>
                    </div>

                    <div className="rounded-xl border border-white/10 bg-white/[0.025] p-4">
                      <div className="text-[8px] text-white/30">
                        ACTIVE CAMPAIGNS
                      </div>

                      <div className="mt-2 text-2xl font-semibold">08</div>

                      <div className="mt-1 text-[9px] text-indigo-300">
                        3 new opportunities
                      </div>
                    </div>
                  </div>

                  {/* Chart */}
                  <div className="mt-3 rounded-xl border border-white/10 bg-white/[0.025] p-4">
                    <div className="flex items-center justify-between">
                      <span className="text-[8px] text-white/30">
                        EARNINGS OVERVIEW
                      </span>

                      <span className="text-[8px] text-white/30">
                        Last 30 days
                      </span>
                    </div>

                    <div className="mt-5 flex h-[105px] items-end gap-2">
                      {[25, 38, 32, 49, 43, 62, 55, 73, 66, 82, 75, 94].map(
                        (height, index) => (
                          <div
                            key={index}
                            className="flex-1 rounded-t-md bg-gradient-to-t from-indigo-600/30 to-violet-400/80 transition-all duration-500 hover:from-indigo-500/50 hover:to-violet-300"
                            style={{ height: `${height}%` }}
                          />
                        )
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Campaign card */}
            <div className="hero-one absolute left-[0%] top-[5%] z-10 w-[245px] rounded-2xl border border-indigo-400/25 bg-[#0d111b]/95 p-5 shadow-[0_25px_70px_rgba(0,0,0,.5),0_0_40px_rgba(99,102,241,.1)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider text-indigo-300">
                  New campaign
                </span>

                <span className="text-[9px] text-white/30">2h ago</span>
              </div>

              <div className="mt-5 text-lg font-semibold">
                Lifestyle Campaign
              </div>

              <p className="mt-2 text-xs leading-5 text-white/35">
                Create short-form content for an upcoming product launch.
              </p>

              <div className="mt-4 flex gap-2">
                <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-white/60">
                  Instagram
                </span>
                <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-white/60">
                  TikTok
                </span>
              </div>

              <div className="mt-5 flex items-end justify-between border-t border-white/10 pt-4">
                <div>
                  <div className="text-[8px] text-white/30">PAYOUT</div>
                  <div className="mt-1 text-lg font-semibold">$180</div>
                </div>

                <div className="rounded-full bg-emerald-400/10 px-2 py-1 text-[8px] text-emerald-400">
                  Application open
                </div>
              </div>
            </div>

            {/* Opportunity card */}
            <div className="hero-two absolute bottom-[7%] left-[13%] z-20 w-[270px] rounded-2xl border border-indigo-400/20 bg-[#0d111b]/95 p-5 shadow-[0_25px_70px_rgba(0,0,0,.5)] backdrop-blur-xl">
              <div className="flex items-center justify-between">
                <span className="text-[9px] uppercase tracking-wider text-white/30">
                  New opportunity
                </span>

                <span className="text-[9px] text-white/30">1d ago</span>
              </div>

              <div className="mt-4 text-base font-semibold">
                Tech Product Campaign
              </div>

              <div className="mt-1 text-xl font-semibold text-white">
                $250{" "}
                <span className="text-xs font-normal text-white/35">
                  / creator
                </span>
              </div>

              <div className="mt-4 flex gap-2">
                <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-white/55">
                  YouTube
                </span>

                <span className="rounded-md bg-white/5 px-2 py-1 text-[9px] text-white/55">
                  TikTok
                </span>
              </div>

              <div className="mt-5 rounded-lg border border-white/10 bg-white/[0.03] py-2 text-center text-[10px] font-medium text-white/70 transition hover:bg-white/[0.07]">
                View opportunity →
              </div>
            </div>

            {/* Payment card */}
            <div className="hero-three absolute bottom-[3%] right-[0%] z-30 w-[190px] rounded-2xl border border-emerald-400/15 bg-[#0d111b]/95 p-4 shadow-[0_25px_70px_rgba(0,0,0,.5)] backdrop-blur-xl">
              <div className="flex items-center gap-2">
                <div className="flex h-7 w-7 items-center justify-center rounded-full bg-emerald-400/10 text-xs text-emerald-400">
                  $
                </div>

                <div className="text-[9px] text-white/40">
                  PAYMENT RECEIVED
                </div>
              </div>

              <div className="mt-4 text-2xl font-semibold">$120</div>

              <div className="mt-1 text-[9px] text-white/30">
                From brand campaign
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust strip */}
      <section className="relative z-10 border-y border-white/[0.08] bg-white/[0.015]">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-6 px-6 py-7 lg:flex-row lg:px-10">
          <span className="text-[10px] uppercase tracking-[0.25em] text-white/25">
            Built for the creator economy
          </span>

          <div className="flex flex-wrap justify-center gap-x-9 gap-y-3 text-xs font-medium text-white/25">
            <span>Instagram</span>
            <span>TikTok</span>
            <span>YouTube</span>
            <span>Discord</span>
            <span>Shopify</span>
            <span>Notion</span>
            <span>Canva</span>
          </div>
        </div>
      </section>

      {/* How it works */}
      <section
        id="how-it-works"
        className="relative z-10 mx-auto max-w-7xl px-6 py-28 lg:px-10"
      >
        <div className="grid gap-14 lg:grid-cols-[.7fr_1.3fr]">
          <div>
            <div className="text-[10px] uppercase tracking-[0.28em] text-indigo-300/70">
              How it works
            </div>

            <h2 className="mt-4 text-4xl font-semibold leading-tight tracking-[-0.04em] sm:text-5xl">
              A simple process.
              <br />
              <span className="text-white/35">Real opportunities.</span>
            </h2>

            <p className="mt-5 max-w-md text-sm leading-7 text-white/35">
              Go from discovering a campaign to getting paid without jumping
              between different tools.
            </p>
          </div>

          <div className="grid gap-3 sm:grid-cols-2">
            {steps.map((step) => (
              <div
                key={step.number}
                className="group rounded-2xl border border-white/10 bg-white/[0.02] p-6 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/20 hover:bg-white/[0.04]"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-10 w-10 items-center justify-center rounded-xl border border-white/10 bg-white/[0.03] text-indigo-300 transition group-hover:border-indigo-400/30">
                    {step.icon}
                  </div>

                  <span className="text-[10px] text-white/20">
                    {step.number}
                  </span>
                </div>

                <h3 className="mt-9 font-semibold">{step.title}</h3>

                <p className="mt-2 text-sm leading-6 text-white/35">
                  {step.text}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Opportunities */}
      <section
        id="opportunities"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-28 lg:px-10"
      >
        <div className="rounded-3xl border border-white/10 bg-white/[0.02] p-6 sm:p-9">
          <div className="flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div>
              <div className="text-[10px] uppercase tracking-[0.28em] text-indigo-300/70">
                Featured opportunities
              </div>

              <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
                Campaigns for every creator.
              </h2>

              <p className="mt-3 text-sm text-white/35">
                Find opportunities that match your style and content.
              </p>
            </div>

            <Link
              href="/creator"
              className="text-sm text-white/45 transition hover:text-white"
            >
              View all campaigns →
            </Link>
          </div>

          <div className="mt-8 flex gap-2 overflow-x-auto pb-2">
            {[
              "All",
              "Lifestyle",
              "Technology",
              "Fashion",
              "Fitness",
              "Gaming",
              "Food",
            ].map((category, index) => (
              <span
                key={category}
                className={`whitespace-nowrap rounded-full border px-4 py-2 text-xs ${
                  index === 0
                    ? "border-indigo-400/30 bg-indigo-500/15 text-indigo-200"
                    : "border-white/10 bg-white/[0.02] text-white/35"
                }`}
              >
                {category}
              </span>
            ))}
          </div>

          <div className="mt-6 grid gap-3 md:grid-cols-2 xl:grid-cols-4">
            {opportunities.map((opportunity) => (
              <div
                key={opportunity.title}
                className="group rounded-2xl border border-white/10 bg-[#090c13] p-4 transition duration-300 hover:-translate-y-1 hover:border-indigo-400/25"
              >
                <div className="flex items-center justify-between">
                  <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/10 bg-gradient-to-br from-indigo-500/20 to-violet-500/5 text-lg text-indigo-300">
                    {opportunity.icon}
                  </div>

                  <span className="text-[9px] text-emerald-400">
                    {opportunity.spots}
                  </span>
                </div>

                <div className="mt-6 text-[9px] uppercase tracking-wider text-white/25">
                  {opportunity.category}
                </div>

                <h3 className="mt-2 text-sm font-semibold">
                  {opportunity.title}
                </h3>

                <div className="mt-2 text-lg font-semibold">
                  {opportunity.payout}
                  <span className="ml-1 text-[10px] font-normal text-white/30">
                    / creator
                  </span>
                </div>

                <div className="mt-4 flex flex-wrap gap-1.5">
                  {opportunity.platforms.map((platform) => (
                    <span
                      key={platform}
                      className="rounded-md bg-white/[0.04] px-2 py-1 text-[9px] text-white/35"
                    >
                      {platform}
                    </span>
                  ))}
                </div>

                <div className="mt-5 flex h-9 items-center justify-center rounded-lg border border-white/10 bg-white/[0.02] text-[10px] font-medium text-white/45 transition group-hover:bg-white/[0.06] group-hover:text-white">
                  Explore campaign →
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Creator section */}
      <section
        id="creators"
        className="relative z-10 mx-auto max-w-7xl px-6 pb-28 lg:px-10"
      >
        <div className="grid overflow-hidden rounded-3xl border border-white/10 bg-gradient-to-br from-indigo-500/[0.08] via-white/[0.02] to-violet-500/[0.06] lg:grid-cols-2">
          <div className="p-8 sm:p-12 lg:p-16">
            <div className="text-[10px] uppercase tracking-[0.28em] text-indigo-300/70">
              For creators
            </div>

            <h2 className="mt-4 max-w-xl text-4xl font-semibold tracking-[-0.04em] sm:text-5xl">
              Your content deserves better opportunities.
            </h2>

            <p className="mt-5 max-w-lg text-sm leading-7 text-white/40">
              Stop searching through random DMs and spreadsheets. Discover
              campaigns, manage submissions, and keep track of your earnings
              from one place.
            </p>

            <Link
              href="/creator"
              className="mt-8 inline-flex rounded-xl bg-white px-6 py-3.5 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-white/90"
            >
              Explore the Creator Portal →
            </Link>
          </div>

          <div className="relative min-h-[360px] overflow-hidden border-t border-white/10 lg:border-l lg:border-t-0">
            <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,.16),transparent_60%)]" />

            <div className="absolute left-[12%] top-[15%] rounded-2xl border border-white/10 bg-[#0a0d15]/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="text-[9px] text-white/30">
                ACTIVE OPPORTUNITIES
              </div>
              <div className="mt-2 text-3xl font-semibold">08</div>
            </div>

            <div className="absolute right-[10%] top-[32%] rounded-2xl border border-white/10 bg-[#0a0d15]/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="text-[9px] text-white/30">TOTAL EARNINGS</div>
              <div className="mt-2 text-3xl font-semibold">$1,840</div>
              <div className="mt-1 text-[9px] text-emerald-400">
                +18.4%
              </div>
            </div>

            <div className="absolute bottom-[10%] left-[22%] rounded-2xl border border-indigo-400/20 bg-[#0a0d15]/90 p-5 shadow-2xl backdrop-blur-xl">
              <div className="text-[9px] text-white/30">
                SUBMISSIONS APPROVED
              </div>
              <div className="mt-2 text-3xl font-semibold">24</div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section
        id="brands"
        className="relative z-10 mx-auto max-w-5xl px-6 pb-28 text-center lg:px-10"
      >
        <div className="relative overflow-hidden rounded-3xl border border-indigo-400/20 bg-gradient-to-br from-indigo-500/15 via-violet-500/[0.07] to-blue-500/10 px-6 py-20 shadow-[0_0_100px_rgba(79,70,229,.08)] sm:px-12">
          <div className="absolute left-1/2 top-0 h-40 w-80 -translate-x-1/2 rounded-full bg-indigo-500/20 blur-[90px]" />

          <div className="relative">
            <div className="text-[10px] uppercase tracking-[0.3em] text-indigo-200/60">
              Your next opportunity starts here
            </div>

            <h2 className="mx-auto mt-5 max-w-3xl text-4xl font-semibold leading-tight tracking-[-0.045em] sm:text-5xl">
              Turn your content into something bigger.
            </h2>

            <p className="mx-auto mt-5 max-w-xl text-sm leading-7 text-white/40">
              Discover campaigns, build relationships, and create work that
              gets noticed.
            </p>

            <Link
              href="/creator"
              className="mt-9 inline-flex rounded-xl bg-white px-7 py-4 text-sm font-semibold text-black transition duration-300 hover:-translate-y-1 hover:bg-white/90"
            >
              Get started →
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 border-t border-white/[0.08]">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-5 px-6 py-9 text-xs text-white/25 sm:flex-row lg:px-10">
          <div>
            <div className="font-semibold text-white/50">UGC GOAT</div>
            <div className="mt-1">Creator platform for opportunities.</div>
          </div>

          <div className="flex items-center gap-6">
            <a href="#how-it-works" className="transition hover:text-white">
              How it works
            </a>

            <Link href="/login" className="transition hover:text-white">
              Log in
            </Link>

            <Link href="/creator" className="transition hover:text-white">
              Creator portal
            </Link>
          </div>
        </div>
      </footer>
    </main>
  );
}