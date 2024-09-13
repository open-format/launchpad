"use client";

import { erc20BaseAbi } from "@/abis/ERC20Base";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/errors";
import { usePrivy } from "@privy-io/react-auth";
import { writeContract } from "@wagmi/core";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";
import { parseEther } from "viem";
import { useConfig } from "wagmi";

export default function ManageTokenSupply({
  tokenId,
}: {
  tokenId: `0x${string}`;
}) {
  const [mintAmount, setMintAmount] = useState<string>();
  const [burnAmount, setBurnAmount] = useState<string>();
  const config = useConfig();
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const router = useRouter();

  async function mint() {
    if (!mintAmount) {
      toast.error("Please enter a mint amount");
      return;
    }
    try {
      const loading = toast.loading(`Minting ${mintAmount} tokens`, {
        duration: 10000,
        dismissible: true,
      });

      await writeContract(config, {
        address: tokenId,
        abi: erc20BaseAbi,
        functionName: "mintTo",
        args: [address as `0x${string}`, parseEther(mintAmount)],
      }).then(() => setTimeout(() => router.refresh(), 1000));

      toast.dismiss(loading);
      toast.success(`Minted ${mintAmount} tokens!`, {
        duration: 10000,
        dismissible: true,
      });
    } catch (e: any) {
      console.log({ e });
      toast.error(getErrorMessage(e.message));
    }
    setMintAmount("");
  }

  async function burn() {
    if (!burnAmount) {
      toast.error("Please enter a burn amount");
      return;
    }
    try {
      const loading = toast.loading(`Burning ${burnAmount} tokens`, {
        duration: 10000,
        dismissible: true,
      });
      await writeContract(config, {
        address: tokenId,
        abi: erc20BaseAbi,
        functionName: "burn",
        args: [parseEther(burnAmount)],
      }).then(() => setTimeout(() => router.refresh(), 1000));

      toast.dismiss(loading);
      toast.success(`Burned ${burnAmount} tokens!`, {
        duration: 10000,
        dismissible: true,
      });
    } catch (e: any) {
      console.log({ e });
      toast.error(getErrorMessage(e.message));
    }
    setBurnAmount("");
  }

  return (
    <div>
      <h3>Manage Token Supply</h3>
      <div className="space-x-2">
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Mint Amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(e.target.value)}
          />
          <Button onClick={mint}>Mint</Button>
        </div>
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Burn Amount"
            value={burnAmount}
            onChange={(e) => setBurnAmount(e.target.value)}
          />
          <Button onClick={burn}>Burn</Button>
        </div>
      </div>
    </div>
  );
}
