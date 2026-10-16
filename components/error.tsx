"use client";

import { useTranslations } from "next-intl";
import { BackButton } from "@/components/back-button";
import ErrorAnimation from "@/public/animations/error.lottie";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";

interface DashboardErrorProps {
  error: Error & {
    digest?: string;
  };
  reset: () => void;
}

export default function DashboardError({ error, reset }: DashboardErrorProps) {
  const t = useTranslations("general.error");

  return (
    <div className="flex h-full min-h-[400px] w-full flex-col items-center justify-center gap-2">
      <div className="h-[210px]">
        <DotLottieReact
          renderConfig={{ autoResize: true }}
          layout={{ fit: "contain" }}
          //src={ErrorAnimation}
          autoplay
        />
      </div>

      <p className="mb-4">{t("description")}</p>

      <div className="flex items-center gap-3">
        <BackButton />

        <button type="button" onClick={reset}>
          {t("retry")}
        </button>
      </div>

      {error.digest && (
        <p className="mt-4 text-xs ">
          {t("reference")} {error.digest}
        </p>
      )}
    </div>
  );
}
