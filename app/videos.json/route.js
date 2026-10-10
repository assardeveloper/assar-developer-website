import { getVideos } from "@/lib/youtube";

export const dynamic = "force-static";

// Latest videos as JSON, used by the admin to link source code to each video.
export async function GET() {
  return Response.json(await getVideos());
}
