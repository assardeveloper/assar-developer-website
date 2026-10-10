import { site } from "@/site.config";

export const dynamic = "force-static";

export default function sitemap() {
  return ["", "/hire/", "/videos/", "/shop/"].map((path) => ({ url: `${site.url}${path}`, lastModified: new Date() }));
}
