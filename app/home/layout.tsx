"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Book,
  Cog,
  Home,
  LineChart,
  Menu,
  Package,
  Package2,
  ShoppingCart,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import { URLS } from "@/lib/constants";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import { useTheme } from "next-themes";
import Image from "next/image";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { setTheme, theme } = useTheme();

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }
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
              <span className="">OPENFORMAT</span>
            </Link>
          </div>
          <div className="justify-between flex flex-col h-screen">
            <nav className="grid items-start px-2 text-sm font-medium lg:px-4 my-12 space-y-2 ">
              <Link
                href="/home/apps"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Home className="h-4 w-4" />
                dApps
              </Link>
              <Link
                href="/home/settings"
                className="flex items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:text-primary"
              >
                <Cog className="h-4 w-4" />
                Settings
              </Link>
            </nav>
            <DropdownMenu>
              <DropdownMenuTrigger>
                <div className="flex items-center space-x-2 m-3 justify-center">
                  <Avatar>
                    <AvatarImage src="https://avatars.githubusercontent.com/u/7047410?v=4" />
                    <AvatarFallback>AK</AvatarFallback>
                  </Avatar>
                  <p className="font-bold truncate">
                    andy@openformat.tech
                  </p>
                </div>
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuLabel>My Account</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={toggleTheme}>
                  Toggle Theme
                </DropdownMenuItem>

                <DropdownMenuItem>Logout</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
      <div className="flex flex-col max-h-screen">
        <header className="flex h-14 items-center gap-2 border-b px-4 lg:h-[60px] lg:px-6 justify-end">
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
                  href="#"
                  className="flex items-center gap-2 text-lg font-semibold"
                >
                  <Package2 className="h-6 w-6" />
                  <span className="sr-only">OPENFORMAT</span>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Home className="h-5 w-5" />
                  Apps
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl bg-muted px-3 py-2 text-foreground hover:text-foreground"
                >
                  <ShoppingCart className="h-5 w-5" />
                  Orders
                  <Badge className="ml-auto flex h-6 w-6 shrink-0 items-center justify-center rounded-full">
                    6
                  </Badge>
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Package className="h-5 w-5" />
                  Products
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <Users className="h-5 w-5" />
                  Customers
                </Link>
                <Link
                  href="#"
                  className="mx-[-0.65rem] flex items-center gap-4 rounded-xl px-3 py-2 text-muted-foreground hover:text-foreground"
                >
                  <LineChart className="h-5 w-5" />
                  Analytics
                </Link>
              </nav>
            </SheetContent>
          </Sheet>
        </header>
        <main className="container overflow-scroll py-12">
          {children}
        </main>
      </div>
    </div>
  );
}
