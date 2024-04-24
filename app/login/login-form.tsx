"use client";

import { Button, buttonVariants } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import useSupabaseClient from "@/lib/supabase/client";
import { LoginUserInput, loginUserSchema } from "@/lib/user-schema";
import { cn } from "@/lib/utils";
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";
import { signInWithOtp } from "../_actions";

export const LoginForm = () => {
  const router = useRouter();
  const [error, setError] = useState("");
  const [isPending, startTransition] = useTransition();
  const supabase = useSupabaseClient();

  const form = useForm<LoginUserInput>({
    resolver: zodResolver(loginUserSchema),
  });

  const onSubmitHandler: SubmitHandler<LoginUserInput> = async (
    values
  ) => {
    startTransition(async () => {
      const result = await signInWithOtp(values);

      const { error } = JSON.parse(result);
      if (error?.message) {
        setError(error.message);
        toast.error(error.message);
        console.log("Error message", error.message);
        return;
      }

      setError("");
      toast.success("successfully logged in");
      router.push("/");
    });
  };

  const loginWithGitHub = () => {
    supabase.auth.signInWithOAuth({
      provider: "github",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  };

  return (
    <Form {...form}>
      <a
        onClick={loginWithGitHub}
        className={cn("hover:cursor-pointer", buttonVariants())}
      >
        <GitHubLogoIcon className="mr-2 h-4 w-4" />
        Continue With Github
      </a>
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-strong"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="bg-background px-2 text-sm text-muted-foreground">
            OR
          </span>
        </div>
      </div>
      <form
        className="w-full space-y-2"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <FormField
          control={form.control}
          name="email"
          disabled={true}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Email</FormLabel>
              <FormControl>
                <Input placeholder="Email" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" disabled={true}>
          {isPending ? "loading..." : "Sign In"}
        </Button>
      </form>
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
    </Form>
  );
};
