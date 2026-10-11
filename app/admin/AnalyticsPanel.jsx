"use client";

import { useEffect, useState } from "react";
import { IGNORE_KEY } from "@/lib/track";

const KEY_STORE = "gc_api_key";

// What each event category means, in the order shown on the dashboard.
const categories = [
  { id: "buy", label: "Buy clicks", icon: "💎", hint: "Clicked “Buy” on premium source code" },
  { id: "sponsorship", label: "Sponsor page actions", icon: "💰", hint: "Brands picking a package or sending a sponsorship request" },
  { id: "sponsor", label: "Sponsor link clicks", icon: "📣", hint: "Clicks on a sponsor’s “Sponsored” spot (report these to sponsors)" },
  { id: "order", label: "Order clicks", icon: "🛒", hint: "“Order now” on a service (opens WhatsApp)" },
  { id: "checkout", label: "Checkout clicks", icon: "💳", hint: "Opened card checkout (real purchase attempts)" },
  { id: "chat", label: "WhatsApp chats", icon: "💬", hint: "Opened a chat with you" },
  { id: "quote", label: "Quote requests", icon: "📝", hint: "Sent the Hire Me form" },
  { id: "code", label: "Code clicks", icon: "🎁", hint: "Opened free source code" },
  { id: "newsletter", label: "Email signups", icon: "📧", hint: "Joined your email list" },
  { id: "hire", label: "Hire Me clicks", icon: "🤝", hint: "Clicked a Hire Me / quote button" },
  { id: "package", label: "Package interest", icon: "📦", hint: "Clicked “Get a quote” on a package" },
  { id: "video", label: "Video clicks", icon: "▶️", hint: "Opened a video on YouTube" },
  { id: "social", label: "Social clicks", icon: "🔗", hint: "Opened your YouTube, TikTok, etc." },
];

const periods = [
  { days: 1, label: "Today" },
  { days: 7, label: "7 days" },
  { days: 30, label: "30 days" },
  { days: 90, label: "90 days" },
];

const iso = (d) => d.toISOString().slice(0, 10);
const fmt = (n) => (n ?? 0).toLocaleString();

export default function AnalyticsPanel({ code, goGeneral }) {
  const [apiKey, setApiKey] = useState(null);
  const [keyInput, setKeyInput] = useState("");
  const [days, setDays] = useState(7);
  const [data, setData] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [ignore, setIgnore] = useState(true);

  useEffect(() => {
    try {
      setApiKey(localStorage.getItem(KEY_STORE) || "");
      setIgnore(localStorage.getItem(IGNORE_KEY) === "1");
    } catch {}
  }, []);

  useEffect(() => {
    if (!code || !apiKey) return;
    let cancelled = false;
    setLoading(true);
    setError("");
    load(code, apiKey, days)
      .then((d) => !cancelled && setData(d))
      .catch((err) => {
        if (cancelled) return;
        setError(err.message);
        if (err.status === 401 || err.status === 403) {
          try { localStorage.removeItem(KEY_STORE); } catch {}
          setApiKey("");
        }
      })
      .finally(() => !cancelled && setLoading(false));
    return () => { cancelled = true; };
  }, [code, apiKey, days]);

  function saveKey(e) {
    e.preventDefault();
    const k = keyInput.trim();
    try { localStorage.setItem(KEY_STORE, k); } catch {}
    setApiKey(k);
  }

  function toggleIgnore(v) {
    try { v ? localStorage.setItem(IGNORE_KEY, "1") : localStorage.removeItem(IGNORE_KEY); } catch {}
    setIgnore(v);
  }

  if (!code) {
    return (
      <>
        <h1 className="admin-title">Analytics</h1>
        <div className="card admin-block">
          <h3>Turn on visitor tracking (free, 2 minutes)</h3>
          <ol className="admin-help">
            <li>Go to <a href="https://www.goatcounter.com/signup" target="_blank" rel="noopener noreferrer">goatcounter.com/signup</a>.</li>
            <li>Code: <b>assardeveloper</b> (or anything free). Use your email and a password.</li>
            <li>Come back here → <button className="admin-link" onClick={goGeneral}>General</button> → paste the code in <b>GoatCounter code</b> → <b>Save &amp; publish</b>.</li>
          </ol>
          <p className="muted small">GoatCounter is privacy-friendly: no cookies, no cookie banner needed.</p>
        </div>
      </>
    );
  }

  if (apiKey === null) return <div className="spinner" />;

  if (!apiKey) {
    return (
      <>
        <h1 className="admin-title">Analytics</h1>
        <form className="card admin-block" onSubmit={saveKey}>
          <h3>Connect your stats (one time per device)</h3>
          <ol className="admin-help">
            <li>
              Open{" "}
              <a href={`https://${code}.goatcounter.com/user/api`} target="_blank" rel="noopener noreferrer">
                {code}.goatcounter.com → Settings → API
              </a>.
            </li>
            <li>Create a new key with only <b>Read statistics</b> ticked.</li>
            <li>Copy the key and paste it below.</li>
          </ol>
          {error && <p className="error">{error}</p>}
          <label className="admin-field">
            <span>GoatCounter API key</span>
            <input type="password" value={keyInput} onChange={(e) => setKeyInput(e.target.value)} required autoComplete="off" />
          </label>
          <button className="btn btn-small">Connect</button>
          <p className="muted small">The key can only read stats and is saved only on this device.</p>
        </form>
      </>
    );
  }

  const sums = data ? sumByCategory(data.events) : {};
  const topTiles = ["checkout", "buy", "order", "chat", "quote", "code"];

  return (
    <>
      <div className="admin-head">
        <div>
          <h1 className="admin-title">Analytics</h1>
          <p className="muted">Who visits your website and what they click.</p>
        </div>
        <div className="seg" role="group" aria-label="Time range">
          {periods.map((p) => (
            <button key={p.days} className={days === p.days ? "on" : ""} onClick={() => setDays(p.days)}>
              {p.label}
            </button>
          ))}
        </div>
      </div>

      {error && <div className="card admin-block"><p className="error">{error}</p></div>}

      {!data ? (
        <div className="spinner" />
      ) : (
        <div className={loading ? "an-loading" : ""}>
          <div className="an-tiles">
            <div className="card an-tile an-hero">
              <span className="muted small">👀 Visitors</span>
              <strong>{fmt(data.visitors)}</strong>
              <span className="muted small">{fmt(data.pageviews)} page views</span>
            </div>
            {topTiles.map((id) => {
              const c = categories.find((x) => x.id === id);
              return (
                <div key={id} className="card an-tile" title={c.hint}>
                  <span className="muted small">{c.icon} {c.label}</span>
                  <strong>{fmt(sums[id])}</strong>
                </div>
              );
            })}
          </div>
          <p className="muted small an-note">
            Sales are agreed on WhatsApp or paid on your payment page, so the site can't see the payment itself.
            Order, checkout and chat clicks show how many people started buying.
          </p>

          {days > 1 && <DailyChart stats={data.daily} />}

          <div className="an-grid">
            <RankList title="Top pages" rows={data.pages.map((p) => ({ name: p.path, count: p.count }))} />
            <RankList title="Top clicks" rows={data.events.map((e) => ({ name: e.title || e.path, count: e.count }))} />
            <RankList title="Where visitors come from" rows={data.refs.map((r) => ({ name: r.name || "Direct / unknown", count: r.count }))} />
            <RankList title="Countries" rows={data.countries.map((r) => ({ name: r.name || "Unknown", count: r.count }))} />
          </div>

          <div className="card admin-block">
            <h3>All click types</h3>
            <div className="an-cats">
              {categories.map((c) => (
                <div key={c.id} className="an-cat">
                  <span>{c.icon}</span>
                  <div>
                    <strong>{c.label}</strong>
                    <span className="muted small">{c.hint}</span>
                  </div>
                  <b>{fmt(sums[c.id])}</b>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="card admin-block">
        <label className="admin-toggle">
          <input type="checkbox" checked={ignore} onChange={(e) => toggleIgnore(e.target.checked)} />
          <span className="switch" />
          <span>
            Don't count my own visits on this device
            <span className="muted small admin-toggle-desc">Keeps your numbers honest while you check your own site.</span>
          </span>
        </label>
        <div className="admin-shortcuts">
          <a href={`https://${code}.goatcounter.com`} target="_blank" rel="noopener noreferrer">📈 Full GoatCounter dashboard</a>
          <button className="admin-link" onClick={() => { try { localStorage.removeItem(KEY_STORE); } catch {} setApiKey(""); setData(null); }}>
            Disconnect key
          </button>
        </div>
      </div>
    </>
  );
}

/* ───────────── Data ───────────── */

async function load(code, key, days) {
  const end = new Date();
  end.setDate(end.getDate() + 1);
  const start = new Date();
  start.setDate(start.getDate() - (days - 1));
  const range = `start=${iso(start)}&end=${iso(end)}`;
  const base = `https://${code}.goatcounter.com/api/v0`;
  const get = async (path) => {
    const res = await fetch(`${base}${path}`, { headers: { Authorization: `Bearer ${key}`, "Content-Type": "application/json" } });
    if (!res.ok) {
      const err = new Error(
        res.status === 401 || res.status === 403
          ? "That API key doesn't work. Create a new one with “Read statistics” and connect again."
          : `Couldn't load stats (${res.status}). Try again in a minute.`
      );
      err.status = res.status;
      throw err;
    }
    return res.json();
  };

  // GoatCounter allows 4 requests per second, so these run in two small batches.
  const [total, hits] = await Promise.all([get(`/stats/total?${range}`), get(`/stats/hits?${range}&limit=100`)]);
  const [refs, countries] = await Promise.all([
    get(`/stats/toprefs?${range}&limit=6`).catch(() => ({ stats: [] })),
    get(`/stats/locations?${range}&limit=6`).catch(() => ({ stats: [] })),
  ]);

  const list = hits.hits ?? [];
  const pages = list.filter((h) => !h.event).sort((a, b) => b.count - a.count);
  const events = list.filter((h) => h.event).sort((a, b) => b.count - a.count);
  return {
    visitors: Math.max(0, (total.total ?? 0) - (total.total_events ?? 0)),
    pageviews: pages.reduce((n, p) => n + p.count, 0),
    daily: (total.stats ?? []).slice(-days),
    pages: pages.slice(0, 6),
    events,
    refs: refs.stats ?? [],
    countries: countries.stats ?? [],
  };
}

function sumByCategory(events) {
  const out = {};
  for (const e of events) {
    const cat = e.path.split(":")[0];
    out[cat] = (out[cat] ?? 0) + e.count;
  }
  return out;
}

/* ───────────── Charts ───────────── */

function DailyChart({ stats }) {
  const [hover, setHover] = useState(null);
  const max = Math.max(1, ...stats.map((s) => s.daily));
  const label = (day) => new Date(`${day}T00:00:00`).toLocaleDateString(undefined, { month: "short", day: "numeric" });

  return (
    <div className="card admin-block">
      <div className="an-chart-head">
        <h3>Activity per day <span className="muted small">(visits + clicks)</span></h3>
        <span className="muted small">
          {hover !== null ? `${label(stats[hover].day)} · ${fmt(stats[hover].daily)} visits + clicks` : `Peak: ${fmt(max)}`}
        </span>
      </div>
      <div className="an-chart" role="img" aria-label={`Visits and clicks per day, highest ${max}`} onMouseLeave={() => setHover(null)}>
        <span className="an-ymax muted small">{fmt(max)}</span>
        {stats.map((s, i) => (
          <div
            key={s.day}
            className={`an-col ${hover === i ? "hover" : ""}`}
            onMouseEnter={() => setHover(i)}
            onFocus={() => setHover(i)}
            tabIndex={0}
            aria-label={`${label(s.day)}: ${s.daily} visits and clicks`}
          >
            <div className="an-bar" style={{ height: `${(s.daily / max) * 100}%` }} />
          </div>
        ))}
      </div>
      <div className="an-axis muted small">
        <span>{stats[0] && label(stats[0].day)}</span>
        <span>{stats.at(-1) && label(stats.at(-1).day)}</span>
      </div>
      <details className="an-table">
        <summary className="muted small">View as table</summary>
        <table>
          <thead><tr><th>Day</th><th>Visits + clicks</th></tr></thead>
          <tbody>
            {stats.map((s) => (
              <tr key={s.day}><td>{label(s.day)}</td><td>{fmt(s.daily)}</td></tr>
            ))}
          </tbody>
        </table>
      </details>
    </div>
  );
}

function RankList({ title, rows }) {
  const max = Math.max(1, ...rows.map((r) => r.count));
  return (
    <div className="card admin-block">
      <h3>{title}</h3>
      {rows.length === 0 ? (
        <p className="muted small">No data yet.</p>
      ) : (
        <ul className="an-rank">
          {rows.slice(0, 6).map((r) => (
            <li key={r.name} title={`${r.name}: ${r.count}`}>
              <div className="an-rank-row">
                <span className="an-rank-name">{r.name}</span>
                <b>{fmt(r.count)}</b>
              </div>
              <div className="an-rank-track"><div style={{ width: `${(r.count / max) * 100}%` }} /></div>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
