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
import { useWallets } from "@privy-io/react-auth";
import { useState } from "react";

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
import UnlockKeyFormField from "@/components/unlock-key-form-field";
import { contractAddresses } from "@/lib/constants";
import { handleTransaction } from "@/lib/transactions";
import { useRouter } from "next/navigation";
import { createWalletClient, custom, stringToHex } from "viem";
import { arbitrumSepolia } from "viem/chains";

export default function CreateAppDialog({
  account,
}: {
  account: any;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const router = useRouter();

  function toggle() {
    setIsOpen((t) => !t);
  }

  const FormSchema = z.object({
    name: z.string().min(3).max(32),
    chain: z.string(),
    password: z
      .string()
      .min(3, "password must contain at least 3 character(s)"),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  const { wallets } = useWallets();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    console.log({ wallets });
    try {
      const wallet = wallets[0]; // Replace this with your desired wallet
      await wallet.switchChain(arbitrumSepolia.id);

      const provider = await wallet.getEthereumProvider();

      const walletClient = createWalletClient({
        chain: arbitrumSepolia,
        transport: custom(provider),
      });

      console.log({ walletClient });

      await handleTransaction(
        walletClient,
        contractAddresses.APP_FACTORY,
        appFactoryAbi,
        "create",
        [stringToHex(data.name, { size: 32 }), wallet.address],
        "Created"
      );

      toast.success("App successfully created!", {
        description: "You can now create badges for this dApp.",
        duration: 5000,
      });
    } catch (e: any) {
      console.log({ e });
      if (e.message.includes("password")) {
        setError("password", {
          type: "custom",
          message: e.message,
        });
      } else if (e.message.includes("nameAlreadyUsed")) {
        setError("name", {
          type: "custom",
          message: getErrorMessage(e.message),
        });
      } else {
        toast.error(getErrorMessage(e.message));
      }
    }
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className={buttonVariants()} disabled={!account}>
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
            <UnlockKeyFormField form={form} />
            {isSubmitting ? (
              <Button disabled>
                <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                Creating App...
              </Button>
            ) : (
              <Button type="submit" disabled={Boolean(!account)}>
                Create dApp
              </Button>
            )}
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
