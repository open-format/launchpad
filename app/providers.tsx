"use client";

import { PrivyProvider as Privy } from "@privy-io/react-auth";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { useTheme } from "next-themes";
import { arbitrumSepolia } from "viem/chains";

import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import { http } from "wagmi";

const queryClient = new QueryClient();

const config = createConfig({
  chains: [arbitrumSepolia],
  transports: {
    [arbitrumSepolia.id]: http(),
  },
});

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
      <QueryClientProvider client={queryClient}>
        <WagmiProvider config={config}>{children}</WagmiProvider>
      </QueryClientProvider>
    </Privy>
  );
}
