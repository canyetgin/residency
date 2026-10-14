"use client";

import { Button } from "@/components/ui/button";
import { useRouter } from "@/i18n/navigation";

export function BackButton() {
  const router = useRouter();

  const handleBack = () => {
    if ("navigation" in window) {
      const { currentEntry } = window.navigation;
      const previousEntry =
        window.navigation.entries()[(currentEntry?.index ?? 0) - 1];

      if (previousEntry) {
        router.back();
        return;
      }
    }

    router.replace("/");
  };

  return (
    <Button variant="secondary" onClick={handleBack}>
      Geri Dön
    </Button>
  );
}
