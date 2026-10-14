import { notFound } from "next/navigation";

export const instant = false;

//Next.js will only render this page when the notFound function is called from within a route, not for all unknown routes in general. so we need to use this method like below.
export default function CatchAllPage() {
  notFound();
}
