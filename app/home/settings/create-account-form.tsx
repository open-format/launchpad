"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createWeb3Account, getAccountAddress } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ValueBox from "@/components/value-box";
import { cn } from "@/lib/utils";
import { useAccountStore } from "@/stores";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  password: z.string().min(3),
});

export function CreateAccountForm() {
  const [keys, setKeys] = useState<KeyState>();
  const [isOpen, setIsOpen] = useState<boolean>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { setEncryptedAccountKey } = useAccountStore();
  const router = useRouter();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const result = await createWeb3Account(data.password);
      setKeys(result);
      setEncryptedAccountKey(result.encryptedAccountKey);
      await getAccountAddress();
    } catch (e) {
      //@TODO Add catch-all error handling
      console.log(e);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      router.refresh();
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Create web3 account</Button>
      </DialogTrigger>
      {keys ? (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Your Account Keys</DialogTitle>
            <DialogDescription>
              Keep these keys safe. You can use them in the API or in
              the SDK. Access to these values is exclusive to you;
              your private key is visible only with your password.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Label>Public Key</Label>
            <ValueBox
              value={keys.address}
              copyText="Public key copied to clipboard."
            />
          </div>
          <div>
            <Label>Private Key</Label>
            <ValueBox
              value={keys.privateKey}
              copyText="Private key copied to clipboard."
            />
          </div>
          <div>
            <Label>Recovery Phrase</Label>
            <Textarea>{keys.recoveryPhrase}</Textarea>
            <p className={cn("text-sm text-destructive")}>
              This recovery phrase is crucial—it's your lifeline for
              account recovery if your password is ever forgotten.
            </p>
          </div>
        </DialogContent>
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Create web3 account</DialogTitle>
            <DialogDescription>
              You'll need a Web3 account to use OPENFORMAT. We can set
              one up for you, but you'll have to secure it yourself.
              OPENFORMAT doesn't store your password, so it can't be
              recovered by us.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(handleFormSubmission)}
            >
              <div>
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
              </div>
              <Button type="submit">Create web3 account</Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}
