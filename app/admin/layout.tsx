import AdminMenu from "@/components/admin/AdminMenu";
import Logo from "@/components/ui/Logo";
import ToasNotification from "@/components/ui/ToasNotification";
import { verifySession } from "@/src/auth/dal";
import Link from "next/link";
import React from "react";

export default async function LayoutAdmin({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = await verifySession();

  return (
    <>
      <header className="  bg-secondary p-5 ">
        <div className="max-w-5xl  mx-auto flex flex-col lg:flex-row justify-between items-center">
          <div className="sm:w-96">
            <Link href={"/admin"}>
              <Logo />
            </Link>
          </div>

          <AdminMenu user={user} />
        </div>
      </header>

      <section className=" max-w-5xl mx-auto p-5">{children}</section>
      <ToasNotification />

      <footer className="py-5">
        <p className="text-center">
          Todos los Derechos Reservados {new Date().getFullYear()} - Brahan
          Tunquipa
        </p>
      </footer>
    </>
  );
}
