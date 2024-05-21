"use client";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { useRouter } from "next/navigation";
import { fundAccount } from "../_actions";

export const LoginForm = () => {
  const { ready, authenticated } = usePrivy();
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
    <div className="flex items-center justify-center">
      <Button
        size="lg"
        className={cn(
          { "opacity-0": disableLogin },
          "bg-[#FFF404] text-black hover:bg-[#FFF863] shadow font-bold text-xl"
        )}
        onClick={login}
      >
        Start Building
      </Button>
    </div>
  );
};
