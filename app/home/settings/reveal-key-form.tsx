"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { default as ValueBox } from "@/components/value-box";
import { EyeIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { revealAccountKey } from "@/app/_actions";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { useForm } from "react-hook-form";
import { z } from "zod";

const FormSchema = z.object({
  password: z.string().min(3),
});

export default function RevealKeyForm() {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [key, setKey] = useState<string | null>();

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const {
    reset,
    setError,
    formState: { isSubmitting },
  } = form;

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const result = await revealAccountKey(data.password);
      setKey(result.data?.accountKey);
      reset();
    } catch (e: any) {
      setError("password", {
        type: "custom",
        message: e.message,
      });
    }
  }

  useEffect(() => {
    if (!isModalOpen) {
      setKey(null);
    }
  }, [isModalOpen]);

  return (
    <div className="flex space-x-2 flex-1">
      <ValueBox value="********************************" />
      <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
        <DialogTrigger>
          <Button>
            <EyeIcon className="w-4 h-4" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Reveal Private Key</DialogTitle>
            {key ? (
              <>
                <DialogDescription>
                  Keep this key safe.
                </DialogDescription>
                <ValueBox
                  value={key}
                  copyText="Private key copied to clipboard"
                />
              </>
            ) : (
              <>
                <DialogDescription>
                  Please enter your password for your web3 account
                </DialogDescription>
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
                                autoComplete="password"
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
                    {isSubmitting ? (
                      <Button disabled>
                        <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                        Revealing Key...
                      </Button>
                    ) : (
                      <Button type="submit">Reveal Key</Button>
                    )}
                  </form>
                </Form>
              </>
            )}
          </DialogHeader>
        </DialogContent>
      </Dialog>
    </div>
  );
}
