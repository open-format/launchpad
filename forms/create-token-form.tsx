"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getErrorMessage } from "@/lib/errors";
import { ReloadIcon } from "@radix-ui/react-icons";

import { tokenFactoryAbi } from "@/abis/ERC20FactoryFacet";
import { writeContract } from "@wagmi/core";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";
import { parseEther, stringToHex } from "viem";
import { useConfig } from "wagmi";

const FormSchema = z.object({
  name: z.string().min(3).max(32),
  symbol: z.string().min(3).max(5),
  supply: z.coerce.number().min(0).max(100000000000000),
});

interface CreateTokenFormProps {
  closeDialog: () => void;
  trackEvent: TrackEventFunction;
}

export function CreateTokenForm({
  closeDialog,
}: CreateTokenFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const config = useConfig();
  const router = useRouter();
  const params = useParams();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      await writeContract(config, {
        address: params.id as `0x${string}`,
        abi: tokenFactoryAbi,
        functionName: "createERC20",
        args: [
          data.name,
          data.symbol,
          18,
          parseEther(data.supply.toString()),
          stringToHex("Base", { size: 32 }),
        ],
      }).then(() => setTimeout(() => router.refresh(), 1000));

      toast.success("Token successfully created!", {
        description:
          "Copy the token ID to start using it in your application.",
        duration: 10000,
        dismissible: true,
      });

      form.reset();
      closeDialog();
    } catch (e: any) {
      toast.error(getErrorMessage(e.message));
    }
  }

  return (
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
              <p className="text-destructive text-sm">
                Name is immutable and cannot be changed.
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="symbol"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Symbol</FormLabel>
              <FormControl>
                <Input placeholder="USDC" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-destructive text-sm">
                Symbol is immutable and cannot be changed.
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="supply"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Supply</FormLabel>
              <FormControl>
                <Input type="number" placeholder="1000" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {form.formState.isSubmitting ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Creating Token...
          </Button>
        ) : (
          <Button type="submit">Create Token</Button>
        )}
      </form>
    </Form>
  );
}
