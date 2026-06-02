"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { GitBranch, Lock, ArrowRight } from "lucide-react";

export default function CvLogin() {
  const [password, setPassword] = useState("");
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError(false);

    const res = await fetch("/api/cv-auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ password }),
    });

    if (res.ok) {
      router.push("/cv");
      router.refresh();
    } else {
      setError(true);
      setLoading(false);
    }
  }

  return (
    <main className="min-h-screen bg-slate-50 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="flex items-center gap-3 mb-12 justify-center">
          <div className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-950 text-white">
            <GitBranch className="h-4 w-4" />
          </div>
          <span className="font-semibold tracking-tight text-slate-950">Luca Joos</span>
        </div>

        {/* Card */}
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-slate-100 mb-6">
            <Lock className="h-5 w-5 text-slate-600" />
          </div>

          <h1 className="text-2xl font-semibold tracking-tight text-slate-950 mb-2">
            Protected CV
          </h1>
          <p className="text-slate-500 text-sm mb-8">
            This section is password protected. Please enter the access code provided.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Access code"
                autoFocus
                className={`w-full rounded-2xl border px-4 py-3 text-sm text-slate-950 outline-none transition placeholder:text-slate-400
                  ${error
                    ? "border-red-300 bg-red-50 focus:border-red-400"
                    : "border-slate-200 bg-slate-50 focus:border-slate-400 focus:bg-white"
                  }`}
              />
              {error && (
                <p className="mt-2 text-xs text-red-500">
                  Incorrect access code. Please try again.
                </p>
              )}
            </div>

            <button
              type="submit"
              disabled={loading || !password}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-slate-950 px-6 py-3 font-medium text-white transition hover:bg-slate-800 disabled:opacity-40 disabled:cursor-not-allowed"
            >
              {loading ? "Verifying..." : "Access CV"}
              {!loading && <ArrowRight className="h-4 w-4" />}
            </button>
          </form>
        </div>

        <p className="text-center text-xs text-slate-400 mt-6">
          © 2026 Luca Joos — Data Portfolio
        </p>
      </div>
    </main>
  );
}