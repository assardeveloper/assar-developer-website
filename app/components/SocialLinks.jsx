import { site } from "@/site.config";

const labels = { youtube: "YouTube", instagram: "Instagram", tiktok: "TikTok", facebook: "Facebook", github: "GitHub" };

export default function SocialLinks() {
  return (
    <ul className="social">
      {Object.entries(site.social).map(([key, url]) => (
        <li key={key}>
          <a href={url} target="_blank" rel="noopener noreferrer" data-track={`social:${key}`}>
            {labels[key] ?? key} ↗
          </a>
        </li>
      ))}
    </ul>
  );
}
