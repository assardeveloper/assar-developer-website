import Link from "next/link";
import { site } from "@/site.config";

export default function FloatingCta() {
  const href = site.whatsapp ? `https://wa.me/${site.whatsapp}?text=${encodeURIComponent("Hi Assar, I need a Flutter app.")}` : "/hire/#quote";
  return (
    <Link href={href} className="floating-cta" aria-label="Hire me">
      <span className="fc-avatar"><img src="/assar-avatar.jpg" alt="" /><span className="pulse-dot" /></span> Chat with Assar
    </Link>
  );
}
