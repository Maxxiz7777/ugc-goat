"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function SignupPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleSignup(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setError("");

    if (
      !name.trim() ||
      !username.trim() ||
      !email.trim() ||
      !password ||
      !confirmPassword
    ) {
      setError("Please fill in all fields.");
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    setLoading(true);

    try {
      const response = await fetch("/api/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.trim(),
          username: username.trim(),
          email: email.trim(),
          password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Something went wrong. Please try again.");
        setLoading(false);
        return;
      }

      router.push("/creator");
    } catch (error) {
      console.error(error);
      setError("Something went wrong. Please try again.");
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-[#07080c] px-6 py-10 text-white">
      <div className="mx-auto flex min-h-[90vh] max-w-md items-center justify-center">
        <div className="w-full">
          <div className="mb-10 text-center">
            <div className="mb-4 text-[11px] font-semibold uppercase tracking-[0.3em] text-violet-400">
              Creator Signup
            </div>

            <h1 className="text-4xl font-bold tracking-tight">
              Create your account.
            </h1>

            <p className="mt-3 text-sm text-white/45">
              Start discovering opportunities built for creators.
            </p>
          </div>

          <form
            onSubmit={handleSignup}
            className="space-y-5 rounded-3xl border border-white/10 bg-white/[0.03] p-6 shadow-2xl shadow-black/30"
          >
            <div>
              <label className="mb-2 block text-sm font-medium text-white/65">
                Full name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your full name"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/65">
                Creator username
              </label>
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="@yourusername"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/65">
                Email address
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/65">
                Password
              </label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-500/60"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/65">
                Confirm password
              </label>
              <input
                type="password"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl border border-white/10 bg-black/30 px-4 py-3.5 text-sm outline-none transition placeholder:text-white/25 focus:border-violet-500/60"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-red-500/20 bg-red-500/10 px-4 py-3 text-sm text-red-300">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-xl bg-white py-3.5 text-sm font-semibold text-black transition hover:-translate-y-0.5 hover:bg-white/90 disabled:cursor-not-allowed disabled:opacity-60"
            >
              {loading ? "Creating account..." : "Create Creator Account →"}
            </button>
          </form>

          <div className="mt-6 text-center text-sm text-white/40">
            Already have an account?{" "}
            <Link
              href="/login"
              className="font-medium text-white/70 transition hover:text-white"
            >
              Log in
            </Link>
          </div>

          <p className="mt-8 text-center text-[10px] text-white/20">
            UGCGOAT Creator Platform
          </p>
        </div>
      </div>
    </main>
  );
}