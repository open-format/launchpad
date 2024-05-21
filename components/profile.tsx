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
import WalletAvatar from "./gradient-avatar";

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

  return (
    <DropdownMenu>
      <DropdownMenuTrigger>
        <div className="flex items-center space-x-2 m-3 justify-center">
          <WalletAvatar seed={user?.wallet?.address} size={32} />
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col space-y-2 items-center m-3 justify-center">
          <WalletAvatar seed={user?.wallet?.address} size={32} />
          {user?.github?.name && (
            <p className="font-bold  text-xs truncate max-w-[250px]">
              @{user?.github?.username}
            </p>
          )}
          {user?.email?.address && (
            <p className="font-bold  text-xs truncate max-w-[250]">
              {user?.email.address}
            </p>
          )}
        </div>

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
