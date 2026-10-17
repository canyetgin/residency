import LoginAnimation from "@/components/animations/login";
import { Card } from "@/components/ui/card";
import { LoginCard } from "@/components/auth/login-card";
import { Suspense } from "react";
import { LoaderIcon } from "lucide-react";
import Link from "next/link";

export default async function Login({
  searchParams,
}: {
  searchParams: Promise<{ next?: string }>;
}) {
  return (
    <Card className="w-full max-w-sm">
      <LoginAnimation />
      <Suspense
        //TO DO: Please do spinner fallback
        fallback={
          <div className="w-full h-full flex items-center justify-center min-h-[765.83px]">
            <LoaderIcon />
          </div>
        }
      >
        <LoginCard searchParams={searchParams} />
        <Link href={"/a.png"}>not exist (not instant hatası)</Link>
      </Suspense>
    </Card>
  );
}
