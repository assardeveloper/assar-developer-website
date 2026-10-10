"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content";
import SocialLinks from "./SocialLinks";

export default function Footer() {
  const { site } = useContent();
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  return (
    <footer className="footer">
      <div className="container footer-grid">
        <div>
          <p className="footer-name">{site.name}</p>
          <p className="muted">Flutter apps for iOS, Android & web.</p>
        </div>
        <div>
          <p className="eyebrow-sm">Contact</p>
          <a href={`mailto:${site.email}`}>{site.email}</a>
          {site.whatsapp && (
            <a href={`https://wa.me/${site.whatsapp}`} target="_blank" rel="noopener noreferrer">
              WhatsApp ↗
            </a>
          )}
        </div>
        <div>
          <p className="eyebrow-sm">Elsewhere</p>
          <SocialLinks />
        </div>
      </div>
      <div className="container footer-bottom muted small">
        <span>© {new Date().getFullYear()} {site.owner}</span>
        <Link href="/hire/">Start a project →</Link>
      </div>
    </footer>
  );
}
