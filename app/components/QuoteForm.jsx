"use client";

import { useState } from "react";
import { useContent } from "@/lib/content";
import { track } from "@/lib/track";

const budgets = ["Under $500", "$500 – $1,500", "$1,500 – $5,000", "$5,000+", "Not sure yet"];

export default function QuoteForm() {
  const { site } = useContent();
  const [status, setStatus] = useState("idle"); // idle | sending | sent | error

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));

    // No Formspree ID yet: open the visitor's email app with the details filled in.
    if (!site.formspreeId) {
      track("quote:sent-by-email");
      const body = `Name: ${data.name}\nEmail: ${data.email}\nBudget: ${data.budget}\n\n${data.message}`;
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent(
        "New app project"
      )}&body=${encodeURIComponent(body)}`;
      return;
    }

    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      if (res.ok) track(`quote:${data.budget}`);
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card form-done">
        <h3>Thanks! Your request has been sent.</h3>
        <p className="muted">I'll reply within 24 hours with questions or a quote.</p>
      </div>
    );
  }

  return (
    <form className="card form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Your name
          <input name="name" required autoComplete="name" />
        </label>
        <label>
          Email
          <input name="email" type="email" required autoComplete="email" />
        </label>
      </div>
      <label>
        Budget
        <select name="budget" defaultValue="Not sure yet">
          {budgets.map((b) => (
            <option key={b}>{b}</option>
          ))}
        </select>
      </label>
      <label>
        Tell me about your app
        <textarea
          name="message"
          rows={5}
          required
          placeholder="What does the app do? Who is it for? Do you have designs? When do you need it?"
        />
      </label>
      <button className="btn" type="submit" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Get a free quote"}
      </button>
      {status === "error" && (
        <p className="error">
          Something went wrong. Please email me at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
      {site.whatsapp && (
        <p className="muted small">
          Prefer WhatsApp?{" "}
          <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer" data-track="chat:quote-page">
            Message me directly
          </a>
        </p>
      )}
    </form>
  );
}
