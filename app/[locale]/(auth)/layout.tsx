import AuthMenu from "@/components/auth-menu";
interface AuthLayoutProps {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}
export default async function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <>
      <main className="flex flex-col min-h-screen min-w-screen items-center justify-center ">
        <div className="p-4">
          <div className="flex flex-col gap-8">
            {children}
            <div className="w-full flex justify-center">
              <AuthMenu />
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
