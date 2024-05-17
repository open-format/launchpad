"use client";

import useSupabaseClient from "@/lib/supabase/client";
import { usePrivy, useWallets } from "@privy-io/react-auth";
import { useState } from "react";

export const LoginForm = () => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const supabase = useSupabaseClient();
  const { wallets } = useWallets();

  const { ready, authenticated, login } = usePrivy();
  // Disable login when Privy is not ready or the user is already authenticated
  const disableLogin = !ready || (ready && authenticated);

  return (
    <div>
      <button disabled={disableLogin} onClick={login}>
        Log in
      </button>
    </div>
  );
};
