import { site } from "@/site.config";

export const dynamic = "force-static";

export default function robots() {
  return { rules: { userAgent: "*", allow: "/", disallow: "/admin/" }, sitemap: `${site.url}/sitemap.xml` };
}
