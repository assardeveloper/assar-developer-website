"use client";

import { formatViews } from "@/lib/format";
import { useContent } from "@/lib/content";

export default function VideoGrid({ videos }) {
  const { site, videoCode } = useContent();
  return (
    <div className="video-grid">
      {videos.map((v, i) => (
        <div key={v.id} className="video reveal" style={{ "--d": `${(i % 5) * 60}ms` }}>
          <a href={v.url} target="_blank" rel="noopener noreferrer" data-track={`video:${v.title}`}>
            <div className="video-thumb">
              <img src={v.thumbnail} alt={v.title} loading="lazy" />
              <span className="play" aria-hidden="true">▶</span>
            </div>
            <p className="video-title">{v.title}</p>
          </a>
          {v.views > 0 && <p className="muted small">{formatViews(v.views)} views</p>}
          <a href={videoCode[v.id] || site.social.github} className="get-code" data-track={`code:${v.title}`} target="_blank" rel="noopener noreferrer">
            {videoCode[v.id] ? "Free code →" : "Code on GitHub"}
          </a>
        </div>
      ))}
    </div>
  );
}
