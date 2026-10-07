"use client";
import { DotLottieReact } from "@lottiefiles/dotlottie-react";
import loginAnimation from "@/public/animations/Login.lottie";

export default function LoginAnimation() {
  return (
    <DotLottieReact
    
      renderConfig={{ autoResize: true }}
      src={loginAnimation}
      loop
      autoplay
    />
  );
}
