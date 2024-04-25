import { createPublicClient, createWalletClient, http } from "viem";
import { privateKeyToAccount } from "viem/accounts";
import { arbitrumSepolia } from "viem/chains";

export const publicClient = createPublicClient({
  chain: arbitrumSepolia,
  transport: http(),
});

export function getAccountClient(privateKey: string) {
  const account = privateKeyToAccount(privateKey as `0x${string}`);
  const accountClient = createWalletClient({
    account,
    chain: arbitrumSepolia,
    transport: http(),
  });

  return { account, accountClient };
}
