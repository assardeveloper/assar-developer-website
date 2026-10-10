"use client";

import { useContent } from "@/lib/content";
import CountUp from "./CountUp";

export default function Stats() {
  const { site } = useContent();
  return (
    <dl className="stats rise" style={{ "--d": "240ms" }}>
      {site.stats.map((s) => (
        <div key={s.label}>
          <dt>{s.label}</dt>
          <dd><CountUp value={s.value} /></dd>
        </div>
      ))}
    </dl>
  );
}
