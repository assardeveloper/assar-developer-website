"use client";

import { useEffect, useState } from "react";
import { fixed } from "@/site.config";
import { verifyToken, loadContent, saveContent } from "@/lib/github-admin";
import { lockSecret, unlockSecret } from "@/lib/crypto";
import { IGNORE_KEY } from "@/lib/track";
import AnalyticsPanel from "./AnalyticsPanel";

const tabs = [
  { id: "dashboard", label: "Dashboard", icon: "🏠" },
  { id: "analytics", label: "Analytics", icon: "📈" },
  { id: "general", label: "General", icon: "⚙️" },
  { id: "products", label: "Products", icon: "💎" },
  { id: "sponsors", label: "Sponsors", icon: "💰" },
  { id: "services", label: "Quick services", icon: "⚡" },
  { id: "packages", label: "Packages", icon: "📦" },
  { id: "projects", label: "Projects", icon: "💼" },
  { id: "stats", label: "Stats", icon: "📊" },
  { id: "faqs", label: "FAQs", icon: "❓" },
  { id: "videos", label: "Video code", icon: "🎬" },
];

// The GitHub key, locked with your password, is stored only on this device.
const LOCK_KEY = "assar_admin_lock";
// While logged in, the unlocked key is kept for this browser tab only.
const SESSION_KEY = "assar_admin_session";
// Older versions stored the key unlocked; it's moved into the locked format on first use.
const OLD_KEY = "assar_admin_key";

const store = {
  get: (s, k) => { try { return s.getItem(k); } catch { return null; } },
  set: (s, k, v) => { try { s.setItem(k, v); } catch {} },
  del: (s, k) => { try { s.removeItem(k); } catch {} },
};

export default function AdminApp() {
  const [state, setState] = useState({ ready: false });

  useEffect(() => {
    const session = store.get(sessionStorage, SESSION_KEY);
    const lock = store.get(localStorage, LOCK_KEY);
    const old = store.get(localStorage, OLD_KEY);
    setState({ ready: true, token: session, lock: lock ? JSON.parse(lock) : null, oldKey: old });
  }, []);

  function loggedIn(token) {
    store.set(sessionStorage, SESSION_KEY, token);
    store.set(localStorage, IGNORE_KEY, "1"); // don't count the owner's own visits
    store.del(localStorage, OLD_KEY);
    setState((s) => ({ ...s, token, lock: JSON.parse(store.get(localStorage, LOCK_KEY) || "null"), oldKey: null }));
  }

  function logout() {
    store.del(sessionStorage, SESSION_KEY);
    setState((s) => ({ ...s, token: null }));
  }

  function forgetDevice() {
    store.del(localStorage, LOCK_KEY);
    store.del(sessionStorage, SESSION_KEY);
    setState((s) => ({ ...s, token: null, lock: null }));
  }

  if (!state.ready) return <div className="admin-center"><div className="spinner" /></div>;
  if (state.token) return <Dashboard token={state.token} onLogout={logout} />;
  if (state.lock) return <PasswordLogin lock={state.lock} onLogin={loggedIn} onReset={forgetDevice} />;
  return <Setup initialKey={state.oldKey ?? ""} onDone={loggedIn} />;
}

/* ───────────── Password login ───────────── */

function PasswordLogin({ lock, onLogin, onReset }) {
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const [fails, setFails] = useState(0);

  async function submit(e) {
    e.preventDefault();
    setBusy(true);
    setError("");
    // Each wrong attempt waits a little longer.
    if (fails > 0) await new Promise((r) => setTimeout(r, Math.min(fails, 10) * 700));
    const token = await unlockSecret(lock, password);
    if (!token) {
      setFails((f) => f + 1);
      setError("Wrong password. Try again.");
      setBusy(false);
      return;
    }
    try {
      await verifyToken(token);
      onLogin(token);
    } catch (err) {
      setError(`${err.message} Your GitHub key may have expired. Use “Forgot password” to set up a new one.`);
      setBusy(false);
    }
  }

  return (
    <section className="admin-center">
      <form className="card admin-login" onSubmit={submit}>
        <img src="/assar-avatar.jpg" alt="" className="admin-login-avatar" />
        <h1>Admin login</h1>
        <p className="muted">Welcome back! Enter your password.</p>
        <label className="admin-field">
          <span>Password</span>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required autoFocus autoComplete="current-password" />
        </label>
        {error && <p className="error">{error}</p>}
        <button className="btn shine" disabled={busy}>{busy ? "Unlocking…" : "Log in"}</button>
        <button
          type="button"
          className="admin-link"
          onClick={() => confirm("This removes the saved login from this device. You'll need your GitHub key to set a new password. Continue?") && onReset()}
        >
          Forgot password?
        </button>
      </form>
    </section>
  );
}

/* ───────────── First-time setup on this device ───────────── */

function Setup({ initialKey, onDone }) {
  const [key, setKey] = useState(initialKey);
  const [password, setPassword] = useState("");
  const [confirmPw, setConfirmPw] = useState("");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  async function submit(e) {
    e.preventDefault();
    setError("");
    if (password.length < 8) return setError("Use at least 8 characters for your password.");
    if (password !== confirmPw) return setError("The passwords don't match.");
    setBusy(true);
    try {
      await verifyToken(key.trim());
      const lock = await lockSecret(key.trim(), password);
      store.set(localStorage, LOCK_KEY, JSON.stringify(lock));
      onDone(key.trim());
    } catch (err) {
      setError(err.message);
      setBusy(false);
    }
  }

  return (
    <section className="admin-center">
      <form className="card admin-login admin-setup" onSubmit={submit}>
        <img src="/assar-avatar.jpg" alt="" className="admin-login-avatar" />
        <h1>Set up admin on this device</h1>
        <p className="muted">One time only. After this, you log in with just your password.</p>

        <div className="admin-step">
          <span className="step">1</span>
          <div>
            <strong>Paste your GitHub key</strong>
            <details className="admin-help-box">
              <summary>How do I get it?</summary>
              <ol className="admin-help">
                <li>
                  Open{" "}
                  <a href="https://github.com/settings/personal-access-tokens/new" target="_blank" rel="noopener noreferrer">
                    GitHub → New fine-grained token
                  </a>{" "}
                  (logged in as <b>{fixed.githubUser}</b>).
                </li>
                <li>Name: <b>Website admin</b>. Expiration: the longest option.</li>
                <li>Repository access → <b>Only select repositories</b> → <b>{fixed.githubRepo}</b>.</li>
                <li>Permissions → Repository permissions → <b>Contents</b> → <b>Read and write</b>.</li>
                <li>Click <b>Generate token</b> and copy it.</li>
              </ol>
            </details>
            <input type="password" value={key} onChange={(e) => setKey(e.target.value)} placeholder="github_pat_…" required autoComplete="off" />
          </div>
        </div>

        <div className="admin-step">
          <span className="step">2</span>
          <div>
            <strong>Choose your admin password</strong>
            <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" required autoComplete="new-password" />
            <input type="password" value={confirmPw} onChange={(e) => setConfirmPw(e.target.value)} placeholder="Type it again" required autoComplete="new-password" />
          </div>
        </div>

        {error && <p className="error">{error}</p>}
        <button className="btn shine" disabled={busy}>{busy ? "Setting up…" : "Save & log in"}</button>
        <p className="muted small">Your key is locked with your password and saved only on this device. It's never uploaded.</p>
      </form>
    </section>
  );
}

/* ───────────── Dashboard ───────────── */

function Dashboard({ token, onLogout }) {
  const [tab, setTab] = useState("dashboard");
  const [data, setData] = useState(null);
  const [saved, setSaved] = useState(null); // last saved JSON string
  const [sha, setSha] = useState(null);
  const [status, setStatus] = useState({ type: "", text: "" });
  const [saving, setSaving] = useState(false);

  async function load() {
    setStatus({ type: "", text: "" });
    try {
      const { data, sha } = await loadContent(token);
      setData(data);
      setSaved(JSON.stringify(data));
      setSha(sha);
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    }
  }

  useEffect(() => { load(); }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const dirty = data && JSON.stringify(data) !== saved;

  useEffect(() => {
    const warn = (e) => { if (dirty) { e.preventDefault(); e.returnValue = ""; } };
    window.addEventListener("beforeunload", warn);
    return () => window.removeEventListener("beforeunload", warn);
  }, [dirty]);

  async function save() {
    setSaving(true);
    setStatus({ type: "", text: "" });
    try {
      const newSha = await saveContent(token, data, sha);
      setSha(newSha);
      setSaved(JSON.stringify(data));
      setStatus({ type: "ok", text: "Saved! Your website will show the changes within 1–5 minutes." });
    } catch (err) {
      setStatus({ type: "error", text: err.message });
    } finally {
      setSaving(false);
    }
  }

  const set = (key, value) => setData((d) => ({ ...d, [key]: value }));
  const setSite = (key, value) => setData((d) => ({ ...d, site: { ...d.site, [key]: value } }));

  return (
    <div className="admin">
      <aside className="admin-side">
        <div className="admin-me">
          <img src="/assar-avatar.jpg" alt="" />
          <div>
            <strong>Admin</strong>
            <span className="muted small">{fixed.githubUser}</span>
          </div>
        </div>
        <nav>
          {tabs.map((t) => (
            <button key={t.id} className={tab === t.id ? "active" : ""} onClick={() => setTab(t.id)}>
              <span>{t.icon}</span> {t.label}
            </button>
          ))}
        </nav>
        <div className="admin-side-foot">
          <a href="/" target="_blank" rel="noopener noreferrer">↗ View website</a>
          <button onClick={onLogout}>⎋ Log out</button>
        </div>
      </aside>

      <section className="admin-main">
        {!data ? (
          status.type === "error" ? (
            <div className="card"><p className="error">{status.text}</p><button className="btn" onClick={load}>Try again</button></div>
          ) : (
            <div className="admin-center"><div className="spinner" /></div>
          )
        ) : (
          <>
            {tab === "dashboard" && <Overview data={data} setSite={setSite} go={setTab} />}
            {tab === "analytics" && <AnalyticsPanel code={data.site.goatcounter?.trim()} goGeneral={() => setTab("general")} />}
            {tab === "general" && <General site={data.site} setSite={setSite} />}
            {tab === "products" && (
              <ListEditor
                title="Products"
                hint="Source code you sell. Leave Payment link empty and buyers message you on WhatsApp; you send JazzCash / Easypaisa / bank details there."
                items={data.products ?? []}
                onChange={(v) => set("products", v)}
                titleKey="name"
                newItem={{ name: "New project", price: "$3", desc: "", features: ["Full Flutter source code"], video: "", buyUrl: "", hidden: false }}
                fields={[
                  { key: "name", label: "Name" },
                  { key: "price", label: "Price", short: true },
                  { key: "desc", label: "Description", type: "textarea" },
                  { key: "features", label: "What's included (one per line)", type: "lines" },
                  { key: "video", label: "YouTube demo link (shows the thumbnail)" },
                  { key: "buyUrl", label: "Lemon Squeezy checkout link (card payments + automatic download)" },
                  { key: "hidden", label: "Hide from website", type: "checkbox" },
                ]}
              />
            )}
            {tab === "sponsors" && (
              <>
                <ListEditor
                  title="Active sponsors"
                  hint="Paid “Sponsored” spots on your home page and blog. They disappear automatically after the end date."
                  items={data.sponsorSlots ?? []}
                  onChange={(v) => set("sponsorSlots", v)}
                  titleKey="name"
                  newItem={{ name: "Brand name", text: "", url: "https://", image: "", cta: "Learn more", until: "", hidden: false }}
                  fields={[
                    { key: "name", label: "Brand name" },
                    { key: "until", label: "Show until (end date)", type: "date", short: true },
                    { key: "cta", label: "Button text", short: true },
                    { key: "text", label: "Short message", type: "textarea" },
                    { key: "url", label: "Their link" },
                    { key: "image", label: "Logo image link (optional)" },
                    { key: "hidden", label: "Hide now", type: "checkbox" },
                  ]}
                />
                <div style={{ height: 40 }} />
                <ListEditor
                  title="Audience numbers"
                  hint="Shown on your Sponsor page. Use real numbers: sponsors check them. Leave empty to hide a platform."
                  items={data.sponsorAudience ?? []}
                  onChange={(v) => set("sponsorAudience", v)}
                  titleKey="platform"
                  newItem={{ platform: "New platform", followers: "", avgViews: "", note: "", url: "" }}
                  fields={[
                    { key: "platform", label: "Platform", short: true },
                    { key: "followers", label: "Followers (e.g. 12K)", short: true },
                    { key: "avgViews", label: "Average views (e.g. 5K)", short: true },
                    { key: "note", label: "Note (optional)" },
                    { key: "url", label: "Profile link" },
                  ]}
                />
                <div style={{ height: 40 }} />
                <ListEditor
                  title="Sponsor packages"
                  hint="What brands can buy, shown on your Sponsor page."
                  items={data.sponsorPackages ?? []}
                  onChange={(v) => set("sponsorPackages", v)}
                  titleKey="name"
                  newItem={{ name: "New package", price: "$50", desc: "", features: [], popular: false }}
                  fields={[
                    { key: "name", label: "Name" },
                    { key: "price", label: "Price", short: true },
                    { key: "desc", label: "Description", type: "textarea" },
                    { key: "features", label: "What's included (one per line)", type: "lines" },
                    { key: "popular", label: "Show “Best results” badge", type: "checkbox" },
                  ]}
                />
                <div style={{ height: 40 }} />
                <ListEditor
                  title="Sponsored videos"
                  hint="Paid videos you made for brands. Shown on your Sponsor page as proof for future sponsors."
                  items={data.sponsoredVideos ?? []}
                  onChange={(v) => set("sponsoredVideos", v)}
                  titleKey="title"
                  newItem={{ title: "Video title", brand: "", url: "" }}
                  fields={[
                    { key: "title", label: "Video title" },
                    { key: "brand", label: "Brand", short: true },
                    { key: "url", label: "YouTube link" },
                  ]}
                />
              </>
            )}
            {tab === "services" && (
              <ListEditor
                title="Quick services"
                hint="Small fixed-price services on your Shop page. Leave Payment link empty to take orders on WhatsApp."
                items={data.quickServices}
                onChange={(v) => set("quickServices", v)}
                titleKey="name"
                newItem={{ name: "New service", price: "$25", time: "24 hours", desc: "", icon: "✨", buyUrl: "", popular: false, hidden: false }}
                fields={[
                  { key: "name", label: "Name" },
                  { key: "icon", label: "Icon (emoji)", short: true },
                  { key: "price", label: "Price", short: true },
                  { key: "time", label: "Delivery time", short: true },
                  { key: "desc", label: "Description", type: "textarea" },
                  { key: "buyUrl", label: "Payment link (optional)" },
                  { key: "popular", label: "Show “Best seller” badge", type: "checkbox" },
                  { key: "hidden", label: "Hide from website", type: "checkbox" },
                ]}
              />
            )}
            {tab === "packages" && (
              <ListEditor
                title="Packages"
                hint="Full app packages on the Hire Me page and home page."
                items={data.packages}
                onChange={(v) => set("packages", v)}
                titleKey="name"
                newItem={{ name: "New package", price: "$500", time: "2 weeks", desc: "", features: [], highlight: false }}
                fields={[
                  { key: "name", label: "Name" },
                  { key: "price", label: "Starting price", short: true },
                  { key: "time", label: "Timeline", short: true },
                  { key: "desc", label: "Description", type: "textarea" },
                  { key: "features", label: "Features (one per line)", type: "lines" },
                  { key: "highlight", label: "Show “Most popular” badge", type: "checkbox" },
                ]}
              />
            )}
            {tab === "projects" && (
              <ListEditor
                title="Projects"
                hint="Your portfolio in the “Recent work” section."
                items={data.projects}
                onChange={(v) => set("projects", v)}
                titleKey="title"
                newItem={{ title: "New project", type: "Client app", desc: "", tech: ["Flutter"], hidden: false }}
                fields={[
                  { key: "title", label: "Title" },
                  { key: "type", label: "Label (e.g. Client app)" },
                  { key: "desc", label: "Description", type: "textarea" },
                  { key: "tech", label: "Technologies (comma separated)", type: "csv" },
                  { key: "hidden", label: "Hide from website", type: "checkbox" },
                ]}
              />
            )}
            {tab === "stats" && (
              <ListEditor
                title="Stats"
                hint="The numbers under your headline. Use real numbers, they build trust."
                items={data.stats}
                onChange={(v) => set("stats", v)}
                titleKey="label"
                newItem={{ value: "10+", label: "New stat" }}
                fields={[
                  { key: "value", label: "Number (e.g. 50+)", short: true },
                  { key: "label", label: "Label" },
                ]}
              />
            )}
            {tab === "faqs" && (
              <ListEditor
                title="FAQs"
                hint="Questions on the Hire Me page."
                items={data.faqs}
                onChange={(v) => set("faqs", v)}
                titleKey="q"
                newItem={{ q: "New question?", a: "" }}
                fields={[
                  { key: "q", label: "Question" },
                  { key: "a", label: "Answer", type: "textarea" },
                ]}
              />
            )}
            {tab === "videos" && <VideoCode map={data.videoCode ?? {}} onChange={(v) => set("videoCode", v)} />}
          </>
        )}
      </section>

      {data && (
        <div className={`admin-savebar ${dirty || status.text ? "show" : ""}`}>
          <span className={status.type === "error" ? "error" : status.type === "ok" ? "success" : "muted"}>
            {status.text || (dirty ? "You have unsaved changes" : "")}
          </span>
          {dirty && (
            <div className="admin-savebar-actions">
              <button className="btn btn-outline btn-small" onClick={() => setData(JSON.parse(saved))} disabled={saving}>Discard</button>
              <button className="btn btn-small shine" onClick={save} disabled={saving}>{saving ? "Saving…" : "Save & publish"}</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}

/* ───────────── Sections ───────────── */

function Overview({ data, setSite, go }) {
  const cards = [
    { label: "Products for sale", value: (data.products ?? []).filter((p) => !p.hidden).length, tab: "products" },
    { label: "Quick services", value: data.quickServices.filter((s) => !s.hidden).length, tab: "services" },
    { label: "Packages", value: data.packages.length, tab: "packages" },
    { label: "Projects", value: data.projects.filter((p) => !p.hidden).length, tab: "projects" },
    { label: "Videos with code", value: Object.keys(data.videoCode ?? {}).length, tab: "videos" },
  ];
  return (
    <>
      <h1 className="admin-title">Welcome back, {data.site.owner.split(" ")[0]} 👋</h1>
      <p className="muted">Manage everything on your website. Changes go live 1–5 minutes after you save.</p>

      <div className="admin-stats">
        {cards.map((c) => (
          <button key={c.label} className="card admin-stat" onClick={() => go(c.tab)}>
            <strong>{c.value}</strong>
            <span className="muted small">{c.label}</span>
          </button>
        ))}
      </div>

      <div className="card admin-block">
        <h3>Quick controls</h3>
        <Toggle
          label="Available for new projects"
          desc="Off shows “Fully booked: join the waitlist” on your home page."
          checked={data.site.available}
          onChange={(v) => setSite("available", v)}
        />
        <Field
          label="Announcement bar (leave empty to hide)"
          value={data.site.announcement}
          onChange={(v) => setSite("announcement", v)}
          placeholder="🎉 50% off app development this month!"
        />
      </div>

      <div className="card admin-block">
        <h3>Shortcuts</h3>
        <div className="admin-shortcuts">
          <button className="admin-chip" onClick={() => go("analytics")}>📈 Analytics</button>
          <a href="/" target="_blank" rel="noopener noreferrer">🌐 Website</a>
          <a href={fixed.social.youtube} target="_blank" rel="noopener noreferrer">▶️ YouTube</a>
          <a href={fixed.social.github} target="_blank" rel="noopener noreferrer">🐙 GitHub</a>
          <a href={`https://wa.me/${data.site.whatsapp}`} target="_blank" rel="noopener noreferrer">💬 WhatsApp</a>
          <a href={`https://github.com/${fixed.githubUser}/${fixed.githubRepo}/commits/main`} target="_blank" rel="noopener noreferrer">🕑 Change history</a>
        </div>
      </div>
    </>
  );
}

const brands = [
  { id: "violet", label: "Purple", colors: ["#7c3aed", "#f472b6"] },
  { id: "blue", label: "Blue", colors: ["#1e6bff", "#5ee7c3"] },
  { id: "emerald", label: "Green", colors: ["#059669", "#2dd4bf"] },
  { id: "orange", label: "Orange", colors: ["#ea580c", "#fb7185"] },
  { id: "pink", label: "Pink", colors: ["#db2777", "#c084fc"] },
];

function BrandPicker({ value, onChange }) {
  return (
    <div className="card admin-block">
      <h3>Website color</h3>
      <p className="muted small" style={{ margin: 0 }}>Changes the main color of your website and admin. Preview here, then Save &amp; publish.</p>
      <div className="brand-picker">
        {brands.map((b) => (
          <button
            key={b.id}
            type="button"
            className={`brand-swatch ${(value || "violet") === b.id ? "on" : ""}`}
            onClick={() => {
              document.documentElement.dataset.brand = b.id;
              onChange(b.id);
            }}
          >
            <span style={{ background: `linear-gradient(135deg, ${b.colors[0]}, ${b.colors[1]})` }} />
            {b.label}
          </button>
        ))}
      </div>
    </div>
  );
}

function General({ site, setSite }) {
  return (
    <>
      <h1 className="admin-title">General</h1>
      <BrandPicker value={site.brand} onChange={(v) => setSite("brand", v)} />
      <div className="card admin-block">
        <div className="admin-grid">
          <Field label="Website name" value={site.name} onChange={(v) => setSite("name", v)} />
          <Field label="Your name" value={site.owner} onChange={(v) => setSite("owner", v)} />
          <Field label="Years of experience" type="number" value={site.yearsExperience} onChange={(v) => setSite("yearsExperience", Number(v) || 0)} />
          <Field label="Email" type="email" value={site.email} onChange={(v) => setSite("email", v)} />
          <Field label="WhatsApp (digits only, e.g. 923001234567)" value={site.whatsapp} onChange={(v) => setSite("whatsapp", v.replace(/\D/g, ""))} />
          <Field label="Formspree form ID (optional)" value={site.formspreeId} onChange={(v) => setSite("formspreeId", v)} />
          <Field label="Tip / Buy me a coffee link (optional)" value={site.tipUrl} onChange={(v) => setSite("tipUrl", v)} />
          <Field label="GoatCounter code (for Analytics)" value={site.goatcounter} onChange={(v) => setSite("goatcounter", v.trim().toLowerCase())} placeholder="assardeveloper" />
        </div>
        <Field label="Short description (used by Google on the next deploy)" type="textarea" value={site.description} onChange={(v) => setSite("description", v)} />
        <Toggle label="Available for new projects" checked={site.available} onChange={(v) => setSite("available", v)} />
        <Field label="Announcement bar (leave empty to hide)" value={site.announcement} onChange={(v) => setSite("announcement", v)} />
      </div>
    </>
  );
}

function VideoCode({ map, onChange }) {
  const [videos, setVideos] = useState(null);

  useEffect(() => {
    fetch("/videos.json").then((r) => (r.ok ? r.json() : [])).then(setVideos).catch(() => setVideos([]));
  }, []);

  const setLink = (id, url) => {
    const next = { ...map };
    if (url.trim()) next[id] = url.trim();
    else delete next[id];
    onChange(next);
  };

  return (
    <>
      <h1 className="admin-title">Video source code</h1>
      <p className="muted">Paste a GitHub link next to a video. Its button changes from “Code on GitHub” to “Free code →”.</p>
      {!videos ? (
        <div className="spinner" />
      ) : (
        <div className="admin-videos">
          {videos.map((v) => (
            <div key={v.id} className="card admin-video">
              <img src={v.thumbnail} alt="" />
              <div>
                <strong>{v.title}</strong>
                <input value={map[v.id] ?? ""} onChange={(e) => setLink(v.id, e.target.value)} placeholder="https://github.com/assardeveloper/…" />
              </div>
            </div>
          ))}
          {videos.length === 0 && <p className="muted">No videos found yet.</p>}
        </div>
      )}
    </>
  );
}

/* ───────────── Reusable editors ───────────── */

function ListEditor({ title, hint, items, onChange, fields, titleKey, newItem }) {
  const [open, setOpen] = useState(null);

  const update = (i, key, value) => onChange(items.map((it, j) => (j === i ? { ...it, [key]: value } : it)));
  const move = (i, dir) => {
    const j = i + dir;
    if (j < 0 || j >= items.length) return;
    const next = [...items];
    [next[i], next[j]] = [next[j], next[i]];
    onChange(next);
    setOpen(j);
  };
  const remove = (i) => {
    if (!confirm(`Delete “${items[i][titleKey]}”?`)) return;
    onChange(items.filter((_, j) => j !== i));
    setOpen(null);
  };
  const add = () => {
    onChange([...items, { ...newItem }]);
    setOpen(items.length);
  };

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">{title}</h1>
          <p className="muted">{hint}</p>
        </div>
        <button className="btn btn-small" onClick={add}>+ Add</button>
      </div>
      <div className="admin-list">
        {items.map((item, i) => (
          <div key={i} className={`card admin-item ${open === i ? "open" : ""} ${item.hidden ? "is-hidden" : ""}`}>
            <div className="admin-item-head" onClick={() => setOpen(open === i ? null : i)}>
              <span className="admin-item-title">
                {item.icon ? `${item.icon} ` : ""}{item[titleKey] || "Untitled"}
                {item.price && <span className="muted small"> · {item.price}</span>}
                {item.hidden && <span className="admin-pill">Hidden</span>}
              </span>
              <span className="admin-item-actions" onClick={(e) => e.stopPropagation()}>
                <button onClick={() => move(i, -1)} title="Move up">↑</button>
                <button onClick={() => move(i, 1)} title="Move down">↓</button>
                <button onClick={() => remove(i)} title="Delete" className="danger">✕</button>
              </span>
            </div>
            {open === i && (
              <div className="admin-item-body admin-grid">
                {fields.map((f) =>
                  f.type === "checkbox" ? (
                    <Toggle key={f.key} label={f.label} checked={!!item[f.key]} onChange={(v) => update(i, f.key, v)} />
                  ) : (
                    <Field
                      key={f.key}
                      label={f.label}
                      wide={!f.short}
                      type={f.type === "lines" || f.type === "textarea" ? "textarea" : f.type === "date" ? "date" : "text"}
                      value={
                        f.type === "lines" ? (item[f.key] ?? []).join("\n") : f.type === "csv" ? (item[f.key] ?? []).join(", ") : item[f.key] ?? ""
                      }
                      onChange={(v) =>
                        update(
                          i,
                          f.key,
                          f.type === "lines" ? v.split("\n") : f.type === "csv" ? v.split(",").map((s) => s.trim()).filter(Boolean) : v
                        )
                      }
                    />
                  )
                )}
              </div>
            )}
          </div>
        ))}
        {items.length === 0 && <p className="muted">Nothing here yet. Click “+ Add”.</p>}
      </div>
    </>
  );
}

function Field({ label, value, onChange, type = "text", placeholder, wide }) {
  return (
    <label className={`admin-field ${wide || type === "textarea" ? "wide" : ""}`}>
      <span>{label}</span>
      {type === "textarea" ? (
        <textarea rows={4} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      ) : (
        <input type={type} value={value ?? ""} onChange={(e) => onChange(e.target.value)} placeholder={placeholder} />
      )}
    </label>
  );
}

function Toggle({ label, desc, checked, onChange }) {
  return (
    <label className="admin-toggle wide">
      <input type="checkbox" checked={!!checked} onChange={(e) => onChange(e.target.checked)} />
      <span className="switch" />
      <span>
        {label}
        {desc && <span className="muted small admin-toggle-desc">{desc}</span>}
      </span>
    </label>
  );
}
