const tech = ["Flutter", "Dart", "Firebase", "Riverpod", "Bloc", "GetX", "Supabase", "Stripe", "Google Maps", "REST APIs", "WebRTC", "Animations", "Cloud Functions", "Provider"];

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Technologies I use">
      <div className="marquee-track">
        {[...tech, ...tech].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
