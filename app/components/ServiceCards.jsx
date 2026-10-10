"use client";

import { orderLink } from "@/lib/order";
import { useContent } from "@/lib/content";

export default function ServiceCards({ limit }) {
  const { quickServices, site } = useContent();
  return (
    <div className="grid grid-3">
      {quickServices.slice(0, limit ?? quickServices.length).map((s, i) => (
        <div key={s.name + i} className={`card gig reveal ${s.popular ? "package-highlight" : ""}`} style={{ "--d": `${i * 70}ms` }}>
          {s.popular && <span className="badge">Best seller</span>}
          <div className="gig-icon">{s.icon}</div>
          <h3>{s.name}</h3>
          <p className="muted">{s.desc}</p>
          <div className="gig-foot">
            <div>
              <p className="price">{s.price}</p>
              <p className="muted small">⏱ {s.time}</p>
            </div>
            <a href={orderLink(s, site)} className="btn shine" target="_blank" rel="noopener noreferrer">
              Order now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
