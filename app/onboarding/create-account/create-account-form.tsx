"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createWeb3Account } from "@/app/_actions";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Form } from "@/components/ui/form";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import UnlockKeyFormField from "@/components/unlock-key-form-field";
import ValueBox from "@/components/value-box";
import { URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { useAccountStore } from "@/stores";
import Link from "next/link";
import { useState } from "react";

const FormSchema = z.object({
  password: z.string().min(3),
});

export function CreateAccountForm() {
  const [keys, setKeys] = useState<KeyState>();
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { setEncryptedAccountKey } = useAccountStore();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const result = await createWeb3Account(data.password);
      setKeys(result);
      setEncryptedAccountKey(result.encryptedAccountKey);
    } catch (e) {
      //@TODO Add catch-all error handling
      console.log(e);
    }
  }

  return keys ? (
    <div className="flex flex-col items-center justify-center space-y-5">
      <Card>
        <CardHeader>
          <CardTitle>Your Account Keys</CardTitle>
          <CardDescription>
            Keep these keys safe. You can use them in the API or in
            the SDK. Access to these values is exclusive to you; your
            private key is visible only with your password.
          </CardDescription>
        </CardHeader>
        <CardContent>
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
        </CardContent>
        <CardFooter className="flex justify-between">
          <Link
            className={buttonVariants({ variant: "outline" })}
            href={URLS.docs}
            target="_blank"
          >
            View Docs
          </Link>
          <Link className={buttonVariants()} href="/home/apps">
            Continue
          </Link>
        </CardFooter>
      </Card>
    </div>
  ) : (
    <div className="space-y-4">
      <Form {...form}>
        <form
          className="w-full space-y-2"
          onSubmit={form.handleSubmit(handleFormSubmission)}
        >
          <Card>
            <CardHeader>
              <CardTitle>Create web3 account</CardTitle>
              <CardDescription>
                You'll need a Web3 account to use OPENFORMAT. We can
                set one up for you, but you'll have to secure it
                yourself. OPENFORMAT doesn't store your password, so
                it can't be recovered by us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <UnlockKeyFormField form={form} />
            </CardContent>
            <CardFooter className="justify-between">
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={URLS.docs}
                target="_blank"
              >
                Learn more
              </Link>
              <Button type="submit">Create web3 account</Button>
            </CardFooter>
          </Card>
        </form>
      </Form>
      <Link
        className="items-center flex justify-center hover:underline"
        href="/home/apps"
      >
        Skip
      </Link>
    </div>
  );
}
