"use client";

import { orderLink } from "@/lib/order";
import { useContent } from "@/lib/content";

// Services laid out like a price list: name and description, delivery time, price, order link.
export default function ServiceCards({ limit }) {
  const { quickServices, site } = useContent();
  return (
    <ul className="price-list">
      {quickServices.slice(0, limit ?? quickServices.length).map((s, i) => (
        <li key={s.name + i} className="reveal" style={{ "--d": `${i * 50}ms` }}>
          <div className="pl-main">
            <h3>
              {s.name}
              {s.popular && <span className="pill">Popular</span>}
            </h3>
            <p className="muted">{s.desc}</p>
          </div>
          <span className="pl-time muted">{s.time}</span>
          <span className="pl-price">{s.price}</span>
          <a
            href={orderLink(s, site)}
            data-track={`${s.buyUrl ? "checkout" : "order"}:${s.name}`}
            className="btn btn-small btn-ghost"
            target="_blank"
            rel="noopener noreferrer"
          >
            Order
          </a>
        </li>
      ))}
    </ul>
  );
}
