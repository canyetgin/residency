import { notFound } from "next/navigation";
import { Suspense } from "react";

function CatchAllTrigger(): never {
  notFound();
}

export default async function CatchAllPage() {
  return (
    <Suspense fallback={null}>
      {/* to not to get prefetch errs we need to wrap with supsense :D */}
      <CatchAllTrigger />
    </Suspense>
  );
}
