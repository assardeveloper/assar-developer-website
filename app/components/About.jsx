import Years from "./Years";
import SectionHead from "./SectionHead";

const reasons = [
  { title: "You talk to me directly", desc: "No agency, no middlemen. The person you message is the person writing your code." },
  { title: "Steady progress", desc: "Weekly builds you can test on your own phone, and replies within a day." },
  { title: "Care for the details", desc: "Smooth motion and pixel-accurate UI. It's what my videos are about." },
  { title: "You own everything", desc: "Full source code, clean structure and documentation at handover." },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container">
        <SectionHead n="01" label="About" title="A developer who sweats the small stuff" />
        <div className="about-grid">
          <div className="about-text reveal">
            <p className="lead">
              I'm a Flutter developer from Pakistan with <Years />+ years of experience building apps for
              clients around the world: delivery platforms, dating apps, marketplaces, fitness and business tools.
            </p>
            <p className="muted">
              I also share short Flutter UI builds with thousands of developers on YouTube, TikTok and Instagram.
              When you hire me, your app gets the same attention to detail.
            </p>
          </div>
          <ul className="reasons">
            {reasons.map((r, i) => (
              <li key={r.title} className="reveal" style={{ "--d": `${i * 60}ms` }}>
                <h3>{r.title}</h3>
                <p className="muted">{r.desc}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
