"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import WelcomeBackAnimation from "@/public/animations/welcome.lottie";

export default function WelcomeBack() {
  return (
    <DotLottieReact height={300} src={WelcomeBackAnimation} loop autoplay />
  );
}
