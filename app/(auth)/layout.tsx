import AuthMenu from "@/components/auth-menu";

export default function AuthLayout({ children }: LayoutProps<"/">) {
  return (
    <>
      <main className="flex flex-col h-screen w-screen items-center justify-center ">
        <div className="">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </main>
    </>
  );
}
