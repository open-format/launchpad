"use client";

import { Button } from "@/components/ui/button";
import useSupabaseClient from "@/lib/supabase/client";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = useSupabaseClient();

  function loginWithGitHub() {
    setIsLoading(true);
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <div className="py-4">
      <Button disabled={isLoading} onClick={loginWithGitHub}>
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}
        Continue With Github
      </Button>
    </div>
  );
};
