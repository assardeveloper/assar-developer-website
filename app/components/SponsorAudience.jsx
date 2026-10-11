"use client";

import { useContent } from "@/lib/content";

export default function SponsorAudience() {
  const { sponsorAudience } = useContent();
  return (
    <div className="aud-grid">
      {sponsorAudience.map((a, i) => (
        <a key={a.platform} href={a.url} target="_blank" rel="noopener noreferrer" className="card aud reveal" style={{ "--d": `${i * 70}ms` }}>
          <span className="aud-platform">{a.platform}</span>
          {a.followers && (
            <span className="aud-num">
              <strong>{a.followers}</strong> followers
            </span>
          )}
          {a.avgViews && (
            <span className="aud-num">
              <strong>{a.avgViews}</strong> avg. views
            </span>
          )}
          {a.note && <span className="muted small">{a.note}</span>}
        </a>
      ))}
    </div>
  );
}
