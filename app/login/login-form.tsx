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
import { zodResolver } from "@hookform/resolvers/zod";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
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

  const {
    reset,
    handleSubmit,
    register,
    formState: { errors },
  } = form;

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
      <form
        className="w-full space-y-2"
        onSubmit={form.handleSubmit(onSubmitHandler)}
      >
        <FormField
          control={form.control}
          name="email"
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
        <Button type="submit" disabled={isPending}>
          {isPending ? "loading..." : "Sign In"}
        </Button>
        <div>
          <a onClick={loginWithGitHub} className={buttonVariants()}>
            <GitHubLogoIcon className="mr-2 h-4 w-4" />
            Continue With Github
          </a>
        </div>
      </form>
    </Form>
  );
};
