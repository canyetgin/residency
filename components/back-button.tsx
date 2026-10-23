'use client';

import { Button } from '@/components/ui/button';
import { useRouter } from '@/i18n/navigation';
import { useTranslations } from 'next-intl';

export function BackButton() {
  const router = useRouter();
  const t = useTranslations('general');

  const handleBack = () => {
    if ('navigation' in window) {
      const { currentEntry } = window.navigation;
      const previousEntry = window.navigation.entries()[(currentEntry?.index ?? 0) - 1];

      if (previousEntry) {
        router.back();
        return;
      }
    }

    router.replace('/');
  };

  return (
    <Button variant="secondary" aria-label={t('goBack')} onClick={handleBack}>
      {t('goBack')}
    </Button>
  );
}
