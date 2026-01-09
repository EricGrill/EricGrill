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
    <div className="py-16 px-6 md:px-12">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-text-primary mb-4">
          Contact
        </h1>
        <p className="text-text-secondary mb-8">
          Have a question, idea, or opportunity? I'd love to hear from you.
        </p>

        {status === "success" ? (
          <div className="bg-green-50 border border-green-200 rounded-lg p-6">
            <p className="text-green-800">
              Thanks for reaching out! I'll get back to you soon.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-text-primary mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="email" className="block text-sm font-medium text-text-primary mb-2">
                Email
              </label>
              <input
                type="email"
                id="email"
                value={formData.email}
                onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent"
              />
            </div>

            <div>
              <label htmlFor="message" className="block text-sm font-medium text-text-primary mb-2">
                Message
              </label>
              <textarea
                id="message"
                rows={5}
                value={formData.message}
                onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                required
                className="w-full px-4 py-3 rounded-lg border border-border bg-white text-text-primary focus:outline-none focus:ring-2 focus:ring-accent resize-none"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent/90 transition-colors disabled:opacity-50"
            >
              {status === "loading" ? "Sending..." : "Send message"}
            </button>

            {status === "error" && (
              <p className="text-red-600 text-sm">
                Something went wrong. Please try again.
              </p>
            )}
          </form>
        )}
      </div>
    </div>
  );
}
