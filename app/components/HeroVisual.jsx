import { site } from "@/site.config";

export default function HeroVisual() {
  return (
    <figure className="portrait rise" style={{ "--d": "120ms" }}>
      <img src="/assar.jpg" alt={`${site.owner}, Flutter developer`} />
      <figcaption>
        <span>{site.owner}</span>
        <span className="muted">Flutter developer · Pakistan</span>
      </figcaption>
    </figure>
  );
}
