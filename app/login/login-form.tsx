"use client";

import { Button } from "@/components/ui/button";
import useSupabaseClient from "@/lib/supabase/client";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import googleIcon from "../images/icons/google.svg";

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

  const loginWithGoogle = () => {
    setIsLoading(true);
    supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <div>
      <div className="space-y-2">
        <Button disabled={isLoading} onClick={loginWithGitHub}>
          {isLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
          )}
          Continue With Github
        </Button>
        <Button disabled={isLoading} onClick={loginWithGoogle}>
          {isLoading ? (
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
          ) : (
            <Image
              src={googleIcon}
              alt="google icon"
              width={16}
              height={16}
              className="mr-2 h-4 w-4"
            />
          )}
          Continue With Google
        </Button>
      </div>
      <div className="my-8 self-center text-sm text-center">
        <span className="text-foreground-light">
          Don't have an account?
        </span>{" "}
        <Link
          className="underline text-foreground hover:text-foreground-light transition"
          href="/register"
        >
          Sign Up Now
        </Link>
      </div>
    </div>
  );
};
