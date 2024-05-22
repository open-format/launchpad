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
import { usePrivy } from "@privy-io/react-auth";
import { ReloadIcon } from "@radix-ui/react-icons";
import { signMessage as signMessageWallet } from "@wagmi/core";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { useConfig } from "wagmi";

const FormSchema = z.object({
  password: z.any(),
});

interface CreateAPIKeyProps {
  trackEvent: TrackEventFunction;
}

export function CreateAPIKey({ trackEvent }: CreateAPIKeyProps) {
  const [apiKey, setAPIKey] = useState<string | null>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const { signMessage, user } = usePrivy();
  const address = user?.wallet?.address;

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    setError,
    formState: { isSubmitting },
  } = form;
  const config = useConfig();

  async function handleFormSubmission() {
    try {
      if (!address) {
        throw new Error("Web3 account not found.");
      }
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

      await trackEvent({ event_name: "Create API Key" });
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
              Creating New API Key...
            </Button>
          ) : (
            <Button type="submit">Create New API Key</Button>
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
            {apiKey && (
              <ValueBox
                trackEvent={{
                  fn: trackEvent,
                  event_name: "API Key",
                }}
                label="API Key"
                value={apiKey}
                copyText="API Key copied to clipboard."
              />
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
