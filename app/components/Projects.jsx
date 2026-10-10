"use client";

import { useContent } from "@/lib/content";

export default function Projects() {
  const { projects } = useContent();
  return (
    <ul className="project-list">
      {projects.map((p, i) => (
        <li key={p.title + i} className="reveal" style={{ "--d": `${(i % 2) * 60}ms` }}>
          <span className="num">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <p className="eyebrow-sm">{p.type}</p>
            <h3>{p.title}</h3>
            <p className="muted">{p.desc}</p>
            <p className="tags">{(p.tech ?? []).join(" · ")}</p>
          </div>
        </li>
      ))}
    </ul>
  );
}
