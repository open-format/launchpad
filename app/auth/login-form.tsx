"use client";

import { Button } from "@/components/ui/button";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { fundAccount } from "../_actions";

export const LoginForm = () => {
  const { ready, authenticated } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser && user?.wallet?.address) {
        await fundAccount(user.wallet.address);
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
    <div className="flex items-center justify-center">
      <Button
        size="lg"
        disabled={disableLogin}
        className={
          "bg-[#FFF404] text-black hover:bg-[#ffe504] hover:shadow font-bold text-xl"
        }
        onClick={login}
      >
        {disableLogin && (
          <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
        )}
        Continue
      </Button>
    </div>
  );
};
