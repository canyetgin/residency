"use client"; // TODO: Remove this when u will do the actions. and OTP Verification need to be with Redis
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
import { Label } from "@/components/ui/label";
import { Marker, MarkerContent } from "@/components/ui/marker";
import { useRouter } from "@/i18n/navigation";
import { useLocalGreeting } from "@/hooks/use-local-greeting";
import { useTranslations } from "next-intl";
import { Field, FieldGroup, FieldLabel } from "@/components/ui/field";

export default function CardDemo() {
  const router = useRouter();
  const greeting = useLocalGreeting();
  const tSignIn = useTranslations("auth.signIn");
  const tInput = useTranslations("general.input");

  return (
    <Card className="w-full max-w-sm">
      <LoginAnimation />

      <CardHeader>
        <CardTitle className=" flex items-center">
          {tSignIn("title")}, {greeting}
        </CardTitle>

        <CardDescription>{tSignIn("desc")}</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <FieldGroup className="flex flex-col gap-4">
            <Field className="gap-2">
              <FieldLabel htmlFor="email">{tInput("email")}</FieldLabel>
              <Input
                id="email"
                type="email"
                autoComplete="email"
                placeholder="m@example.com"
                required
              />
            </Field>
            <FieldGroup className="!gap-1">
              <Field className="gap-2">
                <FieldLabel htmlFor="password">{tInput("password")}</FieldLabel>

                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  required
                />
              </Field>
              <Button
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
          onClick={() => {
            router.push("/login/verify");
          }}
          className="w-full"
        >
          {tSignIn("action")}
        </Button>

        <Marker variant="separator" className="my-2">
          <MarkerContent>{tSignIn("markerDesc")}</MarkerContent>
        </Marker>
        <Button variant="outline" className="w-full">
          <GoogleSocialIcon />
          {tSignIn("socialLogin.google")}
        </Button>
        <div className="flex flex-row gap-0.25 mt-4">
          {tSignIn("registerCTA")}
          <Button variant="link" className="w-fit p-0 m-0 ml-0.5 h-fit">
            {tSignIn("registerAction")}
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
