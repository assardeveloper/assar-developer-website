"use client";

import { useEffect, useState } from "react";
import { site } from "@/site.config";
import { getRepos } from "@/lib/github";

export default function FreeCodeList({ initial }) {
  const [repos, setRepos] = useState(initial);

  useEffect(() => {
    getRepos().then((fresh) => fresh && setRepos(fresh));
  }, []);

  return (
    <div className="grid grid-3">
      {repos.map((r, i) => (
        <a key={r.url} href={r.url} target="_blank" rel="noopener noreferrer" data-track={`code:${r.name}`} className="card repo reveal" style={{ "--d": `${i * 70}ms` }}>
          <span className="tag">Free · Open source</span>
          <h3>{r.name}</h3>
          <p className="muted">{r.desc}</p>
          <div className="repo-foot">
            <span className="muted small">Flutter{r.stars > 0 ? ` · ★ ${r.stars}` : ""}</span>
            <span className="repo-cta">Get free code →</span>
          </div>
        </a>
      ))}
      <a href={site.social.github} target="_blank" rel="noopener noreferrer" data-track="social:github" className="card repo repo-more reveal">
        <div className="gig-icon">⭐</div>
        <h3>More code coming</h3>
        <p className="muted">I'm uploading the code from my videos. Follow me on GitHub so you don't miss it.</p>
        <div className="repo-foot"><span className="repo-cta">Follow on GitHub →</span></div>
      </a>
    </div>
  );
}
