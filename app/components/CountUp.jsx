"use client";

import { useEffect, useRef, useState } from "react";

// Animates the number inside a value like "30+", "1M+" or "6+" when it scrolls into view.
export default function CountUp({ value }) {
  const match = String(value).match(/^([^\d]*)([\d.]+)(.*)$/);
  const [shown, setShown] = useState(value);
  const ref = useRef(null);

  useEffect(() => {
    if (!match || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const [, pre, num, post] = match;
    const target = parseFloat(num);
    const decimals = num.includes(".") ? num.split(".")[1].length : 0;
    setShown(`${pre}0${post}`);
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (t) => {
        const p = Math.min((t - start) / 1400, 1);
        const eased = 1 - Math.pow(1 - p, 3);
        setShown(`${pre}${(target * eased).toFixed(decimals)}${post}`);
        if (p < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
    io.observe(ref.current);
    return () => io.disconnect();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return <strong ref={ref}>{shown}</strong>;
}
