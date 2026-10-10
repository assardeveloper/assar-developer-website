// Sends a form straight to your inbox.
// Uses Formspree if a form ID is set in /admin, otherwise FormSubmit (free, no account:
// the very first message sends you a one-time "activate" email you must click).
export async function sendForm(site, subject, fields) {
  if (site.formspreeId) {
    const res = await fetch(`https://formspree.io/f/${site.formspreeId}`, {
      method: "POST",
      headers: { Accept: "application/json", "Content-Type": "application/json" },
      body: JSON.stringify({ _subject: subject, ...fields }),
    });
    return res.ok;
  }
  const res = await fetch(`https://formsubmit.co/ajax/${site.email}`, {
    method: "POST",
    headers: { Accept: "application/json", "Content-Type": "application/json" },
    body: JSON.stringify({ _subject: subject, _template: "table", _replyto: fields.email, ...fields }),
  });
  if (!res.ok) return false;
  const out = await res.json().catch(() => ({}));
  return String(out.success) === "true";
}
