"use client";

import { useContent } from "@/lib/content";

export default function Faqs() {
  const { faqs } = useContent();
  return faqs.map((f, i) => (
    <details key={f.q + i} className="faq">
      <summary>{f.q}</summary>
      <p className="muted">{f.a}</p>
    </details>
  ));
}
