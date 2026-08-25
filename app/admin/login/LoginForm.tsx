"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;

    const form = new FormData(event.currentTarget);
    setBusy(true);
    setError(null);

    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: form.get("email"), password: form.get("password") }),
      });

      if (response.ok) {
        router.replace("/admin");
        router.refresh();
        return;
      }
      const data = await response.json().catch(() => ({}));
      setError(data.error ?? "Something went wrong. Please try again.");
    } catch {
      setError("Something went wrong. Please try again.");
    }
    setBusy(false);
  }

  return (
    <form onSubmit={handleSubmit} className="font-body mt-8 flex flex-col gap-4">
      <div>
        <label htmlFor="email" className="mb-1.5 block text-sm font-medium text-navy">
          Email
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="username"
          required
          className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-navy outline-none focus:border-navy/40"
        />
      </div>

      <div>
        <label htmlFor="password" className="mb-1.5 block text-sm font-medium text-navy">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          className="w-full rounded-xl border border-hairline bg-white px-4 py-3 text-navy outline-none focus:border-navy/40"
        />
      </div>

      <p role="alert" aria-live="polite" className="min-h-5 text-sm font-medium text-brand-red">
        {error}
      </p>

      <button
        type="submit"
        disabled={busy}
        className="rounded-xl bg-linear-to-r from-cta-from to-cta-to px-6 py-3.5 text-sm font-bold tracking-[0.06em] text-white uppercase transition-opacity hover:opacity-90 disabled:opacity-70"
      >
        {busy ? "Signing in…" : "Sign in"}
      </button>
    </form>
  );
}
