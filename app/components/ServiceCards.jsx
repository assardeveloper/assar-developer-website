import { orderLink } from "@/lib/order";

export default function ServiceCards({ items, limit }) {
  return (
    <div className="grid grid-3">
      {items.slice(0, limit ?? items.length).map((s, i) => (
        <div key={s.name} className={`card gig reveal ${s.popular ? "package-highlight" : ""}`} style={{ "--d": `${i * 70}ms` }}>
          {s.popular && <span className="badge">Best seller</span>}
          <div className="gig-icon">{s.icon}</div>
          <h3>{s.name}</h3>
          <p className="muted">{s.desc}</p>
          <div className="gig-foot">
            <div>
              <p className="price">{s.price}</p>
              <p className="muted small">⏱ {s.time}</p>
            </div>
            <a href={orderLink(s)} className="btn shine" target="_blank" rel="noopener noreferrer">
              Order now
            </a>
          </div>
        </div>
      ))}
    </div>
  );
}
