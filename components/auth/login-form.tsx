'use client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from '@/i18n/navigation';
import { toast } from 'sonner';
import GoogleSocialIcon from '@/public/socials/google-icon.svg';
import {
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card';
import { FieldGroup, Field, FieldLabel, FieldError } from '@/components/ui/field';
import { Marker, MarkerContent } from '@/components/ui/marker';
import { useTranslations } from 'next-intl';
import { Loader2 } from 'lucide-react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { signInSchema, type signInValues } from '@/schemes/auth.scheme';
import { authClient } from '@/lib/auth-client';
import { signInAction } from '@/features/auth.ts/actions';

type Period = 'night' | 'morning' | 'afternoon' | 'evening';

function getPeriod(): Period {
  const hour = new Date().getHours();
  if (hour < 5) return 'night';
  if (hour < 12) return 'morning';
  if (hour < 17) return 'afternoon';
  return 'evening';
}

export function LoginForm({ next }: { next: string }) {
  const tGreeting = useTranslations('general.greeting');
  const tSignIn = useTranslations('auth.signIn');
  const tInput = useTranslations('general.input');

  const router = useRouter();

  const {
    handleSubmit,
    register,
    formState: { isSubmitting, errors },
  } = useForm<signInValues>({
    resolver: zodResolver(signInSchema),
    defaultValues: { email: '', password: '' },
  });

  async function onSubmit(values: signInValues) {
    const result = await signInAction(values);

    if (!result.success) {
      toast.error('Hata', {
        description: result.error.message,
        position: 'bottom-center',
      });
      return;
    }

    router.replace(next);
    router.refresh();
  }

  return (
    <>
      <CardHeader>
        <CardTitle className="flex items-center">
          {tSignIn('title')}, <span suppressHydrationWarning>{tGreeting(getPeriod())}</span>
        </CardTitle>
        <CardDescription>{tSignIn('desc')}</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)} noValidate>
          <FieldGroup className="flex flex-col gap-4">
            <Field data-invalid={errors.email && true} className="gap-2">
              <FieldLabel htmlFor="email">{tInput('email')}</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                disabled={isSubmitting}
                aria-invalid={errors.email && true}
                {...register('email')}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <FieldGroup className="!gap-1">
              <Field data-invalid={errors.password && true} className="gap-2">
                <FieldLabel htmlFor="password">{tInput('password')}</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={errors.password && true}
                  disabled={isSubmitting}
                  {...register('password')}
                />
                {errors.password && <FieldError>{errors.password.message}</FieldError>}
              </Field>

              <Button
                type="button"
                variant="link"
                size="xs"
                className="text-xs underline-offset-4 hover:underline p-0 m-0 justify-end"
              >
                {tSignIn('passForgot')}
              </Button>
            </FieldGroup>
          </FieldGroup>
        </form>
      </CardContent>

      <CardFooter className="flex-col gap-2">
        <Button
          type="submit"
          form="login-form"
          disabled={isSubmitting}
          className="w-full font-medium"
        >
          {isSubmitting && <Loader2 className="animate-spin" />}
          {tSignIn('action')}
        </Button>

        <Marker variant="separator" className="my-2">
          <MarkerContent>{tSignIn('markerDesc')}</MarkerContent>
        </Marker>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          // onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <GoogleSocialIcon />
          {tSignIn('socialLogin.google')}
        </Button>

        <div className="flex flex-row gap-0.25 mt-4 text-sm text-gray-600">
          {tSignIn('registerCTA')}
          <Button
            type="button"
            variant="link"
            className="w-fit p-0 m-0 ml-0.5 h-fit text-sm font-semibold"
            onClick={() => router.push('/register')}
            disabled={isSubmitting}
          >
            {tSignIn('registerAction')}
          </Button>
        </div>
        <Button
          onClick={() => {
            toast.error('title', {
              position: 'bottom-center',
              description: 'Çok fazla deneme yaptınız. Biraz sonra tekrar deneyin.',
            });
          }}
        ></Button>
      </CardFooter>
    </>
  );
}
