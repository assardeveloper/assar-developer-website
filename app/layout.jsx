import "./globals.css";
import { site } from "@/site.config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Effects from "./components/Effects";
import FloatingCta from "./components/FloatingCta";
import Announcement from "./components/Announcement";
import Analytics from "./components/Analytics";
import { ContentProvider } from "@/lib/content";

// Runs before the page paints so there is no flash of the wrong theme.
const themeScript = `try{var t=localStorage.getItem("theme");if(!t)t=matchMedia("(prefers-color-scheme: light)").matches?"light":"dark";document.documentElement.dataset.theme=t}catch(e){document.documentElement.dataset.theme="dark"}`;

export const metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — Hire a Flutter Developer`,
    template: `%s | ${site.name}`,
  },
  description: site.description,
  ...(site.googleVerification ? { verification: { google: site.googleVerification } } : {}),
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
    <html lang="en" data-brand={site.brand || "black"} suppressHydrationWarning>
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body>
        <noscript>
          <style>{`.reveal{opacity:1!important;transform:none!important}`}</style>
        </noscript>
        <ContentProvider>
          <Effects />
          <Analytics />
          <Announcement />
          <Header />
          <main>{children}</main>
          <Footer />
          <FloatingCta />
        </ContentProvider>
      </body>
    </html>
  );
}
