"use client";

import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import useSupabaseClient from "@/lib/supabase/client";
import { GitHubLogoIcon, ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [emailSignUpValue, setEmailSignUpValue] =
    useState<boolean>(false);

  const supabase = useSupabaseClient();

  function loginWithGitHub() {
    setIsLoading(true);
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback?signUp=${emailSignUpValue}`,
      },
    });
  }

  return (
    <div>
      <div className="flex space-x-2">
        <Checkbox
          checked={emailSignUpValue}
          onCheckedChange={() => setEmailSignUpValue((s) => !s)}
        />
        <label
          htmlFor="terms"
          className="text-sm font-medium leading-none"
        >
          Sign up to product updates
        </label>
      </div>
      <Button disabled={isLoading} onClick={loginWithGitHub}>
        {isLoading ? (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        ) : (
          <GitHubLogoIcon className="mr-2 h-4 w-4" />
        )}
        Continue With Github
      </Button>
      <div className="my-8 self-center text-sm text-center">
        <span className="text-foreground-light">
          Already have an account?
        </span>{" "}
        <Link
          className="underline text-foreground hover:text-foreground-light transition"
          href="/login"
        >
          Sign In Now
        </Link>
      </div>
    </div>
  );
};
