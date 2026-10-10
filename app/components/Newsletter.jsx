"use client";

import { useState } from "react";
import { useContent } from "@/lib/content";
import { track } from "@/lib/track";
import { sendForm } from "@/lib/sendForm";

// Collects emails (sent to your inbox) in exchange for a free UI. Grows a list you can sell to later.
export default function Newsletter() {
  const { site } = useContent();
  const [status, setStatus] = useState("idle");

  async function onSubmit(e) {
    e.preventDefault();
    const email = new FormData(e.currentTarget).get("email");
    track("newsletter:signup");
    setStatus("sending");
    try {
      const ok = await sendForm(site, "📧 New email signup (free Flutter UI)", { email, note: "Send this person the free Flutter UI." });
      setStatus(ok ? "sent" : "error");
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
        <p className="success">You're in! I'll email you the free UI soon. ✨</p>
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
