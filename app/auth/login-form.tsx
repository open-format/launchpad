"use client";

import { Button } from "@/components/ui/button";
import { useLogin, usePrivy } from "@privy-io/react-auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useRouter } from "next/navigation";
import { fundAccount } from "../_actions";

export function LoginForm({
  trackEvent,
}: {
  trackEvent: TrackEventFunction;
}) {
  const { ready, authenticated } = usePrivy();
  const disableLogin = !ready || (ready && authenticated);

  const router = useRouter();

  const { login } = useLogin({
    onComplete: async (user, isNewUser, _, loginMethod) => {
      if (isNewUser && user?.wallet?.address) {
        await trackEvent({
          event_name: "User Signup",
          event_meta: {
            loginMethod: loginMethod!,
          },
        });
        await fundAccount(user.wallet.address);
      } else {
      }
      if (user) {
        router.push("/home/apps");
      }
      await trackEvent({
        event_name: "User Authenticated",
        event_meta: {
          loginMethod: loginMethod!,
        },
      });
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
        Start Building
      </Button>
    </div>
  );
}
