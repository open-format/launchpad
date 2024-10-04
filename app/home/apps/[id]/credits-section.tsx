"use client";

import { erc20BaseAbi } from "@/abis/ERC20Base";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { getErrorMessage } from "@/lib/errors";
import { useGraphQLQuery } from "@/lib/subgraph";
import { usePrivy } from "@privy-io/react-auth";
import { writeContract } from "@wagmi/core";
import { gql } from "graphql-request";
import { useState } from "react";
import { toast } from "sonner";
import { formatEther, parseEther } from "viem";
import { useConfig } from "wagmi";

const GET_TREASURY_BALANCE = gql`
  query getUserCreditBalance($tokenAddress: String!, $user: String!) {
    fungibleTokenBalances(
      where: { token: $tokenAddress, user: $user }
    ) {
      id
      balance
      token {
        id
        totalSupply
      }
      user {
        id
      }
    }
  }
`;

export default function CreditsSection({
  creditToken,
}: {
  creditToken: FungibleToken;
}) {
  const [mintAmount, setMintAmount] = useState<number | null>();
  const [burnAmount, setBurnAmount] = useState<number | null>();
  const config = useConfig();
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const { data, isLoading, error, refetch } = useGraphQLQuery<{
    fungibleTokenBalances: {
      balance: string;
      token: {
        totalSupply: string;
      };
    }[];
  }>(["getTreasuryBalance"], GET_TREASURY_BALANCE, {
    tokenAddress: creditToken.id,
    user: user?.wallet.address.toLowerCase(),
  });

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  async function mint() {
    if (!mintAmount) {
      toast.error("Please enter an amount");
      return;
    }
    if (mintAmount < 0) {
      toast.error("Amount cannot be negative");
      return;
    }

    try {
      const loading = toast.loading(
        `Increasing credits supply by ${mintAmount}!`,
        {
          duration: 10000,
          dismissible: true,
        }
      );

      await writeContract(config, {
        address: creditToken.id,
        abi: erc20BaseAbi,
        functionName: "mintTo",
        args: [
          address as `0x${string}`,
          parseEther(mintAmount.toString()),
        ],
      }).then(() => setTimeout(() => refetch(), 1000));

      toast.dismiss(loading);
      toast.success(`Increased credits supply by ${mintAmount}!`, {
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
      toast.error("Please enter an amount");
      return;
    }

    if (burnAmount < 0) {
      toast.error("Amount cannot be negative");
      return;
    }

    if (
      data &&
      burnAmount >
        Number(
          formatEther(BigInt(data.fungibleTokenBalances[0].balance))
        )
    ) {
      toast.error(
        "Decrease amount must be less than or equal to the credits held by treasury"
      );
      return;
    }

    try {
      const loading = toast.loading(
        `Decreasing credits supply by ${burnAmount}!`,
        {
          duration: 10000,
          dismissible: true,
        }
      );
      await writeContract(config, {
        address: creditToken.id,
        abi: erc20BaseAbi,
        functionName: "burn",
        args: [parseEther(burnAmount.toString())],
      }).then(() => setTimeout(() => refetch(), 1000));

      toast.dismiss(loading);
      toast.success(`Decreased credits supply by ${burnAmount}!`, {
        duration: 10000,
        dismissible: true,
      });
    } catch (e: any) {
      console.log({ e });
      toast.error(getErrorMessage(e.message));
    }
    setBurnAmount("");
  }

  if (!data) return <div></div>;

  return (
    <div className="flex flex-col space-y-4 w-full lg:flex-row lg:space-x-4 lg:space-y-0 lg:justify-between">
      <div className="flex justify-between lg:space-x-4">
        <div className="flex flex-col space-y-4">
          <span className="text-sm">Credits held by treasury</span>
          <span className="font-bold text-3xl md:text-left">
            {formatEther(
              BigInt(data?.fungibleTokenBalances[0].balance)
            )}
          </span>
          <span>${creditToken.symbol}</span>
        </div>
        <div className="flex flex-col space-y-4">
          <span className="text-sm">Credits held by users</span>
          <span className="font-bold text-3xl md:text-left">
            {formatEther(
              BigInt(
                data?.fungibleTokenBalances[0].token.totalSupply
              ) - BigInt(data?.fungibleTokenBalances[0].balance || 0)
            )}
          </span>
          <span>${creditToken.symbol}</span>
        </div>
        <div className="flex flex-col space-y-4">
          <span className="text-sm text-right md:text-left">
            Total Credits
          </span>
          <span className="font-bold text-3xl text-right md:text-left">
            {formatEther(
              BigInt(data?.fungibleTokenBalances[0].token.totalSupply)
            )}
          </span>
          <span className="text-right md:text-left">
            ${creditToken.symbol}
          </span>
        </div>
      </div>
      <div className="space-y-4 lg:flex lg:space-x-4 lg:space-y-0 lg:justify-between">
        <div className="flex flex-col space-y-2">
          <Label>Increase Supply</Label>
          <Input
            min={0}
            type="number"
            placeholder="Enter amount"
            value={mintAmount}
            onChange={(e) => setMintAmount(Number(e.target.value))}
          />
          <Button variant="outline" onClick={mint}>
            Submit
          </Button>
        </div>
        <div className="flex flex-col space-y-2">
          <Label>Decrease Supply</Label>
          <Input
            min={0}
            type="number"
            placeholder="Enter Amount"
            value={burnAmount}
            onChange={(e) => setBurnAmount(Number(e.target.value))}
          />
          <Button variant="outline" onClick={burn}>
            Submit
          </Button>
        </div>
      </div>
    </div>
  );
}
