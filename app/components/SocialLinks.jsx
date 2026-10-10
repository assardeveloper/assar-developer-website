import { site } from "@/site.config";

const labels = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook", github: "GitHub" };

export default function SocialLinks() {
  return (
    <div className="social">
      {Object.entries(site.social).map(([key, url]) => (
        <a key={key} href={url} target="_blank" rel="noopener noreferrer">
          {labels[key] ?? key}
        </a>
      ))}
    </div>
  );
}
