import { site } from "@/site.config";
import { getVideos } from "@/lib/youtube";
import VideoGrid from "../components/VideoGrid";
import SocialLinks from "../components/SocialLinks";

export const metadata = {
  title: "Flutter UI Videos",
  description: "Quick Flutter UI builds: login pages, sign up screens, profile UIs and more.",
};

export default async function Videos() {
  const videos = await getVideos();
  return (
    <>
      <section className="hero hero-small">
        <div className="hero-bg" aria-hidden="true"><span className="blob b1" /><span className="blob b2" /></div>
        <div className="container">
          <p className="eyebrow">Videos</p>
          <h1>
            Flutter UI in <span className="accent">seconds</span>.
          </h1>
          <p className="lead">Short Flutter builds: login pages, sign up screens, profile UIs and more.</p>
          <a href={`${site.social.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer" className="btn">
            Subscribe on YouTube
          </a>
        </div>
      </section>
      <section className="section">
        <div className="container">
          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="muted">
              Watch my latest videos on <a href={site.social.youtube}>YouTube</a>.
            </p>
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
