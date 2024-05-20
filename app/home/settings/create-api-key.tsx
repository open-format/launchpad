"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { generateChallenge, verifyChallenge } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Form } from "@/components/ui/form";
import ValueBox from "@/components/value-box";
import { getErrorMessage } from "@/lib/errors";
import { useAccountStore } from "@/stores";
import { usePrivy } from "@privy-io/react-auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signMessage as signMessageWallet } from "@wagmi/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useAccount, useConfig } from "wagmi";

const FormSchema = z.object({
  password: z.any(),
});

export function CreateAPIKey() {
  const [apiKey, setAPIKey] = useState<string | null>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const { address } = useAccount();
  const { signMessage, user } = usePrivy();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { setEncryptedAccountKey } = useAccountStore();

  const {
    setError,
    formState: { isSubmitting },
  } = form;
  const config = useConfig();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const challenge = await generateChallenge(address);

      const uiConfig = {
        title: "Generate API Key",
        description:
          "Confirm you want to create an new API Key associated with your web3 account.",
        buttonText: "Create API Key",
      };

      let signed;

      if (user?.wallet?.walletClientType === "privy") {
        signed = await signMessage(challenge.challenge, uiConfig);
      } else {
        console.log("here", address);
        signed = await signMessageWallet(config, {
          message: challenge.challenge,
        });
      }

      await verifyChallenge(address, signed).then((data) => {
        setAPIKey(data);
        setIsOpen(true);
      });
    } catch (e: any) {
      console.log({ e });
      if (e.message.includes("password")) {
        setError("password", {
          type: "custom",
          message: e.message,
        });
      } else {
        toast.error(getErrorMessage(e.message));
      }
    }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setAPIKey(null);
    }
  }, [isOpen]);

  return (
    <>
      <Form {...form}>
        <form
          className="w-full space-y-4"
          onSubmit={form.handleSubmit(handleFormSubmission)}
        >
          {isSubmitting ? (
            <Button disabled>
              <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
              Creating API Key...
            </Button>
          ) : (
            <Button type="submit">Create API Key</Button>
          )}
        </form>
      </Form>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your API Key</DialogTitle>
            <DialogDescription>
              Use this key to interact with the OPENFORMAT API. You
              will only see this key once.
            </DialogDescription>
          </DialogHeader>
          <div>
            <ValueBox
              value={apiKey}
              copyText="API Key copied to clipboard."
            />
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
