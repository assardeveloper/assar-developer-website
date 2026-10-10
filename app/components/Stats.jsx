"use client";

import { useContent } from "@/lib/content";
import CountUp from "./CountUp";

export default function Stats() {
  const { site } = useContent();
  return (
    <div className="stats rise" style={{ "--d": "320ms" }}>
      {site.stats.map((s) => (
        <div key={s.label}>
          <CountUp value={s.value} />
          <span>{s.label}</span>
        </div>
      ))}
    </div>
  );
}
