import { fixed } from "@/site.config";

// Reads and writes content/site.json in the website's GitHub repo, using the owner's access key.
const API = `https://api.github.com/repos/${fixed.githubUser}/${fixed.githubRepo}`;

const headers = (token) => ({
  Authorization: `Bearer ${token}`,
  Accept: "application/vnd.github+json",
  "X-GitHub-Api-Version": "2022-11-28",
});

// True only if the key can write to the website repo (i.e. it's the owner's key).
export async function verifyToken(token) {
  const res = await fetch(API, { headers: headers(token) });
  if (res.status === 401) throw new Error("This key is not valid. Check that you copied all of it.");
  if (res.status === 404) throw new Error("This key can't see the website repo. Give it access to assar-developer-website.");
  if (!res.ok) throw new Error(`GitHub error (${res.status}). Try again.`);
  const repo = await res.json();
  if (!repo.permissions?.push) throw new Error("This key can only read. Set Contents to “Read and write”.");
  return true;
}

export async function loadContent(token) {
  const res = await fetch(`${API}/contents/${fixed.contentPath}?ref=main&t=${Date.now()}`, { headers: headers(token), cache: "no-store" });
  if (!res.ok) throw new Error(`Could not load content (${res.status}).`);
  const file = await res.json();
  return { data: JSON.parse(fromBase64(file.content)), sha: file.sha };
}

export async function saveContent(token, data, sha) {
  const res = await fetch(`${API}/contents/${fixed.contentPath}`, {
    method: "PUT",
    headers: headers(token),
    body: JSON.stringify({
      message: "Update website content from admin",
      content: toBase64(JSON.stringify(data, null, 2) + "\n"),
      sha,
      branch: "main",
    }),
  });
  if (res.status === 409) throw new Error("The content changed somewhere else. Reload and try again.");
  if (!res.ok) throw new Error(`Save failed (${res.status}).`);
  const out = await res.json();
  return out.content.sha;
}

// base64 <-> text that keeps emoji and other non-English characters intact.
function fromBase64(b64) {
  const bytes = Uint8Array.from(atob(b64.replace(/\n/g, "")), (c) => c.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}
function toBase64(text) {
  let bin = "";
  new TextEncoder().encode(text).forEach((b) => (bin += String.fromCharCode(b)));
  return btoa(bin);
}
