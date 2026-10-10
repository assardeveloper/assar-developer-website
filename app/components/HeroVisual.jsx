import PhoneMockup from "./PhoneMockup";
import { site } from "@/site.config";

// Profile photo in an animated gradient ring, with the animated phone floating beside it.
export default function HeroVisual() {
  return (
    <div className="hero-visual rise" style={{ "--d": "200ms" }}>
      <div className="photo-ring">
        <img src="/assar.jpg" alt={`${site.owner}, Flutter developer`} className="photo" />
      </div>
      <div className="photo-badge">
        <strong>{site.yearsExperience}+ yrs</strong>
        <span>Flutter experience</span>
      </div>
      <div className="mini-phone">
        <PhoneMockup />
      </div>
    </div>
  );
}
