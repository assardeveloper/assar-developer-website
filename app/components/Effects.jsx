"use client";

import { useEffect } from "react";
import { usePathname } from "next/navigation";

// Site-wide effects: reveal-on-scroll, card spotlight, scroll progress bar, header shadow.
export default function Effects() {
  const pathname = usePathname();

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const items = () => document.querySelectorAll(".reveal:not(.in)");
    if (reduce || !("IntersectionObserver" in window)) {
      items().forEach((el) => el.classList.add("in"));
      return;
    }
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("in");
            io.unobserve(e.target);
          }
        }),
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    items().forEach((el) => io.observe(el));
    // Content can change after load (live updates from /admin): watch for new elements too.
    const mo = new MutationObserver(() => items().forEach((el) => io.observe(el)));
    mo.observe(document.body, { childList: true, subtree: true });
    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, [pathname]);

  useEffect(() => {
    const bar = document.getElementById("progress");
    const header = document.querySelector(".header");
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (bar) bar.style.transform = `scaleX(${max > 0 ? window.scrollY / max : 0})`;
      header?.classList.toggle("scrolled", window.scrollY > 10);
    };
    const onMove = (e) => {
      const card = e.target.closest?.(".card");
      if (!card) return;
      const r = card.getBoundingClientRect();
      card.style.setProperty("--mx", `${e.clientX - r.left}px`);
      card.style.setProperty("--my", `${e.clientY - r.top}px`);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("pointermove", onMove, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("pointermove", onMove);
    };
  }, []);

  return <div id="progress" aria-hidden="true" />;
}
