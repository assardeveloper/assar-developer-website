import SponsorAudience from "../components/SponsorAudience";
import SponsorPackages from "../components/SponsorPackages";
import SponsorForm from "../components/SponsorForm";
import SponsoredVideos from "../components/SponsoredVideos";

export const metadata = {
  title: "Sponsor Me: Reach Flutter Developers",
  description: "Promote your tool, app, course or website to Flutter and mobile developers through my YouTube, TikTok and Instagram videos, blog and website.",
};

const why = [
  { icon: "🎯", title: "A focused audience", desc: "Flutter and mobile developers who build apps and buy tools, courses and services." },
  { icon: "🎬", title: "Short, high-reach videos", desc: "Fast Flutter UI Shorts that get watched to the end on YouTube, TikTok and Instagram." },
  { icon: "🔗", title: "Links that last", desc: "Your link stays in the video description and on my website long after posting." },
  { icon: "📊", title: "Honest reporting", desc: "You get the views and link clicks for your promotion after it runs." },
];

const faqs = [
  { q: "How do payments work?", a: "50% to book the date and 50% when the content goes live. I accept bank transfer, Payoneer and Wise." },
  { q: "Can I review the video before it's posted?", a: "Yes. For dedicated videos you approve the script, and I share the final video before posting." },
  { q: "Will the promotion be labeled?", a: "Yes. Every promotion is clearly marked as sponsored, as the platforms require. It keeps trust high, which is good for you too." },
  { q: "What don't you promote?", a: "Anything I wouldn't recommend to my own viewers: gambling, scams, or products that don't work." },
];

export default function Sponsor() {
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container">
          <p className="eyebrow rise">Sponsor me</p>
          <h1 className="rise" style={{ "--d": "80ms" }}>
            Put your product in front of <span className="accent">Flutter developers</span>.
          </h1>
          <p className="lead rise" style={{ "--d": "160ms" }}>
            Promote your tool, app, course or website through my videos, blog and website.
          </p>
          <div className="hero-cta rise" style={{ "--d": "240ms" }}>
            <a href="#book" className="btn btn-large shine" data-track="sponsorship:hero">Book a sponsorship</a>
            <a href="#packages" className="btn btn-large btn-outline">See packages</a>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <h2 className="reveal">My audience</h2>
          <p className="muted section-lead reveal">Real numbers, updated regularly.</p>
          <SponsorAudience />
          <div className="grid grid-4 why-grid">
            {why.map((w, i) => (
              <div key={w.title} className="card reveal" style={{ "--d": `${i * 70}ms` }}>
                <div className="gig-icon">{w.icon}</div>
                <h3>{w.title}</h3>
                <p className="muted">{w.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section section-alt" id="packages">
        <div className="container">
          <h2 className="reveal">Packages</h2>
          <p className="muted section-lead reveal">Pick one, or ask for a custom bundle.</p>
          <SponsorPackages />
        </div>
      </section>

      <SponsoredVideos />

      <section className="section" id="book">
        <div className="container narrow">
          <div className="quote-head">
            <img src="/assar-avatar.jpg" alt="Assar Baloch" />
            <div>
              <h2>Book a sponsorship</h2>
              <p className="muted">Tell me about your product. I reply within 24 hours with available dates.</p>
            </div>
          </div>
          <SponsorForm />
        </div>
      </section>

      <section className="section section-alt">
        <div className="container narrow">
          <h2>Questions</h2>
          {faqs.map((f) => (
            <details key={f.q} className="faq">
              <summary>{f.q}</summary>
              <p className="muted">{f.a}</p>
            </details>
          ))}
        </div>
      </section>
    </>
  );
}
