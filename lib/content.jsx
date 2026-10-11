"use client";

import { createContext, useContext, useEffect, useState } from "react";
import raw from "@/content/site.json";
import { buildContent, liveContentUrl } from "@/site.config";

const initial = buildContent(raw);
const ContentContext = createContext(initial);

// Starts with the content baked in at build time, then loads the latest
// content/site.json from GitHub so changes made in /admin show up without a redeploy.
export function ContentProvider({ children }) {
  const [content, setContent] = useState(initial);

  useEffect(() => {
    if (process.env.NODE_ENV === "development") return;
    const minute = Math.floor(Date.now() / 60000);
    fetch(`${liveContentUrl}?v=${minute}`)
      .then((r) => (r.ok ? r.json() : null))
      .then((data) => data?.site && setContent(buildContent(data)))
      .catch(() => {});
  }, []);

  // Apply the brand color chosen in Admin → General (also updates live after a save).
  useEffect(() => {
    document.documentElement.dataset.brand = content.site.brand || "violet";
  }, [content.site.brand]);

  return <ContentContext.Provider value={content}>{children}</ContentContext.Provider>;
}

export const useContent = () => useContext(ContentContext);
