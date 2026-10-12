import { site } from "@/site.config";
import { getVideos } from "@/lib/youtube";
import { getTikTokStats } from "@/lib/tiktok";
import TikTokVideos from "../components/TikTokVideos";
import VideoGrid from "../components/VideoGrid";
import SocialLinks from "../components/SocialLinks";

export const metadata = {
  title: "Flutter UI Videos",
  description: "Quick Flutter UI builds: login pages, sign up screens, profile UIs and more.",
};

export default async function Videos() {
  const videos = await getVideos();
  const tiktokStats = await getTikTokStats(site.tiktokUser || "assardeveloper2");
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container">
          <p className="eyebrow">Videos</p>
          <h1>
            Flutter UI in <span className="accent">seconds</span>.
          </h1>
          <p className="lead">Short Flutter builds watched by 100K+ followers on TikTok: login pages, sign up screens, profile UIs and more.</p>
          <a href={`${site.social.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer" className="btn">
            Subscribe on YouTube
          </a>
        </div>
      </section>
      <section className="section">
        <div className="container">
          <div className="video-subhead"><h3>🔥 Most viewed on TikTok</h3></div>
          <TikTokVideos stats={tiktokStats} />
          {videos.length > 0 && (
            <>
              <div className="video-subhead"><h3>▶️ YouTube Shorts</h3></div>
              <VideoGrid videos={videos} />
            </>
          )}
          <div className="center" style={{ marginTop: 48 }}>
            <p className="muted">Also on</p>
            <SocialLinks />
          </div>
        </div>
      </section>
    </>
  );
}
