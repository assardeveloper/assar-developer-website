"use client";

import { useContent } from "@/lib/content";

const Stars = ({ n = 5 }) => (
  <span className="stars" aria-label={`${n} out of 5 stars`}>
    {"★★★★★".slice(0, n)}
    <span className="stars-off">{"★★★★★".slice(n)}</span>
  </span>
);

// Client reviews, managed in Admin → Reviews. Hidden until there is at least one.
export default function Reviews({ title = "What clients say", intro = "Real feedback from people I've built apps for." }) {
  const { reviews } = useContent();
  if (!reviews.length) return null;
  const avg = reviews.reduce((n, r) => n + (Number(r.rating) || 5), 0) / reviews.length;
  return (
    <section className="section section-alt" id="reviews">
      <div className="container">
        <div className="section-head">
          <div>
            <h2 className="reveal">{title}</h2>
            <p className="muted section-lead reveal">{intro}</p>
          </div>
          <div className="rating-summary reveal">
            <strong>{avg.toFixed(1)}</strong>
            <Stars n={Math.round(avg)} />
            <span className="muted small">{reviews.length} review{reviews.length > 1 ? "s" : ""}</span>
          </div>
        </div>
        <div className="grid grid-3">
          {reviews.map((r, i) => (
            <figure key={r.name + i} className="card review reveal" style={{ "--d": `${(i % 3) * 70}ms` }}>
              <Stars n={Number(r.rating) || 5} />
              <blockquote>“{r.text}”</blockquote>
              <figcaption>
                {r.photo ? <img src={r.photo} alt="" /> : <span className="review-initial">{r.name?.[0] ?? "?"}</span>}
                <div>
                  <strong>{r.name}</strong>
                  <span className="muted small">{[r.role, r.country].filter(Boolean).join(" · ")}</span>
                </div>
                {r.link && (
                  <a href={r.link} target="_blank" rel="noopener noreferrer" className="review-source">
                    {r.source || "View"} ↗
                  </a>
                )}
              </figcaption>
              {r.project && <p className="review-project muted small">Project: {r.project}</p>}
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
