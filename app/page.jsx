import Link from "next/link";
import { site, projects, quickServices } from "@/site.config";
import Packages from "./components/Packages";
import SocialLinks from "./components/SocialLinks";
import VideoGrid from "./components/VideoGrid";
import CountUp from "./components/CountUp";
import HeroVisual from "./components/HeroVisual";
import About from "./components/About";
import Marquee from "./components/Marquee";
import ServiceCards from "./components/ServiceCards";
import FreeCode from "./components/FreeCode";
import Newsletter from "./components/Newsletter";
import { getVideos } from "@/lib/youtube";

const services = [
  { icon: "📱", title: "Mobile apps", desc: "One Flutter codebase for iOS and Android, with native performance." },
  { icon: "🔥", title: "Firebase backends", desc: "Auth, Firestore, Cloud Functions, push notifications and security rules." },
  { icon: "🖥️", title: "Admin panels", desc: "Web dashboards to manage your users, orders and content." },
  { icon: "🎨", title: "Figma to Flutter", desc: "Your design built into accurate, animated, responsive screens." },
  { icon: "🛠️", title: "Fix & improve", desc: "Bugs, slow apps, crashes, or an old codebase that needs an upgrade." },
  { icon: "🚀", title: "Store launch", desc: "Play Store and App Store setup, review and release." },
];

export default async function Home() {
  const videos = (await getVideos()).slice(0, 5);
  return (
    <>
      <section className="hero hero-home">
        <div className="hero-bg" aria-hidden="true">
          <span className="blob b1" /><span className="blob b2" /><span className="blob b3" />
          <div className="grid-bg" />
        </div>
        <div className="container hero-grid">
          <div>
            <p className="available rise"><span className="pulse-dot" /> Available for new projects</p>
            <h1 className="reveal" style={{ "--d": "80ms" }}>
              I build <span className="accent">Flutter apps</span> for{" "}
              <span className="rotator">
                <span>startups.</span>
                <span>businesses.</span>
                <span>your idea.</span>
                <span>startups.</span>
              </span>
            </h1>
            <p className="lead rise" style={{ "--d": "160ms" }}>
              {site.yearsExperience}+ years turning ideas and designs into fast, beautiful apps for iOS, Android
              and web, from first screen to App Store launch.
            </p>
            <div className="hero-cta rise" style={{ "--d": "240ms" }}>
              <Link href="/hire/#quote" className="btn btn-large shine">Get a free quote</Link>
              <Link href="/shop/" className="btn btn-large btn-outline">Quick fixes from $25</Link>
            </div>
            <div className="stats rise" style={{ "--d": "320ms" }}>
              {site.stats.map((s) => (
                <div key={s.label}>
                  <CountUp value={s.value} />
                  <span>{s.label}</span>
                </div>
              ))}
            </div>
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee />

      <About />

      <section className="section">
        <div className="container">
          <h2 className="reveal">What I can build for you</h2>
          <div className="grid grid-3">
            {services.map((s, i) => (
              <div key={s.title} className="card reveal" style={{ "--d": `${i * 70}ms` }}>
                <div className="gig-icon">{s.icon}</div>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="reveal">Need something small? ⚡</h2>
              <p className="muted section-lead reveal">Fixed price, fast delivery. Order in one click.</p>
            </div>
            <Link href="/shop/" className="btn btn-outline">All services →</Link>
          </div>
          <ServiceCards items={quickServices} limit={3} />
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <h2 className="reveal">Recent work</h2>
          <p className="muted section-lead reveal">Real apps I've built for clients and products.</p>
          <div className="grid grid-3">
            {projects.map((p, i) => (
              <div key={p.title} className="card project reveal" style={{ "--d": `${i * 70}ms` }}>
                <span className="tag">{p.type}</span>
                <h3>{p.title}</h3>
                <p className="muted">{p.desc}</p>
                <div className="chips">
                  {p.tech.map((t) => <span key={t} className="chip">{t}</span>)}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <div className="section-head">
            <div>
              <h2 className="reveal">Watch me build Flutter apps</h2>
              <p className="muted section-lead reveal">Quick Flutter UI builds. Like one? Grab the code for free.</p>
            </div>
            <Link href="/videos/" className="btn btn-outline">All videos →</Link>
          </div>
          {videos.length > 0 && <VideoGrid videos={videos} />}
          <div style={{ marginTop: 32 }}><SocialLinks /></div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal">Free source code 🎁</h2>
          <p className="muted section-lead reveal">The code from my videos, free on GitHub. Learn from it, use it in your apps.</p>
          <FreeCode />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2 className="reveal">Build a full app with me</h2>
          <p className="muted section-lead reveal">Starting prices. Every project gets a free, exact quote.</p>
          <Packages />
        </div>
      </section>

      <section className="section">
        <div className="container narrow"><Newsletter /></div>
      </section>

      <section className="section cta">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container center">
          <h2 className="reveal">Ready to build your app?</h2>
          <p className="lead reveal">Tell me about your idea. I reply within 24 hours.</p>
          <Link href="/hire/#quote" className="btn btn-large shine reveal">Start your project</Link>
        </div>
      </section>
    </>
  );
}
