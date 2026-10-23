import { BackButton } from '@/components/back-button';
import NotFoundAnimation from '@/public/animations/404.lottie';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';
import { getTranslations } from 'next-intl/server';

export default async function NotFound() {
  const t = await getTranslations('general.request');
  return (
    <div className="flex flex-col items-center justify-center w-screen min-w-screen h-screen gap-2">
      <div className="h-[210px]">
        <DotLottieReact
          renderConfig={{ autoResize: true }}
          layout={{ fit: 'contain' }}
          src={NotFoundAnimation}
          autoplay
        />
      </div>
      <p className="mb-4">{t('notFound')}</p>
      <BackButton />
    </div>
  );
}
