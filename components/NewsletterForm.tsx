"use client";

import { useState } from "react";

export function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    // TODO: Integrate with ConvertKit API
    // For now, simulate success
    await new Promise((resolve) => setTimeout(resolve, 1000));
    setStatus("success");
    setEmail("");
  };

  if (status === "success") {
    return (
      <div className="text-center p-6 border border-accent-green bg-accent-green/5">
        <span className="font-mono text-accent-green text-sm block mb-2">
          {"✓ "} subscription_confirmed
        </span>
        <p className="text-text-secondary text-sm">
          You&apos;re in! Watch your inbox for updates.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="w-full max-w-md mx-auto">
      <div className="flex flex-col sm:flex-row gap-3">
        <div className="relative flex-1">
          <span className="absolute left-4 top-1/2 -translate-y-1/2 font-mono text-accent-cyan text-sm">
            {"$ "}
          </span>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="your@email.com"
            required
            className="cyber-input w-full pl-8"
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? (
            <span className="animate-pulse">Processing...</span>
          ) : (
            "Subscribe"
          )}
        </button>
      </div>
    </form>
  );
}
