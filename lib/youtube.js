import { site } from "@/site.config";

// Loads the latest videos from the channel's public RSS feed (no API key needed).
// Runs at build time, so new uploads appear each time the site is rebuilt/redeployed.
export async function getVideos() {
  const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${site.youtubeChannelId}`;
  try {
    const res = await fetch(url);
    if (!res.ok) return [];
    const xml = await res.text();
    return [...xml.matchAll(/<entry>([\s\S]*?)<\/entry>/g)].map(([, entry]) => {
      const get = (re) => entry.match(re)?.[1] ?? "";
      const id = get(/<yt:videoId>(.*?)<\/yt:videoId>/);
      return {
        id,
        title: cleanTitle(decode(get(/<title>(.*?)<\/title>/))),
        views: Number(get(/<media:statistics views="(\d+)"/)) || 0,
        url: `https://www.youtube.com/shorts/${id}`,
        thumbnail: `https://i.ytimg.com/vi/${id}/hqdefault.jpg`,
      };
    });
  } catch {
    return [];
  }
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

export function formatViews(n) {
  if (n >= 1_000_000) return `${(n / 1_000_000).toFixed(1)}M`;
  if (n >= 1_000) return `${(n / 1_000).toFixed(1)}K`;
  return String(n);
}
