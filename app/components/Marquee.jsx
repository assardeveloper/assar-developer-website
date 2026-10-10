const tech = ["Flutter", "Dart", "Firebase", "Riverpod", "Bloc", "GetX", "Supabase", "Stripe", "Google Maps", "REST APIs", "WebRTC", "Cloud Functions"];

export default function Marquee() {
  return (
    <div className="marquee" aria-label="Tools I work with">
      <div className="marquee-track">
        {[...tech, ...tech].map((t, i) => (
          <span key={i}>{t}</span>
        ))}
      </div>
    </div>
  );
}
