"use client";

import Link from "next/link";
import { useContent } from "@/lib/content";

export default function Packages() {
  const { packages } = useContent();
  return (
    <div className="packages">
      {packages.map((p, i) => (
        <div key={p.name + i} className={`package reveal ${p.highlight ? "package-featured" : ""}`} style={{ "--d": `${i * 60}ms` }}>
          <div className="package-top">
            <h3>{p.name}</h3>
            {p.highlight && <span className="pill">Most chosen</span>}
          </div>
          <p className="package-price">
            <span className="muted">from</span> {p.price}
          </p>
          <p className="muted small">{p.time}</p>
          <p className="package-desc">{p.desc}</p>
          <ul className="checks">
            {(p.features ?? []).filter((f) => f.trim()).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link href="/hire/#quote" data-track={`package:${p.name}`} className={`btn ${p.highlight ? "" : "btn-ghost"}`}>
            Get a quote
          </Link>
        </div>
      ))}
    </div>
  );
}
