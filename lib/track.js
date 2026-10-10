// Sends a click/action to GoatCounter as an event, e.g. track("order:Fix My Flutter Bug").
// The part before ":" is the category the admin groups by (order, chat, code, quote, ...).
export const IGNORE_KEY = "gc_ignore"; // set on the owner's devices so their own visits aren't counted

export function isIgnored() {
  try { return localStorage.getItem(IGNORE_KEY) === "1"; } catch { return false; }
}

export function eventPath(name) {
  const [cat, ...rest] = name.split(":");
  const label = rest.join(":").toLowerCase().trim().replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
  return label ? `${cat.toLowerCase()}:${label}` : cat.toLowerCase();
}

export function track(name) {
  if (typeof window === "undefined" || isIgnored()) return;
  window.goatcounter?.count?.({ path: eventPath(name), title: name, event: true });
}
