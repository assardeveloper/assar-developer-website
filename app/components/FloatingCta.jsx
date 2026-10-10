"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content";

export default function FloatingCta() {
  const { site } = useContent();
  const pathname = usePathname();
  if (pathname.startsWith("/admin")) return null;
  const href = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Assar, I need a Flutter app.")}` : "/hire/#quote";
  return (
    <Link href={href} className="floating-cta" data-track="chat:floating-button" aria-label="Chat with Assar">
      <img src="/assar-avatar.jpg" alt="" /> <span>Chat on WhatsApp</span>
    </Link>
  );
}
