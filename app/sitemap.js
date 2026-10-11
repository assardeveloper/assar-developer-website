import { site } from "@/site.config";
import { getPosts } from "@/lib/posts";

export const dynamic = "force-static";

export default function sitemap() {
  const pages = ["", "/hire/", "/videos/", "/shop/", "/blog/"].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() }));
  const posts = getPosts().map((p) => ({ url: `${site.url}/blog/${p.slug}/`, lastModified: new Date(p.date) }));
  return [...pages, ...posts];
}
