import Link from "next/link";
import { site } from "@/site.config";
import SocialLinks from "./SocialLinks";

export default function Footer() {
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
