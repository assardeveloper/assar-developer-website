import "./globals.css";
import { site } from "@/site.config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Effects from "./components/Effects";
import FloatingCta from "./components/FloatingCta";

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Hire a Flutter Developer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  openGraph: {
    title: `${site.name} — Hire a Flutter Developer`,
    description: site.description,
    url: site.url,
    siteName: site.name,
    type: "website",
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <Effects />
        <Header />
        <main>{children}</main>
        <Footer />
        <FloatingCta />
      </body>
    </html>
  );
}
