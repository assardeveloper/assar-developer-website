// Simple page header for inner pages: small label, serif title, intro line.
export default function PageHero({ label, title, intro, children }) {
  return (
    <section className="page-hero">
      <div className="container">
        <p className="eyebrow rise">{label}</p>
        <h1 className="rise" style={{ "--d": "60ms" }}>{title}</h1>
        {intro && <p className="lead rise" style={{ "--d": "120ms" }}>{intro}</p>}
        {children}
      </div>
    </section>
  );
}
