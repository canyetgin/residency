import AuthMenu from "@/components/auth-menu";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <nav>
        <AuthMenu></AuthMenu>
      </nav>
      <main>
        <div className="flex flex-col items-center justify-center h-screen">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </>
  );
}
