import LoginAnimation from "@/components/animations/login";
import { Card } from "@/components/ui/card";
import { LoginCard } from "@/components/auth/login-card";
import { Suspense } from "react";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <Card className="w-full max-w-sm">
      <LoginAnimation />
      <Suspense>
        <LoginCard searchParams={searchParams} />
      </Suspense>
    </Card>
  );
}
