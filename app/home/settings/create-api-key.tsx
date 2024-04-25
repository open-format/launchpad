"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { createAPIKey } from "@/app/_actions";
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
import ValueBox from "@/components/value-box";
import { useAccountStore } from "@/stores";
import { useEffect, useState } from "react";

const FormSchema = z.object({
  password: z.string().min(3),
});

export function CreateAPIKey() {
  const [apiKey, setAPIKey] = useState<string | null>();
  const [isOpen, setIsOpen] = useState<boolean>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const { setEncryptedAccountKey } = useAccountStore();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const result = await createAPIKey(data.password);
      setAPIKey(result);
      setEncryptedAccountKey(result.encryptedAccountKey);
    } catch (e) {
      //@TODO Add catch-all error handling
      console.log(e);
    }
  }

  useEffect(() => {
    if (!isOpen) {
      form.reset();
      setAPIKey(null);
    }
  }, [isOpen]);

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger>
        <Button>Generate New API Key</Button>
      </DialogTrigger>
      {apiKey ? (
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
      ) : (
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Generate API Key</DialogTitle>
            <DialogDescription>
              API Keys are generated from your web3 account. You are
              required to add a password so we can generate your API
              Key.
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
              <Button type="submit">Create API Key</Button>
            </form>
          </Form>
        </DialogContent>
      )}
    </Dialog>
  );
}
