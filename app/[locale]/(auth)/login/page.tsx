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

export default function CardDemo() {
  const router = useRouter();
  const greeting = useLocalGreeting();
  return (
    <Card className="w-full max-w-sm">
      <LoginAnimation />

      <CardHeader>
        <CardTitle className=" flex items-center">
          {greeting}Welcome Back
        </CardTitle>

        <CardDescription> Sign in to your account</CardDescription>
      </CardHeader>
      <CardContent>
        <form>
          <div className="flex flex-col gap-6">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="grid gap-2">
              <Label htmlFor="password">Password</Label>
              <div>
                <Input id="password" type="password" required />
                <Button
                  variant="link"
                  size="xs"
                  className="text-xs underline-offset-4 hover:underline p-0 m-0 justify-start mt-1"
                >
                  Forgot password? / Open Modal
                </Button>
              </div>
            </div>
          </div>
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
          Sign In
        </Button>

        <Marker variant="separator" className="my-2">
          <MarkerContent>or</MarkerContent>
        </Marker>
        <Button variant="outline" className="w-full">
          <GoogleSocialIcon />
          Login with Google
        </Button>
        <div className="flex flex-row gap-0.25 mt-4">
          Dont have an account?
          <Button variant="link" className="w-fit p-0 m-0 h-fit">
            Sign Up
          </Button>
        </div>
      </CardFooter>
    </Card>
  );
}
