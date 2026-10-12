"use client";

import { useEffect, useState } from "react";
import { siTiktok } from "simple-icons";
import { useContent } from "@/lib/content";
import { formatViews } from "@/lib/format";

const clean = (s = "") => s.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();

// TikTok videos chosen in Admin → TikTok videos. Covers and titles come from TikTok's oEmbed.
export default function TikTokVideos({ stats, limit }) {
  const { tiktokVideos = [], site } = useContent();
  const [info, setInfo] = useState({});
  const list = tiktokVideos.slice(0, limit ?? tiktokVideos.length);

  useEffect(() => {
    list.forEach((v) => {
      if (info[v.url]) return;
      fetch(`https://www.tiktok.com/oembed?url=${encodeURIComponent(v.url)}`)
        .then((r) => (r.ok ? r.json() : null))
        .then((d) => d && setInfo((m) => ({ ...m, [v.url]: { title: clean(d.title), thumb: d.thumbnail_url } })))
        .catch(() => {});
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [list.map((v) => v.url).join("|")]);

  const profile = `https://www.tiktok.com/@${site.tiktokUser || "assardeveloper2"}`;

  return (
    <>
      {stats && (
        <a href={profile} target="_blank" rel="noopener noreferrer" className="card tt-profile reveal" data-track="social:tiktok">
          <span className="tt-logo">
            <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d={siTiktok.path} fill="currentColor" /></svg>
          </span>
          <div className="tt-name">
            <strong>@{stats.user}</strong>
            <span className="muted small">TikTok</span>
          </div>
          <div className="tt-stat"><strong>{formatViews(stats.followers)}</strong><span className="muted small">Followers</span></div>
          <div className="tt-stat"><strong>{formatViews(stats.likes)}</strong><span className="muted small">Likes</span></div>
          <div className="tt-stat"><strong>{stats.videos}</strong><span className="muted small">Videos</span></div>
          <span className="btn btn-small shine tt-follow">Follow</span>
        </a>
      )}
      {list.length > 0 && (
        <div className="video-grid">
          {list.map((v, i) => {
            const d = info[v.url] ?? {};
            return (
              <a key={v.url} href={v.url} target="_blank" rel="noopener noreferrer" className="video reveal" style={{ "--d": `${(i % 5) * 60}ms` }} data-track={`video:tiktok-${i + 1}`}>
                <div className="video-thumb">
                  {d.thumb ? <img src={d.thumb} alt={d.title ?? "TikTok video"} loading="lazy" referrerPolicy="no-referrer" /> : <span className="tt-ph" />}
                  <span className="play" aria-hidden="true">▶</span>
                  {v.views && <span className="tt-views">▶ {v.views}</span>}
                </div>
                <p className="video-title">{v.title || d.title || "Watch on TikTok"}</p>
              </a>
            );
          })}
        </div>
      )}
    </>
  );
}
