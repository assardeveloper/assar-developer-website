"use client";

import { useEffect } from "react";
import { useContent } from "@/lib/content";
import { orderLink } from "@/lib/order";

// Pulls the video ID out of any YouTube link (shorts, watch, youtu.be).
const youtubeId = (url) => url?.match(/(?:shorts\/|v=|youtu\.be\/)([\w-]{11})/)?.[1];

const isLemon = (url) => /lemonsqueezy\.com/.test(url ?? "");
// Opens Lemon Squeezy checkout as a popup on this page instead of a new tab.
const lemonUrl = (url) => `${url}${url.includes("?") ? "&" : "?"}embed=1&media=0`;

export default function PaidCode() {
  const { products, site } = useContent();
  const hasLemon = products.some((p) => isLemon(p.buyUrl));

  useEffect(() => {
    if (!hasLemon) return;
    if (document.getElementById("lemon-js")) return window.createLemonSqueezy?.();
    const s = document.createElement("script");
    s.id = "lemon-js";
    s.src = "https://assets.lemonsqueezy.com/lemon.js";
    s.defer = true;
    s.onload = () => window.createLemonSqueezy?.();
    document.body.appendChild(s);
  }, [hasLemon]);

  if (!products.length) return null;
  return (
    <div className="grid grid-3">
      {products.map((p, i) => {
        const id = youtubeId(p.video);
        return (
          <div key={p.name + i} className="product reveal" style={{ "--d": `${i * 80}ms` }}>
            <div className="product-thumb">
              {id ? <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" /> : <span className="product-ph">Flutter</span>}
            </div>
            <div className="product-top">
              <h3>{p.name}</h3>
              <span className="product-price">{p.price}</span>
            </div>
            <p className="muted">{p.desc}</p>
            <ul className="checks">
              {(p.features ?? []).filter((f) => f.trim()).map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a
              href={isLemon(p.buyUrl) ? lemonUrl(p.buyUrl) : orderLink(p, site, "Please send me the payment details.")}
              data-track={`${p.buyUrl ? "checkout" : "buy"}:${p.name}`}
              className={`btn ${isLemon(p.buyUrl) ? "lemonsqueezy-button" : ""}`}
              target="_blank"
              rel="noopener noreferrer"
            >
              {p.buyUrl ? `Buy now · ${p.price}` : `Buy for ${p.price}`}
            </a>
            {p.buyUrl && <p className="muted small product-secure">Secure card payment · instant download</p>}
            {id && (
              <a href={p.video} target="_blank" rel="noopener noreferrer" className="product-demo" data-track={`video:${p.name}`}>
                Watch demo ↗
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
