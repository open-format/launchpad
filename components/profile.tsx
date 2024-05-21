"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { usePrivy } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";

export default function Profile() {
  const { setTheme, theme } = useTheme();
  const { ready, logout, user } = usePrivy();

  if (!ready) {
    return <p>Loading...</p>;
  }

  function toggleTheme() {
    if (theme === "dark") {
      setTheme("light");
    } else {
      setTheme("dark");
    }
  }

  useEffect(() => {
    console.log({ user });
  }, [user]);
  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-2 m-3 justify-center">
          <Avatar>
            <AvatarImage src={user?.github?.username} />
            <AvatarFallback className="font-bold">AK</AvatarFallback>
          </Avatar>
          <p className="font-bold truncate">
            {user?.github?.username}
          </p>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/home/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleTheme}>
          Toggle Theme
        </DropdownMenuItem>

        <DropdownMenuItem onClick={logout}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
