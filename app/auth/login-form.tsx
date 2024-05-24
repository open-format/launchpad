"use client";

import {
  useLogin,
  useModalStatus,
  usePrivy,
} from "@privy-io/react-auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { fundAccount } from "../_actions";

export const LoginForm = () => {
  const { ready, authenticated } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);
  const { isOpen } = useModalStatus();

  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser) => {
      if (isNewUser && user?.wallet?.address) {
        await fundAccount(user.wallet.address);
      }
      if (user) {
        router.push("/home/overview");
      }
    },
    onError: (error) => {
      console.log(error);
    },
  });

  useEffect(() => {
    if (!disableLogin) {
      login();
    }
  }, [disableLogin, isOpen]);

  return (
    <div className="flex items-center justify-center h-full">
      <ReloadIcon className="mr-2 h-12 w-12 animate-spin" />
    </div>
  );
};
