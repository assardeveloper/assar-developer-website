import fs from "fs";
import path from "path";
import { marked } from "marked";

// Blog posts are Markdown files in content/posts/. The file name is the URL:
// content/posts/flutter-login-screen.md → /blog/flutter-login-screen/
const DIR = path.join(process.cwd(), "content/posts");

function parse(file) {
  const raw = fs.readFileSync(path.join(DIR, file), "utf8");
  const match = raw.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  const meta = {};
  for (const line of (match?.[1] ?? "").split("\n")) {
    const i = line.indexOf(":");
    if (i > 0) meta[line.slice(0, i).trim()] = line.slice(i + 1).trim().replace(/^"|"$/g, "");
  }
  const body = match?.[2] ?? raw;
  const words = body.split(/\s+/).filter(Boolean).length;
  return {
    slug: file.replace(/\.md$/, ""),
    title: meta.title ?? file,
    description: meta.description ?? "",
    date: meta.date ?? "",
    tags: (meta.tags ?? "").split(",").map((t) => t.trim()).filter(Boolean),
    readTime: Math.max(1, Math.round(words / 200)),
    body,
  };
}

export function getPosts() {
  if (!fs.existsSync(DIR)) return [];
  return fs
    .readdirSync(DIR)
    .filter((f) => f.endsWith(".md"))
    .map(parse)
    .sort((a, b) => b.date.localeCompare(a.date));
}

export function getPost(slug) {
  const post = getPosts().find((p) => p.slug === slug);
  return post ? { ...post, html: marked.parse(post.body) } : null;
}

export function formatDate(iso) {
  return new Date(`${iso}T00:00:00`).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}
