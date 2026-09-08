"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";

export default function LoginPage() {
  const router = useRouter();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async () => {
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Invalid email or password.");
        setLoading(false);
        return;
      }

      if (data.role === "ADMIN") {
        router.push("/admin");
      } else {
        router.push("/creator");
      }
    } catch {
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#05070c] px-6 py-10 text-white">
      <div className="pointer-events-none fixed inset-0 overflow-hidden">
        <div className="absolute left-[-15%] top-[5%] h-[450px] w-[450px] rounded-full bg-violet-600/15 blur-[140px]" />
        <div className="absolute right-[-15%] bottom-[5%] h-[450px] w-[450px] rounded-full bg-blue-600/10 blur-[140px]" />
      </div>

      <div className="relative mx-auto flex min-h-[90vh] max-w-md items-center justify-center">
        <div className="w-full">

          <Link
            href="/"
            className="mb-8 flex items-center justify-center gap-3"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white font-black text-black">
              G
            </div>

            <div>
              <div className="text-lg font-bold">UGC GOAT</div>
              <div className="text-[9px] uppercase tracking-[0.25em] text-white/30">
                Creator Platform
              </div>
            </div>
          </Link>

          <div className="rounded-3xl border border-white/10 bg-white/[0.035] p-7 shadow-2xl backdrop-blur-xl sm:p-9">

            <div className="text-center">
              <div className="text-[10px] uppercase tracking-[0.28em] text-indigo-300/70">
                Welcome back
              </div>

              <h1 className="mt-3 text-3xl font-semibold tracking-tight">
                Log in to UGC GOAT.
              </h1>

              <p className="mt-2 text-sm text-white/35">
                Access your creator or admin dashboard.
              </p>
            </div>

            <div className="mt-8 space-y-4">

              <div>
                <label className="mb-2 block text-xs font-medium text-white/55">
                  Email address
                </label>

                <input
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-indigo-400/40 focus:bg-white/[0.04]"
                />
              </div>

              <div>
                <label className="mb-2 block text-xs font-medium text-white/55">
                  Password
                </label>

                <input
                  type="password"
                  placeholder="Your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      handleLogin();
                    }
                  }}
                  className="w-full rounded-xl border border-white/10 bg-black/20 px-4 py-3 text-sm text-white outline-none transition placeholder:text-white/20 focus:border-indigo-400/40 focus:bg-white/[0.04]"
                />
              </div>

            </div>

            {error && (
              <div className="mt-4 rounded-xl border border-red-400/15 bg-red-400/5 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              onClick={handleLogin}
              disabled={loading}
              className="mt-6 w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-50"
            >
              {loading ? "Signing in..." : "Continue →"}
            </button>

            <div className="mt-6 text-center text-sm text-white/30">
              Don't have an account?{" "}
              <Link
                href="/signup"
                className="font-medium text-white/70 transition hover:text-white"
              >
                Join as a Creator
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-[10px] text-white/20">
            UGC GOAT Creator Platform
          </p>

        </div>
      </div>
    </main>
  );
}