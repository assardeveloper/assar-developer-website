import { site } from "@/site.config";
import Packages from "../components/Packages";
import QuoteForm from "../components/QuoteForm";
import Years from "../components/Years";
import Faqs from "../components/Faqs";
import PageHero from "../components/PageHero";
import SectionHead from "../components/SectionHead";

export const metadata = {
  title: "Hire a Flutter Developer",
  description: `Hire ${site.owner}, a Flutter developer with ${site.yearsExperience}+ years of experience. Mobile apps, Firebase backends, admin panels. Free quote in 24 hours.`,
};

const steps = [
  { title: "Tell me your idea", desc: "Fill in the form below. I reply within 24 hours." },
  { title: "Get a clear quote", desc: "Fixed price, timeline and milestones. No surprises." },
  { title: "Watch it come together", desc: "Weekly builds you can test on your own phone." },
  { title: "Launch", desc: "I publish to the stores and hand over all the source code." },
];

export default function Hire() {
  return (
    <>
      <PageHero
        label="Hire me"
        title={<>Let's build <em>your</em> app.</>}
        intro={<><Years />+ years building Flutter apps for startups and businesses. Clear prices, weekly updates, and you own all the code.</>}
      />

      <section className="section" id="packages">
        <div className="container">
          <SectionHead n="01" label="Pricing" title="Packages" />
          <Packages />
        </div>
      </section>

      <section className="section">
        <div className="container">
          <SectionHead n="02" label="Process" title="How it works" />
          <ol className="steps">
            {steps.map((s, i) => (
              <li key={s.title} className="reveal" style={{ "--d": `${i * 60}ms` }}>
                <span className="num">{String(i + 1).padStart(2, "0")}</span>
                <h3>{s.title}</h3>
                <p className="muted">{s.desc}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      <section className="section" id="quote">
        <div className="container quote-grid">
          <div>
            <SectionHead n="03" label="Contact" title="Get a free quote" />
            <div className="quote-person">
              <img src="/assar-avatar.jpg" alt={site.owner} />
              <p className="muted">You'll hear back from me personally, usually within a few hours.</p>
            </div>
          </div>
          <QuoteForm />
        </div>
      </section>

      <section className="section">
        <div className="container narrow">
          <SectionHead n="04" label="FAQ" title="Questions" />
          <Faqs />
        </div>
      </section>
    </>
  );
}
