import fs from "fs";
import path from "path";
import { site } from "@/site.config";

// Loads your latest videos at build time, trying in order:
//   1. the channel's Shorts page (no API key needed),
//   2. the channel's RSS feed,
//   3. content/videos-cache.json, the last list that loaded successfully.
// So a YouTube hiccup never leaves the Videos page empty.
const CACHE = path.join(process.cwd(), "content/videos-cache.json");
const UA = "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/130 Safari/537.36";

let memo;

export async function getVideos() {
  if (memo) return memo;
  for (const source of [fromShortsPage, fromFeed]) {
    try {
      const videos = await source();
      if (videos.length) {
        try { fs.writeFileSync(CACHE, JSON.stringify(videos, null, 2) + "\n"); } catch {}
        return (memo = videos);
      }
    } catch {}
  }
  try {
    return (memo = JSON.parse(fs.readFileSync(CACHE, "utf8")));
  } catch {
    return (memo = []);
  }
}

async function fromShortsPage() {
  const res = await fetch(`https://www.youtube.com/channel/${site.youtubeChannelId}/shorts`, {
    headers: { "User-Agent": UA, "Accept-Language": "en-US,en" },
  });
  if (!res.ok) return [];
  const html = await res.text();
  const json = html.match(/var ytInitialData = (\{.*?\});<\/script>/s)?.[1];
  if (!json) return [];
  const out = [];
  (function walk(o) {
    if (!o || typeof o !== "object") return;
    const v = o.shortsLockupViewModel;
    if (v) {
      const id = v.onTap?.innertubeCommand?.reelWatchEndpoint?.videoId;
      const title = v.overlayMetadata?.primaryText?.content;
      if (id && title) out.push(video(id, title, parseViews(v.overlayMetadata?.secondaryText?.content)));
    }
    for (const x of Object.values(o)) walk(x);
  })(JSON.parse(json));
  return out;
}

async function fromFeed() {
  const res = await fetch(`https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`);
  if (!res.ok) return [];
  const xml = await res.text();
  return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
    const get = (re) => entry.match(re)?.[1] ?? "";
    return video(get(/<yt:videoId>(.*?)<\/yt:videoId>/), decode(get(/<title>(.*?)<\/title>/)), Number(get(/<media:statistics views="(\d+)"/)) || 0);
  });
}

function video(id, title, views) {
  return {
    id,
    title: cleanTitle(title),
    views,
    url: `https://www.youtube.com/shorts/${id}`,
    thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
  };
}

// "9.6K views" → 9600
function parseViews(s = "") {
  const m = s.replace(/,/g, "").match(/([\d.]+)\s*([KMB]?)/i);
  if (!m) return 0;
  return Math.round(parseFloat(m[1]) * ({ K: 1e3, M: 1e6, B: 1e9 }[m[2].toUpperCase()] ?? 1));
}

function decode(s) {
  return s
    .replace(/&amp;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#39;/g, "'")
    .replace(/&lt;/g, "<")
    .replace(/&gt;/g, ">");
}

// Drop the hashtags so titles read cleanly on the site.
function cleanTitle(s) {
  return s.replace(/#\S+/g, "").replace(/\s+/g, " ").trim();
}
