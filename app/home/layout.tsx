"use client";

import { Book, Cog, Home, Menu, SettingsIcon } from "lucide-react";
import Link from "next/link";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import { URLS } from "@/lib/constants";
import { usePrivy } from "@privy-io/react-auth";
import { DiscordLogoIcon } from "@radix-ui/react-icons";

import Profile from "@/components/profile";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { ready, authenticated, login, logout, user } = usePrivy();
  const router = useRouter();

  if (!ready) {
    return <p></p>;
  }

  if (ready && !authenticated) {
    router.push("/login");
  }

  if (ready && authenticated) {
    return (
      <div className="grid max-h-screen w-full md:grid-cols-[220px_1fr] lg:grid-cols-[280px_1fr]">
        <div className="hidden border-r md:block h-screen">
          <div className="flex h-full max-h-screen flex-col gap-2">
            <div className="flex h-14 items-center px-4 lg:h-[60px] lg:px-6">
              <Link
                href="/"
                className="flex items-center gap-2 font-semibold"
              >
                <Image
                  className="rounded-md"
                  src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
                  height={25}
                  width={25}
                  alt="hi"
                />
                <span>OPENFORMAT</span>
                <Badge>BETA</Badge>
              </Link>
            </div>
            <div className="justify-between flex flex-col h-screen">
              <nav className="grid items-start px-2 text-sm font-medium lg:px-4 my-12 space-y-2">
                <Link
                  href="/home/apps"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <SettingsIcon className="h-4 w-4" />
                  dApps
                </Link>
                <div
                  aria-disabled
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary opacity-50"
                >
                  <Home className="h-4 w-4" />
                  Missions <Badge>coming soon</Badge>
                </div>
                <Link
                  href="/home/settings"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
                >
                  <SettingsIcon className="h-4 w-4" />
                  Settings
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className="flex flex-col max-h-screen">
          <div className="flex flex-col max-h-screen">
            <header className="flex items-center gap-2 border-b p-4 lg:px-6 justify-end">
              <Link
                href={URLS.docs}
                className={buttonVariants({ variant: "outline" })}
                target="_blank"
                rel="noopener"
              >
                <Book className="mr-2 h-4 w-4" />
                View Docs
              </Link>
              <Link
                href={URLS.discord}
                className={buttonVariants({ variant: "outline" })}
                target="_blank"
                rel="noopener"
              >
                <DiscordLogoIcon className="mr-2 h-5 w-5" />
                Support
              </Link>
              <Profile />
              <Sheet>
                <SheetTrigger asChild>
                  <Button
                    variant="outline"
                    size="icon"
                    className="shrink-0 md:hidden"
                  >
                    <Menu className="h-5 w-5" />
                    <span className="sr-only">
                      Toggle navigation menu
                    </span>
                  </Button>
                </SheetTrigger>
                <SheetContent side="left" className="flex flex-col">
                  <nav className="grid gap-2 text-lg font-medium">
                    <Link
                      href="/home/apps"
                      className="flex items-center gap-2 text-lg font-semibold"
                    >
                      <Image
                        className="rounded-md"
                        src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
                        height={25}
                        width={25}
                        alt="hi"
                      />
                      <span>OPENFORMAT</span>
                      <Badge>BETA</Badge>
                    </Link>
                    <SheetClose asChild>
                      <Link
                        href="/home/apps"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Home className="h-5 w-5" />
                        dApps
                      </Link>
                    </SheetClose>
                    <div
                      aria-disabled
                      className="opacity-50 mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                    >
                      <Home className="h-4 w-4" />
                      Missions <Badge>coming soon</Badge>
                    </div>
                    <SheetClose asChild>
                      <Link
                        href="/home/settings"
                        className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                      >
                        <Cog className="h-5 w-5" />
                        Settings
                      </Link>
                    </SheetClose>
                  </nav>
                </SheetContent>
              </Sheet>
            </header>
            <main className="container overflow-scroll py-12 no-scrollbar">
              {children}
            </main>
          </div>
        </div>
      </div>
    );
  }
}
