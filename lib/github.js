import { site } from "@/site.config";

// Loads your public GitHub repos, newest first. Runs at build time and again in the visitor's
// browser, so making a repo private (or adding a new one) shows up without a redeploy.
export async function getRepos() {
  try {
    const res = await fetch(`https://api.github.com/users/${site.githubUser}/repos?sort=pushed&per_page=100`, {
      headers: { Accept: "application/vnd.github+json" },
    });
    if (!res.ok) return null;
    const repos = await res.json();
    return repos
      .filter((r) => !r.fork && !r.archived && r.name !== site.githubUser && r.name !== "assar-developer-website")
      .map((r) => ({
        name: prettify(r.name),
        url: r.html_url,
        desc: r.description || "Free Flutter UI source code.",
        stars: r.stargazers_count,
      }));
  } catch {
    return null;
  }
}

// "spedah-login-sign-up" → "Spedah Login Sign Up"
function prettify(name) {
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}
