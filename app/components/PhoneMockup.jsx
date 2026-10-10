// A phone showing an animated Flutter-style login screen (pure CSS animation).
export default function PhoneMockup() {
  return (
    <div className="phone-wrap" aria-hidden="true">
      <div className="phone">
        <div className="notch" />
        <div className="screen">
          <div className="app-logo">◆</div>
          <p className="app-hello">Welcome back 👋</p>
          <p className="app-sub">Sign in to continue</p>
          <div className="field"><span className="type type-1">assar@flutter.dev</span></div>
          <div className="field"><span className="type type-2">••••••••••</span></div>
          <div className="app-btn"><span>Sign In</span></div>
          <div className="app-or">or continue with</div>
          <div className="app-socials"><i /><i /><i /></div>
        </div>
      </div>
      <div className="float-chip chip-a">⚡ 60 FPS</div>
      <div className="float-chip chip-b">🔥 Firebase</div>
      <div className="float-chip chip-c">💙 Flutter</div>
    </div>
  );
}
