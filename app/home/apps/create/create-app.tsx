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
import { useEffect, useState } from "react";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import ValueBox from "@/components/value-box";
import { useAccountStore } from "@/stores";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Arbitrum, Polygon } from "@thirdweb-dev/chain-icons";

export default function CreateAppDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [appID, setAppID] = useState<string | null>();

  function toggle() {
    setIsOpen((t) => !t);
  }

  useEffect(() => {
    if (!isOpen) {
      setAppID(null);
      reset();
    }
  }, [isOpen]);

  const { encryptedAccountKey } = useAccountStore();

  const FormSchema = z.object({
    name: z.string().min(3),
    chain: z.string(),
    password: z
      .string()
      .min(3, "password must contain at least 3 character(s)")
      .optional()
      .refine(
        (data) => {
          return !!encryptedAccountKey || (data && data.length > 0);
        },
        {
          message: "Password is required",
        }
      ),
  });

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    reset,
    formState: { isSubmitting },
  } = form;

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    //@TODO: Call createApp server action here.
    //@TODO: Set returned APP_ID in state.

    function mockApiCall() {
      return new Promise((resolve, reject) => {
        setTimeout(() => {
          resolve("Data fetched successfully");
          setAppID("0xfb2c2196831deeb8311d2cb4b646b94ed5ecf684");
        }, 2000);
      });
    }

    await mockApiCall().then((res) => console.log(res));
    reset();
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className={buttonVariants()}>
        Create App
      </DialogTrigger>
      {appID ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your APP ID</DialogTitle>
            <DialogDescription>
              This is your APP ID. You will need this to interact with
              your on-chain application.
            </DialogDescription>
          </DialogHeader>
          <div>
            <ValueBox
              value={appID}
              copyText="APP ID copied to clipboard."
            />
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create dApp</DialogTitle>
            <DialogDescription>
              Create a new decentralised app.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="w-full space-y-2"
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
                                <Polygon className="h-6 w-6" />
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
                    <FormMessage />
                  </FormItem>
                )}
              />
              {!encryptedAccountKey && (
                <FormField
                  control={form.control}
                  name="password"
                  render={({ field }) => (
                    <FormItem className="flex-1">
                      <FormLabel>Password</FormLabel>
                      <FormControl>
                        <Input
                          placeholder="Password"
                          {...field}
                          type="password"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}

              {isSubmitting ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creating App...
                </Button>
              ) : (
                <Button type="submit">Create App</Button>
              )}
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}
