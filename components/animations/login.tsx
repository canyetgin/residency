'use client';
import WelcomeBackAnimation from '@/public/animations/welcome.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function WelcomeBack() {
  return (
    <div className="h-[210px]">
      <DotLottieReact
        renderConfig={{ autoResize: true }}
        layout={{ fit: 'cover' }}
        src={WelcomeBackAnimation}
        autoplay
      />
    </div>
  );
}
