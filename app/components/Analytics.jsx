"use client";

import { useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import { useContent } from "@/lib/content";
import { isIgnored, track } from "@/lib/track";

// Loads GoatCounter (privacy-friendly, no cookies) once a site code is set in /admin.
// Counts page views on every page change, and clicks on anything with data-track or a WhatsApp link.
export default function Analytics() {
  const { site } = useContent();
  const pathname = usePathname();
  const loaded = useRef(false);
  const code = site.goatcounter?.trim();
  const off = !code || pathname.startsWith("/admin");

  useEffect(() => {
    if (off || loaded.current || isIgnored()) return;
    loaded.current = true;
    window.goatcounter = { no_onload: true };
    const s = document.createElement("script");
    s.async = true;
    s.src = "https://gc.zgo.at/count.js";
    s.dataset.goatcounter = `https://${code}.goatcounter.com/count`;
    s.onload = () => window.goatcounter.count?.({ path: location.pathname });
    document.head.appendChild(s);
  }, [off, code]);

  useEffect(() => {
    if (off || !loaded.current || !window.goatcounter?.count || isIgnored()) return;
    window.goatcounter.count({ path: pathname });
  }, [pathname, off]);

  useEffect(() => {
    if (off) return;
    const onClick = (e) => {
      const el = e.target.closest?.('[data-track], a[href*="wa.me/"]');
      if (el) track(el.dataset.track || "chat:whatsapp-link");
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, [off]);

  return null;
}
