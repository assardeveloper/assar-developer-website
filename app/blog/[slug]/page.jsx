import Link from "next/link";
import { notFound } from "next/navigation";
import { getPosts, getPost, formatDate } from "@/lib/posts";
import SponsorSlot from "../../components/SponsorSlot";

export const dynamicParams = false;

export function generateStaticParams() {
  return getPosts().map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }) {
  const post = getPost((await params).slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.description,
    openGraph: { title: post.title, description: post.description, type: "article" },
  };
}

export default async function Post({ params }) {
  const post = getPost((await params).slug);
  if (!post) notFound();
  const more = getPosts().filter((p) => p.slug !== post.slug).slice(0, 2);

  return (
    <>
      <article className="section post">
        <div className="container narrow">
          <Link href="/blog/" className="post-back">← All articles</Link>
          <p className="post-meta rise">{formatDate(post.date)} · {post.readTime} min read</p>
          <h1 className="post-title rise" style={{ "--d": "80ms" }}>{post.title}</h1>
          <p className="lead rise" style={{ "--d": "140ms" }}>{post.description}</p>
          <div className="post-author">
            <img src="/assar-avatar.jpg" alt="" />
            <div>
              <strong>Assar Baloch</strong>
              <span className="muted small">Flutter developer & YouTube creator</span>
            </div>
          </div>
          <div className="prose" dangerouslySetInnerHTML={{ __html: post.html }} />

          <SponsorSlot />

          <div className="card post-cta">
            <h3>Need this in your app?</h3>
            <p className="muted">I build Flutter apps for clients worldwide. Tell me about your project and get a free quote.</p>
            <div className="hero-cta">
              <Link href="/hire/#quote" className="btn shine" data-track="hire:blog">Get a free quote</Link>
              <Link href="/shop/" className="btn btn-outline">Get source code</Link>
            </div>
          </div>

          {more.length > 0 && (
            <div className="post-more">
              <h3>Keep reading</h3>
              {more.map((p) => (
                <Link key={p.slug} href={`/blog/${p.slug}/`} className="post-more-link">
                  {p.title} →
                </Link>
              ))}
            </div>
          )}
        </div>
      </article>
    </>
  );
}
