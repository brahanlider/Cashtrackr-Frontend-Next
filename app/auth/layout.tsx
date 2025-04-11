import Logo from "@/components/ui/Logo";
import ToasNotification from "@/components/ui/ToasNotification";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <main className="grid md:grid-cols-2 md:min-h-screen">
        <div className="bg-30  bg-secondary md:bg-grafico bg-no-repeat bg-left-bottom">
          <div className="md:p-20 flex justify-center">
            <Logo />
          </div>
        </div>

        <section className="lg:p-20 px-5 my-auto p-5 flex items-center justify-center">
          <div className="mx-auto container">{children}</div>
        </section>
      </main>

      <ToasNotification />
    </>
  );
}
