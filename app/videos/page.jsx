import { site } from "@/site.config";
import { getVideos } from "@/lib/youtube";
import VideoGrid from "../components/VideoGrid";
import PageHero from "../components/PageHero";

export const metadata = {
  title: "Flutter UI Videos",
  description: "Quick Flutter UI builds: login pages, sign up screens, profile UIs and more.",
};

export default async function Videos() {
  const videos = await getVideos();
  return (
    <>
      <PageHero label="Videos" title={<>Flutter UI, <em>in seconds.</em></>} intro="Short builds: login pages, sign-up screens, profile UIs and more.">
        <a href={`${site.social.youtube}?sub_confirmation=1`} target="_blank" rel="noopener noreferrer" className="btn rise" style={{ "--d": "180ms" }}>
          Subscribe on YouTube
        </a>
      </PageHero>
      <section className="section">
        <div className="container">
          {videos.length > 0 ? (
            <VideoGrid videos={videos} />
          ) : (
            <p className="muted">Watch my latest videos on <a href={site.social.youtube}>YouTube</a>.</p>
          )}
        </div>
      </section>
    </>
  );
}
