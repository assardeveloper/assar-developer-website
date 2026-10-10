"use client";

import { useContent } from "@/lib/content";
import { orderLink } from "@/lib/order";

// Pulls the video ID out of any YouTube link (shorts, watch, youtu.be).
const youtubeId = (url) => url?.match(/(?:shorts\/|v=|youtu\.be\/)([\w-]{11})/)?.[1];

export default function PaidCode() {
  const { products, site } = useContent();
  if (!products.length) return null;
  return (
    <div className="grid grid-3">
      {products.map((p, i) => {
        const id = youtubeId(p.video);
        return (
          <div key={p.name + i} className="card product reveal" style={{ "--d": `${i * 80}ms` }}>
            <div className="product-thumb">
              {id ? <img src={`https://i.ytimg.com/vi/${id}/hqdefault.jpg`} alt="" loading="lazy" /> : <span>💙</span>}
              <span className="product-price">{p.price}</span>
            </div>
            <h3>{p.name}</h3>
            <p className="muted">{p.desc}</p>
            <ul className="checks">
              {(p.features ?? []).filter((f) => f.trim()).map((f) => <li key={f}>{f}</li>)}
            </ul>
            <a
              href={orderLink(p, site, "Please send me the payment details.")}
              data-track={`buy:${p.name}`}
              className="btn shine"
              target="_blank"
              rel="noopener noreferrer"
            >
              Buy for {p.price}
            </a>
            {id && (
              <a href={p.video} target="_blank" rel="noopener noreferrer" className="product-demo" data-track={`video:${p.name}`}>
                ▶ Watch demo
              </a>
            )}
          </div>
        );
      })}
    </div>
  );
}
