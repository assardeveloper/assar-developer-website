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
    <ul className="repo-list">
      {repos.map((r, i) => (
        <li key={r.url} className="reveal" style={{ "--d": `${i * 50}ms` }}>
          <a href={r.url} target="_blank" rel="noopener noreferrer" data-track={`code:${r.name}`}>
            <h3>{r.name}</h3>
            <p className="muted">{r.desc}</p>
            <span className="repo-meta muted">Flutter{r.stars > 0 ? ` · ★ ${r.stars}` : ""}</span>
            <span className="repo-cta">Free code ↗</span>
          </a>
        </li>
      ))}
      <li className="reveal">
        <a href={site.social.github} target="_blank" rel="noopener noreferrer" data-track="social:github">
          <h3>More on the way</h3>
          <p className="muted">I'm uploading code from my videos. Follow me on GitHub to get it first.</p>
          <span className="repo-meta muted">github.com/{site.githubUser}</span>
          <span className="repo-cta">Follow ↗</span>
        </a>
      </li>
    </ul>
  );
}
