"use client";
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import loginAnimation from '@/public/animations/Login.lottie';

export default function LoginAnimation() {
  return (
    <DotLottieReact
      src={loginAnimation}
      loop
      autoplay
    />
  );
};
