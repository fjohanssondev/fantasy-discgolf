import type { Metadata } from "next";
import Link from "next/link";
import { Inter } from "next/font/google";
import clsx from "clsx";

import { SignIn } from "~/components/signin";

import "./globals.css";
import QueryProvider from "~/components/providers/tanstack_query";
import { Toaster } from "~/components/ui/sonner";
import { getTeamByUser } from "~/lib/utils";
import { auth } from "~/auth";

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
  const session = await auth()
  const my_team = await getTeamByUser(session?.user?.id as string)

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
          <section className="flex container mx-auto px-4 space-x-12 my-12">
            <nav>
              <ul className="flex gap-2">
                <li>
                  <Link className="bg-primary text-sm text-white px-4 py-2" href="/">Dashboard</Link>
                </li>
                <li>
                  <Link className="bg-primary text-sm text-white px-4 py-2" href={my_team ? `/team/${my_team.id}` : '/team/create'}>My Team</Link>
                </li>
                <li>
                  <Link className="bg-primary text-sm text-white px-4 py-2" href="/league">Leagues</Link>
                </li>
                <li>
                  <Link className="bg-primary text-sm text-white px-4 py-2" href="/schedule">Schedule</Link>
                </li>
                <li>
                  <Link className="bg-primary text-sm text-white px-4 py-2" href="/rules">Rules</Link>
                </li>
              </ul>
            </nav>
          </section>
          <div className="flex container mx-auto px-4 my-12 min-h-[calc(100vh-4rem)]">
            <main className="flex-1">
              {children}
            </main>
          </div>
          <Toaster />
          </body>
      </html>
    </QueryProvider>
  );
}
