"use client";

import {
  Avatar,
  AvatarFallback,
  AvatarImage,
} from "@/components/ui/avatar";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import useSupabaseClient from "@/lib/supabase/client";
import { User } from "@supabase/supabase-js";
import { useTheme } from "next-themes";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Profile({ user }: { user: User }) {
  const { setTheme, theme } = useTheme();
  const supabase = useSupabaseClient();
  const router = useRouter();

  function signOut() {
    supabase.auth.signOut();
    router.push("/login");
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
          <Avatar>
            <AvatarImage src={user.user_metadata["avatar_url"]} />
            <AvatarFallback className="font-bold">
              {user.user_metadata["name"]
                ? user.user_metadata["name"].charAt(0)
                : ""}
            </AvatarFallback>
          </Avatar>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        <div className="flex flex-col space-y-2 items-center m-3 justify-center">
          <Avatar>
            <AvatarImage src={user.user_metadata["avatar_url"]} />
            <AvatarFallback className="font-bold">
              {user.user_metadata["name"]
                ? user.user_metadata["name"].charAt(0)
                : ""}
            </AvatarFallback>
          </Avatar>
          <p className="font-bold truncate text-xs">{user.email}</p>
        </div>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/home/settings">Settings</Link>
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={toggleTheme}>
          Toggle Theme
        </DropdownMenuItem>
        <DropdownMenuSeparator />
        <DropdownMenuItem onClick={signOut}>Logout</DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
