"use client";

import { useState } from "react";
import { useContent } from "@/lib/content";

// Collects emails (via Formspree) in exchange for a free UI. Grows a list you can sell to later.
export default function Newsletter() {
  const { site } = useContent();
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    if (!site.formspreeId) {
      window.location.href = `mailto:${site.email}?subject=${encodeURIComponent("Send me the free Flutter UI")}&body=${encodeURIComponent(`Please add me to your list: ${email}`)}`;
      return;
    }
    setStatus("sending");
    try {
      const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
        method: "POST",
        headers: { Accept: "application/json", "Content-Type": "application/json" },
        body: JSON.stringify({ email, type: "newsletter" }),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  }

  return (
    <div className="newsletter card reveal">
      <div>
        <h2>Get a free Flutter UI 🎁</h2>
        <p className="muted">Join the list and get a free login UI source code, plus new UIs and tips every week.</p>
      </div>
      {status === "sent" ? (
        <p className="success">You're in! Check your inbox. ✨</p>
      ) : (
        <form onSubmit={onSubmit} className="newsletter-form">
          <input name="email" type="email" required placeholder="you@email.com" autoComplete="email" />
          <button className="btn shine" disabled={status === "sending"}>
            {status === "sending" ? "Sending…" : "Send it to me"}
          </button>
        </form>
      )}
      {status === "error" && <p className="error">Something went wrong, please try again.</p>}
    </div>
  );
}
