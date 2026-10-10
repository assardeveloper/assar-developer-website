"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content";

export default function Announcement() {
  const { site } = useContent();
  const pathname = usePathname();
  if (!site.announcement || pathname.startsWith("/admin")) return null;
  return (
    <div className="announcement">
      <div className="container">
        {site.announcement} <Link href="/hire/#quote">Message me →</Link>
      </div>
    </div>
  );
}
