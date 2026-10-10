import { site } from "@/site.config";
import ServiceCards from "../components/ServiceCards";
import FreeCode from "../components/FreeCode";
import Newsletter from "../components/Newsletter";

export const metadata = {
  title: "Shop: Flutter Services & Source Code",
  description: "Fixed-price Flutter services (bug fixes, Figma to Flutter, store publishing) and ready-to-use Flutter UI source code.",
};

export default function Shop() {
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container">
          <p className="eyebrow rise">Shop</p>
          <h1 className="reveal" style={{ "--d": "80ms" }}>
            Fast help. <span className="accent">Fixed prices.</span>
          </h1>
          <p className="lead rise" style={{ "--d": "160ms" }}>
            No long contracts. Pick what you need, pay once, and get it done in days, not months.
          </p>
        </div>
      </section>

      <section className="section" id="services">
        <div className="container">
          <h2 className="reveal">Quick services</h2>
          <p className="muted section-lead reveal">Delivered by me personally, with 6+ years of Flutter experience.</p>
          <ServiceCards />
        </div>
      </section>

      <section className="section section-alt" id="code">
        <div className="container">
          <h2 className="reveal">Free Flutter UI source code 🎁</h2>
          <p className="muted section-lead reveal">The exact code from my videos, free on GitHub.</p>
          <FreeCode />
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <Newsletter />
          {site.tipUrl && (
            <p className="center muted" style={{ marginTop: 32 }}>
              Like my free content? <a href={site.tipUrl} target="_blank" rel="noopener noreferrer">Buy me a coffee ☕</a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
