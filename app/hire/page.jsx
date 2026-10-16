import { site } from "@/site.config";
import Years from "../components/Years";
import Faqs from "../components/Faqs";
import Reviews from "../components/Reviews";
import Packages from "../components/Packages";
import QuoteForm from "../components/QuoteForm";
import BookCall, { CallHours } from "../components/BookCall";

export const metadata = {
  title: "Hire a Flutter Developer",
  description: `Hire ${site.owner}, a Flutter developer with ${site.yearsExperience}+ years of experience. Mobile apps, Firebase backends, admin panels. Free quote in 24 hours.`,
};

const steps = [
  { n: "1", title: "Tell me your idea", desc: "Fill in the form. I reply within 24 hours." },
  { n: "2", title: "Get a clear quote", desc: "Fixed price, timeline and milestones. No surprises." },
  { n: "3", title: "Watch it come to life", desc: "Weekly builds you can test on your own phone." },
  { n: "4", title: "Launch", desc: "I publish to the stores and hand over all source code." },
];

export default function Hire() {
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container">
          <p className="eyebrow">Hire me</p>
          <h1>
            Let's build your <span className="accent">app</span>.
          </h1>
          <p className="lead">
            <Years />+ years building Flutter apps for startups and businesses. Clear
            prices, weekly updates, and you own all the code.
          </p>
          <div className="hero-cta" style={{ margin: "24px 0 0" }}>
            <a href="#quote" className="btn btn-large shine">Get a free quote</a>
            <BookCall track="hire:hire-hero-book-call" />
          </div>
          <CallHours />
        </div>
      </section>

      <section className="section" id="packages">
        <div className="container">
          <h2>Packages</h2>
          <Packages />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container">
          <h2>How it works</h2>
          <div className="grid grid-4">
            {steps.map((s) => (
              <div key={s.n} className="card reveal" style={{ "--d": `${Number(s.n) * 80}ms` }}>
                <span className="step">{s.n}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Reviews title="Clients love working with me" intro="Don't just take my word for it." />

      <section className="section" id="quote">
        <div className="container narrow">
          <div className="quote-head">
            <img src="/assar-avatar.jpg" alt={site.owner} />
            <div>
              <h2>Get a free quote</h2>
              <p className="muted">You'll hear back from me personally, usually within a few hours.</p>
              <CallHours />
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <h2>Questions</h2>
          <Faqs />
        </div>
      </section>
    </>
  );
}
