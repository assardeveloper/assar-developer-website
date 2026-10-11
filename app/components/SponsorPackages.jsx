"use client";

import { useContent } from "@/lib/content";

export default function SponsorPackages() {
  const { sponsorPackages } = useContent();
  return (
    <div className="grid grid-4 sp-grid">
      {sponsorPackages.map((p, i) => (
        <div key={p.name + i} className={`card package reveal ${p.popular ? "package-highlight" : ""}`} style={{ "--d": `${i * 70}ms` }}>
          {p.popular && <span className="badge">Best results</span>}
          <h3>{p.name}</h3>
          <p className="price">{p.price}</p>
          <p className="muted">{p.desc}</p>
          <ul className="checks">
            {(p.features ?? []).filter((f) => f.trim()).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <a href={`#book`} data-package={p.name} data-track={`sponsorship:pick-${p.name}`} className={`btn ${p.popular ? "shine" : "btn-outline"} sp-pick`}>
            Book this
          </a>
        </div>
      ))}
    </div>
  );
}
