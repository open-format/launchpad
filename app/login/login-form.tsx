"use client";

import { Button } from "@/components/ui/button";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { fundAccount } from "../_actions";

export const LoginForm = () => {
  const { ready, authenticated } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser) {
        await fundAccount(user.wallet?.address);
      }
      if (user) {
        router.push("/home/apps");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  return (
    <div>
      <Button disabled={disableLogin} onClick={login}>
        Get Started
      </Button>
    </div>
  );
};
