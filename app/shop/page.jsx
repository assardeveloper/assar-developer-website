import { site } from "@/site.config";
import ServiceCards from "../components/ServiceCards";
import FreeCode from "../components/FreeCode";
import PaidCode from "../components/PaidCode";
import Newsletter from "../components/Newsletter";
import PageHero from "../components/PageHero";
import SectionHead from "../components/SectionHead";

export const metadata = {
  title: "Shop: Flutter Services & Source Code",
  description: "Fixed-price Flutter services (bug fixes, Figma to Flutter, store publishing) and ready-to-use Flutter UI source code.",
};

export default function Shop() {
  return (
    <>
      <PageHero label="Shop" title={<>Fast help, <em>fixed prices.</em></>} intro="No long contracts. Pick what you need, pay once, and get it done in days." />

      <section className="section" id="services">
        <div className="container">
          <SectionHead n="01" label="Services" title="Quick services" intro="Done by me personally." />
          <ServiceCards />
        </div>
      </section>

      <section className="section" id="premium">
        <div className="container">
          <SectionHead n="02" label="Source code" title="Complete Flutter projects" intro="Ready to run. Pay once, get the full code." />
          <PaidCode />
        </div>
      </section>

      <section className="section" id="code">
        <div className="container">
          <SectionHead n="03" label="Free" title="Free code from my videos" />
          <FreeCode />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <Newsletter />
          {site.tipUrl && (
            <p className="muted" style={{ marginTop: 32 }}>
              Like the free content? <a href={site.tipUrl} target="_blank" rel="noopener noreferrer">Buy me a coffee ↗</a>
            </p>
          )}
        </div>
      </section>
    </>
  );
}
