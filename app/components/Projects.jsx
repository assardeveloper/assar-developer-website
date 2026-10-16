"use client";

import { useContent } from "@/lib/content";

export default function Projects() {
  const { projects } = useContent();
  return (
    <div className="grid grid-3">
      {projects.map((p, i) => (
        <div key={p.title + i} className="card project reveal" style={{ "--d": `${i * 70}ms` }}>
          <span className="tag">{p.type}</span>
          <h3>{p.title}</h3>
          <p className="muted">{p.desc}</p>
          {(p.problem || p.result) && (
            <dl className="case">
              {p.problem && <><dt>Challenge</dt><dd>{p.problem}</dd></>}
              {p.result && <><dt>Result</dt><dd>{p.result}</dd></>}
            </dl>
          )}
          <div className="chips">
            {(p.tech ?? []).map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        </div>
      ))}
    </div>
  );
}
