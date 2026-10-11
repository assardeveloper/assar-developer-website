"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { site } from "@/site.config";
import ThemeToggle from "./ThemeToggle";
import SocialIcons from "./SocialIcons";

const links = [
  { href: "/", label: "Home" },
  { href: "/#work", label: "Projects" },
  { href: "/videos/", label: "Videos" },
  { href: "/blog/", label: "Blog" },
  { href: "/shop/", label: "Shop" },
  { href: "/sponsor/", label: "Sponsor" },
  { href: "/#about", label: "About" },
  { href: "/hire/#quote", label: "Contact" },
];

export default function Header() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  // Close the phone menu whenever the page changes.
  useEffect(() => setOpen(false), [pathname]);

  const isActive = (href) => (href === "/" ? pathname === "/" : !href.includes("#") && pathname.startsWith(href));

  return (
    <header className={`header ${open ? "menu-open" : ""}`}>
      <div className="container header-inner">
        <Link href="/" className="logo">
          <img src="/assar-avatar.jpg" alt="" className="logo-avatar" />
          <span>
            Assar <span className="logo-dim">Developer</span>
          </span>
        </Link>

        <nav className="nav" aria-label="Main">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={isActive(l.href) ? "active" : ""} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <SocialIcons className="header-social" />
          <ThemeToggle />
          <Link href="/hire/#quote" data-track="hire:header" className="btn btn-small shine header-hire">
            Hire Me
          </Link>
          <button className="menu-btn" onClick={() => setOpen(!open)} aria-label={open ? "Close menu" : "Open menu"} aria-expanded={open}>
            <span /><span /><span />
          </button>
        </div>
      </div>

      <div className="mobile-menu" hidden={!open}>
        <div className="container">
          {links.map((l) => (
            <Link key={l.label} href={l.href} className={isActive(l.href) ? "active" : ""} onClick={() => setOpen(false)}>
              {l.label}
            </Link>
          ))}
          <Link href="/hire/#quote" className="btn shine" onClick={() => setOpen(false)}>
            Hire Me
          </Link>
          <SocialIcons className="menu-social" />
        </div>
      </div>
    </header>
  );
}
