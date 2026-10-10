import "./globals.css";
import { Geist, Geist_Mono, Instrument_Serif } from "next/font/google";
import { site } from "@/site.config";
import Header from "./components/Header";
import Footer from "./components/Footer";
import Effects from "./components/Effects";
import FloatingCta from "./components/FloatingCta";
import Announcement from "./components/Announcement";
import Analytics from "./components/Analytics";
import { ContentProvider } from "@/lib/content";

const sans = Geist({ subsets: ["latin"], variable: "--font-sans" });
const mono = Geist_Mono({ subsets: ["latin"], variable: "--font-mono" });
const serif = Instrument_Serif({ subsets: ["latin"], weight: "400", style: ["normal", "italic"], variable: "--font-serif" });

// Runs before the page paints so there is no flash of the wrong theme. Dark unless the visitor chose light.
const themeScript = `try{document.documentElement.dataset.theme=localStorage.getItem("theme")||"dark"}catch(e){document.documentElement.dataset.theme="dark"}`;

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
    <html lang="en" className={`${sans.variable} ${mono.variable} ${serif.variable}`} suppressHydrationWarning>
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
