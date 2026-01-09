"use client";

import { useState } from "react";

export default function ContactPage() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("loading");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setStatus("success");
        setFormData({ name: "", email: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="py-16 px-6 md:px-12 relative min-h-screen">
      {/* Background */}
      <div className="absolute inset-0 circuit-bg opacity-10 pointer-events-none" />
      <div className="absolute top-20 right-10 w-64 h-64 bg-accent-cyan/5 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-2xl mx-auto relative z-10">
        {/* Header */}
        <div className="mb-12">
          <span className="font-mono text-sm text-accent-cyan mb-4 block">
            {"// "}contact
          </span>
          <h1 className="font-mono text-4xl md:text-5xl font-bold text-text-primary mb-4">
            Get in <span className="text-accent-magenta">Touch</span>
          </h1>
          <p className="text-text-secondary">
            Have a question, idea, or opportunity? I&apos;d love to hear from you.
          </p>
        </div>

        {status === "success" ? (
          <div className="p-8 border border-accent-green bg-accent-green/5">
            <span className="font-mono text-accent-green text-lg block mb-2">
              {"✓ "} message_sent
            </span>
            <p className="text-text-secondary">
              Thanks for reaching out! I&apos;ll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Terminal header */}
            <div className="p-4 border border-border bg-background-card">
              <div className="flex items-center gap-2 mb-4">
                <div className="w-3 h-3 rounded-full bg-red-500" />
                <div className="w-3 h-3 rounded-full bg-yellow-500" />
                <div className="w-3 h-3 rounded-full bg-green-500" />
                <span className="font-mono text-xs text-text-secondary ml-2">
                  contact_form.sh
                </span>
              </div>

              <div className="space-y-6">
                {/* Name field */}
                <div>
                  <label
                    htmlFor="name"
                    className="font-mono text-sm text-text-secondary mb-2 block"
                  >
                    <span className="text-accent-green">$</span> name:
                  </label>
                  <input
                    type="text"
                    id="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    required
                    className="cyber-input w-full"
                    placeholder="John Doe"
                  />
                </div>

                {/* Email field */}
                <div>
                  <label
                    htmlFor="email"
                    className="font-mono text-sm text-text-secondary mb-2 block"
                  >
                    <span className="text-accent-green">$</span> email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    required
                    className="cyber-input w-full"
                    placeholder="john@example.com"
                  />
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="message"
                    className="font-mono text-sm text-text-secondary mb-2 block"
                  >
                    <span className="text-accent-green">$</span> message:
                  </label>
                  <textarea
                    id="message"
                    rows={6}
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    required
                    className="cyber-input w-full resize-none"
                    placeholder="Your message here..."
                  />
                </div>
              </div>
            </div>

            {/* Submit button */}
            <div className="flex items-center gap-4">
              <button
                type="submit"
                disabled={status === "loading"}
                className="cyber-button disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {status === "loading" ? (
                  <span className="animate-pulse">Transmitting...</span>
                ) : (
                  "Send message"
                )}
              </button>

              {status === "error" && (
                <span className="font-mono text-sm text-red-500">
                  {"[ "} error: transmission_failed {" ]"}
                </span>
              )}
            </div>
          </form>
        )}

        {/* Alternative contact */}
        <div className="mt-12 pt-8 border-t border-border">
          <span className="font-mono text-xs text-text-secondary block mb-4">
            {"// "}alternative_methods
          </span>
          <div className="flex flex-wrap gap-4">
            <a
              href="https://twitter.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors"
            >
              [Twitter]
            </a>
            <a
              href="https://linkedin.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors"
            >
              [LinkedIn]
            </a>
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="font-mono text-sm text-text-secondary hover:text-accent-cyan transition-colors"
            >
              [GitHub]
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
