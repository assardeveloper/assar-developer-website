"use client";

import Link from "next/link";
import { useContent } from "@/lib/content";

export default function Packages() {
  const { packages } = useContent();
  return (
    <div className="grid grid-3">
      {packages.map((p, i) => (
        <div key={p.name + i} className={`card package reveal ${p.highlight ? "package-highlight" : ""}`} style={{ "--d": `${i * 80}ms` }}>
          {p.highlight && <span className="badge">Most popular</span>}
          <h3>{p.name}</h3>
          <p className="price">
            <span className="muted small">from</span> {p.price}
          </p>
          <p className="muted small">{p.time}</p>
          <p>{p.desc}</p>
          <ul className="checks">
            {(p.features ?? []).filter((f) => f.trim()).map((f) => (
              <li key={f}>{f}</li>
            ))}
          </ul>
          <Link href="/hire/#quote" className={`btn ${p.highlight ? "" : "btn-outline"}`}>
            Get a quote
          </Link>
        </div>
      ))}
    </div>
  );
}
