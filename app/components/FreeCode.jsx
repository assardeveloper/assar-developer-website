import { getRepos } from "@/lib/github";
import FreeCodeList from "./FreeCodeList";

export default async function FreeCode() {
  return <FreeCodeList initial={(await getRepos()) ?? []} />;
}
