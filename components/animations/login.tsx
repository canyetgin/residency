"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import WelcomeBackAnimation from "@/public/animations/welcome.lottie";

export default function WelcomeBack() {
  return (
    <div className="h-[210px]">
      <DotLottieReact
        renderConfig={{ autoResize: true }}
        layout={{ fit: "cover" }}
        src={WelcomeBackAnimation}
        autoplay
      />
    </div>
  );
}
