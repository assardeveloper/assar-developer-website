"use client";

import { useContent } from "@/lib/content";

export default function Available() {
  const { site } = useContent();
  return (
    <p className={`status rise ${site.available ? "" : "status-off"}`}>
      <span className="status-dot" />
      {site.available ? "Available for new projects" : "Fully booked · join the waitlist"}
    </p>
  );
}
