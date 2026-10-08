"use client"; // TODO: Remove this when u will do the actions. and OTP Verification need to be with Redis

import { RefreshCwIcon } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSeparator,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { useRouter } from "@/i18n/navigation";
import { useTranslations } from "next-intl";

export default function InputOTPForm() {
  const router = useRouter();
  const t = useTranslations("auth.otp");

  return (
    <Card className="mx-auto max-w-md">
      <CardHeader>
        <CardTitle>{t("title")}</CardTitle>
        <CardDescription>
          {t("desc")} <span className="font-medium">m@example.com</span>.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Field>
          <div className="flex items-center justify-between">
            <FieldLabel htmlFor="otp-verification">{t("label")}</FieldLabel>
            <Button variant="outline" size="xs">
              <RefreshCwIcon />
              {t("resend")}
            </Button>
          </div>
          <InputOTP
            aria-label={t("label")}
            maxLength={6}
            id="otp-verification"
            autoComplete="one-time-code"
            required
          >
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={0} />
              <InputOTPSlot index={1} />
              <InputOTPSlot index={2} />
            </InputOTPGroup>
            <InputOTPSeparator className="mx-2" />
            <InputOTPGroup className="*:data-[slot=input-otp-slot]:h-12 *:data-[slot=input-otp-slot]:w-11 *:data-[slot=input-otp-slot]:text-xl">
              <InputOTPSlot index={3} />
              <InputOTPSlot index={4} />
              <InputOTPSlot index={5} />
            </InputOTPGroup>
          </InputOTP>
          <FieldDescription>
            <a href="#">{t("notAvaliable")}</a>
          </FieldDescription>
        </Field>
      </CardContent>
      <CardFooter>
        <Field>
          <Button
            type="submit"
            className="w-full"
            onClick={() => {
              router.replace("/dashboard");
            }}
          >
            {t("action")}
          </Button>
          <div className="text-sm text-muted-foreground">
            {t("helpCTA")}{" "}
            <a
              href="#"
              className="underline underline-offset-4 transition-colors hover:text-primary"
            >
              {t("helpAction")}
            </a>
          </div>
        </Field>
      </CardFooter>
    </Card>
  );
}
