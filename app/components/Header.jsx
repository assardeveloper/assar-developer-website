import Link from "next/link";
import { site } from "@/site.config";

export default function Header() {
  return (
    <header className="header">
      <div className="container header-inner">
        <Link href="/" className="logo">
          <img src="/assar-avatar.jpg" alt="" className="logo-avatar" />
          {site.name}
        </Link>
        <nav className="nav">
          <Link href="/#about">About</Link>
          <Link href="/#work">Work</Link>
          <Link href="/videos/">Videos</Link>
          <Link href="/shop/">Shop</Link>
          <Link href="/hire/#packages">Pricing</Link>
          <Link href="/hire/#quote" className="btn btn-small shine">
            Hire Me
          </Link>
        </nav>
      </div>
    </header>
  );
}
