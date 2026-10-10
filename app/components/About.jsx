import Link from "next/link";
import { site } from "@/site.config";

const reasons = [
  { icon: "💬", title: "You talk to me directly", desc: "No agency, no middlemen. The person you message is the person writing your code." },
  { icon: "⚡", title: "Fast & reliable", desc: "Weekly builds you can test on your phone, and replies within 24 hours." },
  { icon: "🎯", title: "Design-obsessed", desc: "Smooth animations and pixel-perfect UI. It's what my videos are all about." },
  { icon: "🔒", title: "You own everything", desc: "Full source code, clean structure and documentation at handover." },
];

export default function About() {
  return (
    <section className="section" id="about">
      <div className="container about-grid">
        <div className="about-photo reveal">
          <img src="/assar.jpg" alt={site.owner} loading="lazy" />
          <div className="about-photo-tag">
            <span className="pulse-dot" /> Online & taking projects
          </div>
        </div>
        <div>
          <p className="eyebrow reveal">About me</p>
          <h2 className="reveal">Hi, I'm Assar 👋</h2>
          <p className="lead reveal">
            I'm a Flutter developer from Pakistan with {site.yearsExperience}+ years of experience building apps
            for clients around the world: delivery platforms, dating apps, marketplaces, fitness and business apps.
          </p>
          <p className="muted reveal">
            I also share quick Flutter UI builds with thousands of developers on YouTube, TikTok and Instagram.
            When you hire me, you get the same attention to detail in your app.
          </p>
          <div className="reasons">
            {reasons.map((r, i) => (
              <div key={r.title} className="reason reveal" style={{ "--d": `${i * 80}ms` }}>
                <span className="reason-icon">{r.icon}</span>
                <div>
                  <strong>{r.title}</strong>
                  <p className="muted small">{r.desc}</p>
                </div>
              </div>
            ))}
          </div>
          <Link href="/hire/#quote" className="btn shine reveal">Work with me</Link>
        </div>
      </div>
    </section>
  );
}
