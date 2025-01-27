import React from "react";
import Image from "next/image";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

const Layout = async ({ children }: { children: React.ReactNode }) => {
  const session = await auth();
  if (session) redirect("/");
  return (
    <main>
      <div className="flex flex-col h-screen bg-[#09090b] w-screen items-center justify-center">
        <div className="flex justify-center items-center mb-8">
          <span className="text-white font-bold text-2xl">
            Welcome to Ecommerce
          </span>
        </div>
        <div className="flex justify-center items-center">
          <div className="flex flex-col w-full space-y-6 mx-2">
            {children}
          </div>
          <div>
            <Image src="/sign-up.png" alt="logo" width={800} height={800} />
          </div>
        </div>
      </div>
    </main>
  );
};

export default Layout;
