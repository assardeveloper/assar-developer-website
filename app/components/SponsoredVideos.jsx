"use client";

import { useContent } from "@/lib/content";

const youtubeId = (url) => url?.match(/(?:shorts\/|v=|youtu\.be\/)([\w-]{11})/)?.[1];

export default function SponsoredVideos() {
  const { sponsoredVideos } = useContent();
  if (!sponsoredVideos.length) return null;
  return (
    <section className="section section-alt">
      <div className="container">
        <h2 className="reveal">Past sponsored videos</h2>
        <p className="muted section-lead reveal">Brands I've worked with.</p>
    <div className="video-grid">
      {sponsoredVideos.map((v, i) => {
        const id = youtubeId(v.url);
        return (
          <a key={v.url + i} href={v.url} target="_blank" rel="noopener noreferrer" className="video reveal" data-track={`video:sponsored-${v.brand}`}>
            <div className="video-thumb">
              {id && <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt={v.title} loading="lazy" />}
              <span className="play" aria-hidden="true">▶</span>
            </div>
            <p className="video-title">{v.title}</p>
            <p className="muted small">for {v.brand}</p>
          </a>
        );
      })}
    </div>
      </div>
    </section>
  );
}
