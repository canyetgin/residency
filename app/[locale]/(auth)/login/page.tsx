"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authClient } from "@/lib/auth-client"; // Better Auth istemci SDK yolu

import LoginAnimation from "@/components/animations/login";
import { Button } from "@/components/ui/button";
import GoogleSocialIcon from "@/public/socials/google-icon.svg";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { useRouter } from "@/i18n/navigation";
import { useLocalGreeting } from "@/hooks/use-local-greeting";
import { useTranslations } from "next-intl";
import {
  Field,
  FieldGroup,
  FieldLabel,
  FieldError,
} from "@/components/ui/field";
import { toast } from "@/components/ui/toast";

export default function CardDemo() {
  const router = useRouter();
  const greeting = useLocalGreeting();
  const tSignIn = useTranslations("auth.signIn");
  const tInput = useTranslations("general.input");

  const loginSchema = z.object({
    email: z.email({
      message: tInput("emailInvalid") || "Geçersiz email adresi",
    }),

    password: z
      .string()
      .min(1, {
        message: tInput("passwordRequired") || "Şifre girmeniz zorunludur",
      })
      .min(6, {
        message: tInput("passwordMin") || "Şifre en az 6 karakter olmalıdır",
      }),
  });

  type LoginFormData = z.infer<typeof loginSchema>;

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  const onSubmit = async (values: LoginFormData) => {
    const { data, error: authError } = await authClient.signIn.email({
      email: values.email,
      password: values.password,
      //rn we only redirect, later we will implement OTP
      callbackURL: "/dashboard",
    });

    if (authError) {
      toast.add({
        type: "error",
        description: tSignIn("serverError"),
        priority: "high",
      });
    } else {
      router.push("/dashboard");
    }
  };

  //google OAuth
  const handleGoogleLogin = async () => {
    await authClient.signIn.social({
      provider: "google",
      callbackURL: "/dashboard",
    });
  };

  return (
    <Card className="w-full max-w-sm">
      <LoginAnimation />

      <CardHeader>
        <CardTitle className="flex items-center">
          {tSignIn("title")}, {greeting}
        </CardTitle>
        <CardDescription>{tSignIn("desc")}</CardDescription>
      </CardHeader>

      <CardContent>
        <form id="login-form" onSubmit={handleSubmit(onSubmit)}>
          <FieldGroup className="flex flex-col gap-4">
            <Field data-invalid={errors.email && true} className="gap-2">
              <FieldLabel htmlFor="email">{tInput("email")}</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                disabled={isSubmitting}
                aria-invalid={errors.email && true}
                {...register("email")}
              />
              {errors.email && <FieldError>{errors.email.message}</FieldError>}
            </Field>
            <FieldGroup className="!gap-1">
              <Field data-invalid={errors.password && true} className="gap-2">
                <FieldLabel htmlFor="password">{tInput("password")}</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  aria-invalid={errors.password && true}
                  disabled={isSubmitting}
                  {...register("password")}
                />
                {errors.password && (
                  <FieldError>{errors.password.message}</FieldError>
                )}
              </Field>

              <Button
                type="button"
                variant="link"
                size="xs"
                className="text-xs underline-offset-4 hover:underline p-0 m-0 justify-end"
              >
                {tSignIn("passForgot")}
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
          {isSubmitting ? "..." : tSignIn("action")}
        </Button>

        <Marker variant="separator" className="my-2">
          <MarkerContent>{tSignIn("markerDesc")}</MarkerContent>
        </Marker>

        <Button
          type="button"
          variant="outline"
          className="w-full"
          onClick={handleGoogleLogin}
          disabled={isSubmitting}
        >
          <GoogleSocialIcon />
          {tSignIn("socialLogin.google")}
        </Button>

        <div className="flex flex-row gap-0.25 mt-4 text-sm text-gray-600">
          {tSignIn("registerCTA")}
          <Button
            type="button"
            variant="link"
            className="w-fit p-0 m-0 ml-0.5 h-fit text-sm font-semibold"
            onClick={() => router.push("/register")}
            disabled={isSubmitting}
          >
            {tSignIn("registerAction")}
          </Button>
        </div>
        <Button onClick={toast.add}></Button>
      </CardFooter>
    </Card>
  );
}
