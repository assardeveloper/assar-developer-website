import fs from "fs";
import path from "path";
import { execFileSync } from "child_process";

// Reads public profile numbers (followers, likes, video count) at build time,
// with content/tiktok-cache.json as a fallback when TikTok doesn't answer.
const CACHE = path.join(process.cwd(), "content/tiktok-cache.json");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

export async function getTikTokStats(user) {
  try {
    // TikTok serves a bot check to Node's fetch, but the full page to curl.
    const html = execFileSync("curl", ["-sL", "--max-time", "20", "-A", UA, "-H", "Accept-Language: en-US,en", `https://www.tiktok.com/@${user}`], { encoding: "utf8", maxBuffer: 20e6 });
    const blob = html.match(/<script id="__UNIVERSAL_DATA_FOR_REHYDRATION__"[^>]*>(.*?)<\/script>/s)?.[1];
    const stats = blob && JSON.parse(blob)?.__DEFAULT_SCOPE__?.["webapp.user-detail"]?.userInfo?.stats;
    if (stats?.followerCount) {
      const out = { followers: stats.followerCount, likes: stats.heartCount ?? stats.heart, videos: stats.videoCount, user };
      try { fs.writeFileSync(CACHE, JSON.stringify(out, null, 2) + "\n"); } catch {}
      return out;
    }
  } catch {}
  try {
    return JSON.parse(fs.readFileSync(CACHE, "utf8"));
  } catch {
    return null;
  }
}
