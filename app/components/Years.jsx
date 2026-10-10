"use client";

import { useContent } from "@/lib/content";

export default function Years() {
  return useContent().site.yearsExperience;
}
