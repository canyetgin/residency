
import LoginAnimation from "@/components/animations/login";
import { Card } from "@/components/ui/card";
import { LoginForm } from "@/components/auth/login-form";
import { safeRedirect } from "@/lib/utils";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  const { next } = await searchParams;

  return (
    <Card className="w-full max-w-sm">
      <LoginAnimation />
      <LoginForm next={safeRedirect(next)} />
    </Card>
  );
}
