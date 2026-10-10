import Link from "next/link";
import Packages from "./components/Packages";
import VideoGrid from "./components/VideoGrid";
import Stats from "./components/Stats";
import Years from "./components/Years";
import Available from "./components/Available";
import Projects from "./components/Projects";
import HeroVisual from "./components/HeroVisual";
import About from "./components/About";
import Marquee from "./components/Marquee";
import ServiceCards from "./components/ServiceCards";
import FreeCode from "./components/FreeCode";
import PaidCode from "./components/PaidCode";
import Newsletter from "./components/Newsletter";
import SectionHead from "./components/SectionHead";
import SocialLinks from "./components/SocialLinks";
import { getVideos } from "@/lib/youtube";

const services = [
  { title: "Mobile apps", desc: "One Flutter codebase for iOS and Android, with native performance." },
  { title: "Firebase backends", desc: "Auth, Firestore, Cloud Functions, push notifications and security rules." },
  { title: "Admin panels", desc: "Web dashboards to manage your users, orders and content." },
  { title: "Figma to Flutter", desc: "Your design, built into accurate, animated, responsive screens." },
  { title: "Fix & improve", desc: "Bugs, slow screens, crashes, or an old codebase that needs an upgrade." },
  { title: "Store launch", desc: "Play Store and App Store setup, review and release." },
];

export default async function Home() {
  const videos = (await getVideos()).slice(0, 5);
  return (
    <>
      <section className="hero">
        <div className="container hero-grid">
          <div className="hero-copy">
            <Available />
            <h1 className="rise" style={{ "--d": "60ms" }}>
              Flutter apps that feel <em>right</em> in your hand.
            </h1>
            <p className="lead rise" style={{ "--d": "120ms" }}>
              I'm Assar. For <Years />+ years I've been turning ideas and designs into polished apps for iOS,
              Android and the web, from the first screen to the App Store.
            </p>
            <div className="hero-cta rise" style={{ "--d": "180ms" }}>
              <Link href="/hire/#quote" data-track="hire:hero-quote" className="btn">Start a project</Link>
              <Link href="/shop/" data-track="hire:hero-quick-fixes" className="btn btn-ghost">Quick fixes from $25</Link>
            </div>
            <Stats />
          </div>
          <HeroVisual />
        </div>
      </section>

      <Marquee />

      <About />

      <section className="section">
        <div className="container">
          <SectionHead n="02" label="Services" title="What I can build for you" />
          <ol className="service-list">
            {services.map((s, i) => (
              <li key={s.title} className="reveal" style={{ "--d": `${i * 50}ms` }}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            n="03"
            label="Quick help"
            title="Small jobs, fixed prices"
            intro="Pick what you need and order in one click. Delivered in days, not weeks."
            link={{ href: "/shop/", label: "All services" }}
          />
          <ServiceCards limit={3} />
        </div>
      </section>

      <section className="section" id="work">
        <div className="container">
          <SectionHead n="04" label="Work" title="Recent projects" intro="Apps I've built for clients and products." />
          <Projects />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead
            n="05"
            label="Videos"
            title="Watch me build"
            intro="Short Flutter UI builds from my channel."
            link={{ href: "/videos/", label: "All videos" }}
          />
          {videos.length > 0 && <VideoGrid videos={videos} />}
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead n="06" label="Source code" title="Get the code" intro="Complete projects for a few dollars, and free code from my videos." />
          <PaidCode />
          <div className="subhead reveal">
            <h3>Free on GitHub</h3>
          </div>
          <FreeCode />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead n="07" label="Pricing" title="Build a full app with me" intro="Starting prices. Every project gets a free, exact quote." />
          <Packages />
        </div>
      </section>

      <section className="section">
        <div className="container"><Newsletter /></div>
      </section>

      <section className="section cta">
        <div className="container">
          <h2 className="reveal">Have an app in mind?<br /><em>Let's talk.</em></h2>
          <div className="cta-row reveal">
            <Link href="/hire/#quote" data-track="hire:bottom-cta" className="btn">Start a project</Link>
            <SocialLinks />
          </div>
        </div>
      </section>
    </>
  );
}
