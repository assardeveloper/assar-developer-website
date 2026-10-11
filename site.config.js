// ─────────────────────────────────────────────────────────────
//  Fixed settings. Text, prices, services, projects and FAQs live in
//  content/site.json: edit them at /admin on your website.
// ─────────────────────────────────────────────────────────────
import content from "./content/site.json";

export const fixed = {
  // Your live website address. Change if you buy a custom domain.
  url: "https://assardeveloper-dev.web.app",
  // The site loads your latest videos from this YouTube channel on every build.
  youtubeChannelId: "UCjwwMPtCOglPcBuwX1HMUNA",
  githubUser: "assardeveloper",
  githubRepo: "assar-developer-website",
  contentPath: "content/site.json",
  social: {
    youtube: "https://www.youtube.com/@assardeveloper",
    instagram: "https://www.instagram.com/assardeveloper/",
    tiktok: "https://www.tiktok.com/@assardeveloper2",
    facebook: "https://www.facebook.com/people/Assar-Developper/100092213422485/",
    github: "https://github.com/assardeveloper",
  },
};

// Raw file the live site re-reads on each visit, so admin changes appear without a redeploy.
export const liveContentUrl = `https://raw.githubusercontent.com/${fixed.githubUser}/${fixed.githubRepo}/main/${fixed.contentPath}`;

// Combines editable content (site.json) with the fixed settings above.
export function buildContent(c) {
  return {
    site: { ...c.site, ...fixed, stats: c.stats ?? [] },
    quickServices: (c.quickServices ?? []).filter((s) => !s.hidden),
    products: (c.products ?? []).filter((p) => !p.hidden),
    packages: c.packages ?? [],
    projects: (c.projects ?? []).filter((p) => !p.hidden),
    faqs: c.faqs ?? [],
    videoCode: c.videoCode ?? {},
    sponsorAudience: (c.sponsorAudience ?? []).filter((a) => a.followers || a.avgViews),
    sponsorPackages: c.sponsorPackages ?? [],
    // Sponsored spots show only until their end date ("until": "2026-11-30").
    sponsorSlots: (c.sponsorSlots ?? []).filter((s) => !s.hidden && (!s.until || s.until >= new Date().toISOString().slice(0, 10))),
    sponsoredVideos: c.sponsoredVideos ?? [],
  };
}

export const { site, quickServices, packages, projects, faqs, videoCode } = buildContent(content);
