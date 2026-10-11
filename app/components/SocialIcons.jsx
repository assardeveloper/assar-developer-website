import { siYoutube, siInstagram, siTiktok, siFacebook, siGithub } from "simple-icons";
import { site } from "@/site.config";

// Official brand logos; each lights up in its brand color on hover.
const brands = [
  { key: "youtube", icon: siYoutube, label: "YouTube", color: "#FF0000" },
  { key: "instagram", icon: siInstagram, label: "Instagram", color: "#E1306C" },
  { key: "tiktok", icon: siTiktok, label: "TikTok", color: "#000000" },
  { key: "facebook", icon: siFacebook, label: "Facebook", color: "#0866FF" },
  { key: "github", icon: siGithub, label: "GitHub", color: "#24292F" },
];

export default function SocialIcons({ className = "" }) {
  return (
    <div className={`social-icons ${className}`}>
      {brands
        .filter((b) => site.social[b.key])
        .map((b) => (
          <a
            key={b.key}
            href={site.social[b.key]}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={b.label}
            title={b.label}
            data-track={`social:${b.key}`}
            style={{ "--brand": b.color }}
          >
            <svg viewBox="0 0 24 24" width="17" height="17" aria-hidden="true">
              <path d={b.icon.path} fill="currentColor" />
            </svg>
          </a>
        ))}
    </div>
  );
}
