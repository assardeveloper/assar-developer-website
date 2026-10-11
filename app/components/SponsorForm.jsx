"use client";

import { useEffect, useState } from "react";
import { useContent } from "@/lib/content";
import { sendForm } from "@/lib/sendForm";
import { track } from "@/lib/track";

export default function SponsorForm() {
  const { site, sponsorPackages } = useContent();
  const [pkg, setPkg] = useState("");
  const [status, setStatus] = useState("idle");

  // "Book this" buttons pre-select their package in the form.
  useEffect(() => {
    const onClick = (e) => {
      const btn = e.target.closest?.(".sp-pick");
      if (btn) setPkg(btn.dataset.package);
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);

  async function onSubmit(e) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    setStatus("sending");
    try {
      const ok = await sendForm(site, `💰 Sponsorship request from ${data.brand} (${data.package})`, data);
      if (ok) track(`sponsorship:${data.package}`);
      setStatus(ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  if (status === "sent") {
    return (
      <div className="card form-done">
        <h3>Thanks! Your request has been sent.</h3>
        <p className="muted">I'll reply within 24 hours with available dates and next steps.</p>
      </div>
    );
  }

  return (
    <form className="card form" onSubmit={onSubmit}>
      <div className="form-row">
        <label>
          Brand / product name
          <input name="brand" required />
        </label>
        <label>
          Website
          <input name="website" type="url" placeholder="https://" required />
        </label>
      </div>
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
        Package
        <select name="package" value={pkg || sponsorPackages[0]?.name || ""} onChange={(e) => setPkg(e.target.value)}>
          {sponsorPackages.map((p) => (
            <option key={p.name} value={p.name}>
              {p.name} · {p.price}
            </option>
          ))}
          <option value="Custom">Something custom</option>
        </select>
      </label>
      <label>
        What would you like to promote?
        <textarea name="message" rows={4} required placeholder="Tell me about your product, your audience and your timing." />
      </label>
      <button className="btn shine" disabled={status === "sending"}>
        {status === "sending" ? "Sending…" : "Send request"}
      </button>
      {status === "error" && (
        <p className="error">
          Couldn't send right now. Please email me at <a href={`mailto:${site.email}`}>{site.email}</a>.
        </p>
      )}
    </form>
  );
}
