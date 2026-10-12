"use client";

import { useContent } from "@/lib/content";
import TikTokVideos from "./TikTokVideos";
import VideoGrid from "./VideoGrid";

// Home page: your TikTok profile + top TikToks when you've added some, otherwise latest YouTube Shorts.
export default function HomeVideos({ youtube, tiktokStats }) {
  const { tiktokVideos = [] } = useContent();
  return (
    <>
      <TikTokVideos stats={tiktokStats} limit={5} />
      {tiktokVideos.length === 0 && youtube.length > 0 && <VideoGrid videos={youtube} />}
    </>
  );
}
