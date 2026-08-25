"use client";

import { useId, useState } from "react";

type Status = "idle" | "loading" | "joined" | "duplicate" | "invalid" | "error";

const MESSAGES: Record<Exclude<Status, "idle" | "loading">, string> = {
  joined: "Thank you for your interest in IMI. We’ll keep you updated.",
  duplicate: "You’re already on the IMI waitlist.",
  invalid: "Please enter a valid email address.",
  error: "Something went wrong. Please try again.",
};

export default function WaitlistForm({ tone = "light" }: { tone?: "light" | "dark" }) {
  const inputId = useId();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");

  const dark = tone === "dark";

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === "loading") return;

    setStatus("loading");
    try {
      const response = await fetch("/api/waitlist", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });
      const data = await response.json().catch(() => ({}));

      if (data.status === "joined") {
        setStatus("joined");
        setEmail("");
      } else if (data.status === "duplicate") {
        setStatus("duplicate");
      } else if (data.status === "invalid") {
        setStatus("invalid");
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  }

  if (status === "joined") {
    return (
      <div
        className={`imi-rise flex max-w-xl items-start gap-4 rounded-xl border p-5 sm:p-6 ${
          dark ? "border-white/20 bg-white/10" : "border-hairline bg-white"
        }`}
        role="status"
      >
        <svg
          viewBox="0 0 24 24"
          aria-hidden="true"
          className={`mt-0.5 h-6 w-6 shrink-0 ${dark ? "text-lime" : "text-brand-red"}`}
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="12" cy="12" r="9" />
          <path d="m8.4 12.2 2.5 2.5 4.7-5" />
        </svg>
        <div>
          <p className={`text-lg font-bold ${dark ? "text-white" : "text-navy"}`}>You’re on the list.</p>
          <p className={`font-body mt-1 ${dark ? "text-white/75" : "text-navy-muted"}`}>{MESSAGES.joined}</p>
        </div>
      </div>
    );
  }

  const feedback = status === "duplicate" || status === "invalid" || status === "error" ? status : null;

  return (
    <form onSubmit={handleSubmit} noValidate className="max-w-xl">
      <label htmlFor={inputId} className="sr-only">
        Email address
      </label>

      <div
        className={`flex flex-col overflow-hidden rounded-xl border sm:h-[68px] sm:flex-row sm:items-stretch ${
          dark ? "border-white/25 bg-white/10" : "border-hairline bg-white/80"
        }`}
      >
        <div className="flex flex-1 items-center gap-3 px-5 py-4 sm:py-0">
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 ${dark ? "text-white/70" : "text-navy/70"}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.7"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
            <path d="m3.5 7 8.5 6 8.5-6" />
          </svg>
          <input
            id={inputId}
            type="email"
            name="email"
            value={email}
            onChange={(event) => {
              setEmail(event.target.value);
              if (status !== "idle") setStatus("idle");
            }}
            placeholder="Enter your email address"
            autoComplete="email"
            required
            maxLength={254}
            aria-describedby={feedback ? `${inputId}-feedback` : undefined}
            aria-invalid={status === "invalid"}
            disabled={status === "loading"}
            className={`font-body w-full bg-transparent text-base outline-none disabled:opacity-60 ${
              dark ? "text-white placeholder:text-white/50" : "text-navy placeholder:text-navy/45"
            }`}
          />
        </div>

        <button
          type="submit"
          disabled={status === "loading"}
          className="group flex items-center justify-center gap-2 bg-linear-to-r from-cta-from to-cta-to px-8 py-4 text-sm font-bold tracking-[0.08em] text-white uppercase transition-opacity duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70 sm:py-0"
        >
          {status === "loading" ? "Joining…" : "Join the Waitlist"}
          <svg
            viewBox="0 0 24 24"
            aria-hidden="true"
            className="h-4 w-4 transition-transform duration-200 group-hover:translate-x-0.5"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="m9 5 7 7-7 7" />
          </svg>
        </button>
      </div>

      <p
        id={`${inputId}-feedback`}
        role="status"
        aria-live="polite"
        className={`font-body mt-3 min-h-6 text-sm ${dark ? "text-white/85" : "text-navy-muted"}`}
      >
        {feedback ? (
          <span className="inline-flex items-center gap-2">
            <svg
              viewBox="0 0 24 24"
              aria-hidden="true"
              className={`h-4 w-4 ${dark ? "text-sandly" : "text-brand-red"}`}
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <circle cx="12" cy="12" r="9" />
              <path d="M12 7.8v5M12 16.2v.1" />
            </svg>
            {MESSAGES[feedback]}
          </span>
        ) : null}
      </p>
    </form>
  );
}
