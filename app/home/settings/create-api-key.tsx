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
import { Form } from "@/components/ui/form";
import UnlockKeyFormField from "@/components/unlock-key-form-field";
import ValueBox from "@/components/value-box";
import { getErrorMessage } from "@/lib/errors";
import { useAccountStore } from "@/stores";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useEffect, useState } from "react";
import { toast } from "sonner";

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

  const {
    setError,
    formState: { isSubmitting },
  } = form;

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const result = await createAPIKey(data.password);
      setAPIKey(result);
      setEncryptedAccountKey(result.encryptedAccountKey);
    } catch (e: any) {
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
              Generate an API Key to use the OPENFORMAT API and
              no-code nodes.
            </DialogDescription>
          </DialogHeader>
          <Form {...form}>
            <form
              className="w-full space-y-4"
              onSubmit={form.handleSubmit(handleFormSubmission)}
            >
              <UnlockKeyFormField form={form} />

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
        </DialogContent>
      )}
    </Dialog>
  );
}
