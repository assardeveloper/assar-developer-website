import Link from "next/link";
import { packages } from "@/site.config";

export default function Packages() {
  return (
    <div className="grid grid-3">
      {packages.map((p, i) => (
        <div key={p.name} className={`card package reveal ${p.highlight ? "package-highlight" : ""}`} style={{ "--d": `${i * 80}ms` }}>
          {p.highlight && <span className="badge">Most popular</span>}
          <h3>{p.name}</h3>
          <p className="price">
            <span className="muted small">from</span> {p.price}
          </p>
          <p className="muted small">{p.time}</p>
          <p>{p.desc}</p>
          <ul className="checks">
            {p.features.map((f) => (
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
