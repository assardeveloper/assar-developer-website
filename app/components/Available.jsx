"use client";

import { useContent } from "@/lib/content";

export default function Available() {
  const { site } = useContent();
  return site.available ? (
    <p className="available rise"><span className="pulse-dot" /> Available for new projects</p>
  ) : (
    <p className="available available-off rise"><span className="pulse-dot" /> Fully booked: join the waitlist</p>
  );
}
