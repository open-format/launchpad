"use client";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { addressSplitter } from "@/lib/utils";
import { usePrivy } from "@privy-io/react-auth";
import { useQueryClient } from "@tanstack/react-query";
import { useTheme } from "next-themes";
import WalletAvatar from "./gradient-avatar";

export default function Profile() {
  const { setTheme, theme } = useTheme();
  const { ready, logout, user } = usePrivy();
  const queryClient = useQueryClient();

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

  function getIdentifier() {
    return user?.github?.username
      ? `@${user?.github?.username}`
      : user?.github?.name ??
          user?.email?.address ??
          addressSplitter(user?.wallet?.address);
  }

  function handleLogout() {
    queryClient.removeQueries();
    logout();
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
          <p className="font-bold  text-xs truncate max-w-[250px]">
            {getIdentifier()}
          </p>
        </div>

        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleTheme}>
          Toggle Theme
        </DropdownMenuItem>

        <DropdownMenuItem onClick={handleLogout}>
          Logout
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
