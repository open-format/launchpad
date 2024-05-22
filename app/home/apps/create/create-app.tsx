"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { useState } from "react";
import { useConfig } from "wagmi";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/lib/errors";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Arbitrum, Polygon } from "@thirdweb-dev/chain-icons";
import { toast } from "sonner";

import { appFactoryAbi } from "@/abis/AppFactory";
import { tokenFactoryAbi } from "@/abis/ERC20FactoryFacet";
import { contractAddresses } from "@/lib/constants";
import { getEventLog } from "@/lib/transactions";
import { usePrivy } from "@privy-io/react-auth";
import {
  waitForTransactionReceipt,
  writeContract,
} from "@wagmi/core";
import { useRouter } from "next/navigation";
import { parseEther, stringToHex } from "viem";

export default function CreateAppDialog({
  trackEvent,
}: {
  trackEvent: TrackEventFunction;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  function toggle() {
    setIsOpen((t) => !t);
  }

  const FormSchema = z.object({
    name: z.string().min(3).max(32),
    chain: z.string(),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const config = useConfig();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const hash = await writeContract(config, {
        address: contractAddresses.APP_FACTORY,
        abi: appFactoryAbi,
        functionName: "create",
        args: [
          stringToHex(data.name, { size: 32 }),
          address as Web3AccountAddress,
        ],
      });

      const transactionReceipt = await waitForTransactionReceipt(
        config,
        {
          hash,
        }
      );

      const appId = await getEventLog(
        transactionReceipt,
        appFactoryAbi,
        "Created"
      );

      if (appId) {
        await writeContract(config, {
          address: appId,
          abi: tokenFactoryAbi,
          functionName: "createERC20",
          args: [
            data.name,
            "XP",
            18,
            parseEther("0"),
            stringToHex("Base", { size: 32 }),
          ],
        });
      }

      toast.success("App successfully created!", {
        description: "You can now create badges for this dApp.",
        action: {
          label: "View Transaction",
          onClick: () =>
            window.open(`https://sepolia.arbiscan.io/tx/${hash}`),
        },
        duration: 5000,
      });

      await trackEvent({
        event_name: "Create dApp",
        event_meta: {
          name: data.name,
          chain: data.chain,
        },
      });

      router.push(`apps/${appId}`);
    } catch (e: any) {
      if (e.metaMessages[0].includes("nameAlreadyUsed")) {
        setError("name", {
          type: "custom",
          message: getErrorMessage(e.metaMessages[0]),
        });
      } else {
        toast.error(getErrorMessage(e.message));
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className={buttonVariants()}>
        Create dApp
      </DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create dApp</DialogTitle>
          <DialogDescription>
            Create a new decentralised app.
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            className="w-full space-y-4"
            onSubmit={form.handleSubmit(handleFormSubmission)}
          >
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel>Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Name" {...field} />
                  </FormControl>
                  <FormMessage />
                  <FormDescription>
                    The name of your blockchain application. Please
                    note, due to the immutable nature of the
                    blockchain this value can not be changed.
                  </FormDescription>
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="chain"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Blockchain</FormLabel>
                  <FormControl>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Select blockchain" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectGroup>
                          <SelectLabel>Testnet</SelectLabel>
                          <SelectItem value="arbitrum-sepolia">
                            <div className="flex items-center space-x-2">
                              <Arbitrum className="h-6 w-6" />
                              <p>Arbitrum Sepolia</p>
                            </div>
                          </SelectItem>
                          <SelectItem value="polygon-amoy" disabled>
                            <div className="flex items-center space-x-2">
                              <Polygon className="h-6 w-6 " />
                              <p>Polygon Amoy</p>
                              <Badge>Coming soon</Badge>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                        <SelectGroup>
                          <SelectLabel>Mainnet</SelectLabel>
                          <SelectItem
                            value="arbitrum-mainnet"
                            disabled
                          >
                            <div className="flex items-center space-x-2">
                              <Arbitrum className="h-6 w-6" />
                              <p>Arbitrum Mainnet</p>
                              <Badge>Coming soon</Badge>
                            </div>
                          </SelectItem>
                          <SelectItem
                            value="polygon-mainnet"
                            disabled
                          >
                            <div className="flex items-center space-x-2">
                              <Polygon className="h-6 w-6" />
                              <p>Polygon Mainnet</p>
                              <Badge>Coming soon</Badge>
                            </div>
                          </SelectItem>
                        </SelectGroup>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormDescription>
                    We currently support only Arbitrum Sepolia. We
                    will be expanding to more chains soon.
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            {isSubmitting ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Creating App...
              </Button>
            ) : (
              <Button type="submit">Create dApp</Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
