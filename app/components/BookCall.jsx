"use client";

import Link from "next/link";
import { useContent } from "@/lib/content";

// "Book a call" button. Without a booking link (set in /admin → General) it shows the fallback link instead.
export default function BookCall({ className = "btn btn-large btn-outline", track = "hire:book-call", fallback }) {
  const { site } = useContent();
  if (site.bookingUrl) {
    return (
      <a href={site.bookingUrl} target="_blank" rel="noopener noreferrer" data-track={track} className={className}>
        📅 Book a call
      </a>
    );
  }
  return fallback ? <Link href={fallback.href} className={className}>{fallback.label}</Link> : null;
}

export function CallHours({ className = "muted call-hours" }) {
  const { site } = useContent();
  return site.callHours ? <p className={className}>🌍 {site.callHours}</p> : null;
}
