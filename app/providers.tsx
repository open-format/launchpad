"use client";

import { PrivyProvider as Privy } from "@privy-io/react-auth";
import { useTheme } from "next-themes";
import { arbitrumSepolia } from "viem/chains";

export default function PrivyProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { theme } = useTheme();
  return (
    <Privy
      appId={process.env.NEXT_PUBLIC_PRIVY_APP_ID!}
      config={{
        // Customize Privy's appearance in your app
        appearance: {
          //@ts-ignore
          theme: theme,
          accentColor: theme === "light" ? "#000" : "#FFF",
          logo: "https://avatars.githubusercontent.com/u/121942809?s=200&v=4",
        },
        defaultChain: arbitrumSepolia,
        // Create embedded wallets for users who don't have a wallet
        embeddedWallets: {
          createOnLogin: "users-without-wallets",
        },
      }}
    >
      {children}
    </Privy>
  );
}
