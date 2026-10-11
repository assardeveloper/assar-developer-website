"use client";

import { useContent } from "@/lib/content";

// Paid "Sponsored" spot, managed in Admin → Sponsors. Hides itself after the end date.
export default function SponsorSlot() {
  const { sponsorSlots } = useContent();
  if (!sponsorSlots.length) return null;
  return (
    <div className="sponsor-slots">
      {sponsorSlots.map((s, i) => (
        <a
          key={s.name + i}
          href={s.url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          data-track={`sponsor:${s.name}`}
          className="card sponsor-slot reveal"
        >
          {s.image && <img src={s.image} alt="" className="sponsor-logo" />}
          <div>
            <span className="sponsor-label">Sponsored</span>
            <strong>{s.name}</strong>
            <span className="muted">{s.text}</span>
          </div>
          <span className="sponsor-cta">{s.cta || "Learn more"} ↗</span>
        </a>
      ))}
    </div>
  );
}
