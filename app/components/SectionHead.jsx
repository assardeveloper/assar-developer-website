import Link from "next/link";

// Numbered section title: "01 — Services" label, serif heading, optional intro and link.
export default function SectionHead({ n, label, title, intro, link }) {
  return (
    <div className="section-head reveal">
      <div>
        <p className="eyebrow">
          <span>{n}</span> {label}
        </p>
        <h2>{title}</h2>
        {intro && <p className="muted section-intro">{intro}</p>}
      </div>
      {link && (
        <Link href={link.href} className="text-link">
          {link.label} →
        </Link>
      )}
    </div>
  );
}
