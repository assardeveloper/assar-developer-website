// Where a "Buy" button goes: the payment link if you set one,
// otherwise WhatsApp (if set) or email with the order pre-written.
export function orderLink(item, site, extra = "") {
  if (item.buyUrl) return item.buyUrl;
  const text = `Hi Assar, I want to order: ${item.name} (${item.price}).${extra ? `\n${extra}` : ""}`;
  if (site.whatsapp) return `https://wa.me/${site.whatsapp}?text=${encodeURIComponent(text)}`;
  return `mailto:${site.email}?subject=${encodeURIComponent(`Order: ${item.name}`)}&body=${encodeURIComponent(text)}`;
}
