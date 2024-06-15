import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import clsx from "clsx";

import Sidebar from "~/components/sidebar";
import { SignIn } from "~/components/signin";

import "./globals.css";
import QueryProvider from "~/components/providers/tanstack_query";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Fantasy Discgolf | Build your dream-team",
  description: "Build your team of discgolfers each event and compete against your friends",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <QueryProvider>
      <html lang="sv">
        <body className={clsx(inter.className, 'bg-zinc-100')}>
          <header className="bg-zinc-100 h-16">
            <div className="flex container mx-auto px-4 h-full items-center">
              <nav>
                <ul>
                  <li><Link className="font-semibold text-xl" href="/">Fantasy Discgolf</Link></li>
                </ul>
              </nav>
              <div className="ml-auto">
                <SignIn />
              </div>
            </div>
          </header>
          <div className="flex container mx-auto px-4 space-x-12 my-12 min-h-[calc(100vh-4rem)]">
            <aside className="bg-white p-4 rounded shadow-sm min-h-full">
              <Sidebar />
            </aside>
            <main className="flex-1">
              {children}
            </main>
          </div>
          </body>
      </html>
    </QueryProvider>
  );
}
