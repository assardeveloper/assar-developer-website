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
      <div className="container footer-inner">
        <div>
          <strong>{site.name}</strong>
          <p className="muted">Flutter apps for iOS, Android & Web.</p>
          <p className="muted">
            <a href={`mailto:${site.email}`}>{site.email}</a>
          </p>
        </div>
        <SocialLinks />
      </div>
      <div className="container muted small footer-bottom">
        © {new Date().getFullYear()} {site.owner}. <Link href="/hire/">Start a project →</Link>
      </div>
    </footer>
  );
}
