import Link from "next/link";
import { getPosts, formatDate } from "@/lib/posts";
import SponsorSlot from "../components/SponsorSlot";

export const metadata = {
  title: "Flutter Blog & Tutorials",
  description: "Flutter tutorials and articles by Assar Developer: beautiful UI, Firebase, animations and tips from real client projects.",
};

export default function Blog() {
  const posts = getPosts();
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container">
          <p className="eyebrow rise">Blog</p>
          <h1 className="rise" style={{ "--d": "80ms" }}>
            Flutter <span className="accent">tutorials</span> &amp; articles
          </h1>
          <p className="lead rise" style={{ "--d": "160ms" }}>
            Beautiful UI, Firebase, animations and practical tips from real client projects.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container">
          <div className="grid grid-3">
            {posts.map((p, i) => (
              <Link key={p.slug} href={`/blog/${p.slug}/`} className="card post-card reveal" style={{ "--d": `${i * 70}ms` }}>
                <p className="post-meta">{formatDate(p.date)} · {p.readTime} min read</p>
                <h3>{p.title}</h3>
                <p className="muted">{p.description}</p>
                <span className="repo-cta">Read article →</span>
              </Link>
            ))}
          </div>
          {posts.length === 0 && <p className="muted">Articles coming soon.</p>}
          <SponsorSlot />
        </div>
      </section>
    </>
  );
}
