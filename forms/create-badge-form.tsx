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

import { appFactoryAbi } from "@/abis/AppFactory";
import { URLS, contractAddresses } from "@/lib/constants";
import { usePrivy } from "@privy-io/react-auth";
import { writeContract } from "@wagmi/core";
import { toast } from "sonner";
import { stringToHex } from "viem";
import { useConfig } from "wagmi";

const FormSchema = z.object({
  name: z.string().min(3).max(32),
});

interface CreateBadgeFormProps {
  closeDialog: () => void;
}

export function CreateBadgeForm({
  closeDialog,
}: CreateBadgeFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const config = useConfig();
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      await writeContract(config, {
        address: contractAddresses.APP_FACTORY,
        abi: appFactoryAbi,
        functionName: "create",
        args: [stringToHex(data.name, { size: 32 }), address],
      });

      toast.success(`Badge successfully created!`, {
        description: "You can reward it to you users.",
        action: {
          label: "View docs",
          onClick: () =>
            window.open(`${URLS.docs}/functions/rewards`, "_blank"),
        },
        duration: 5000,
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
            </FormItem>
          )}
        />
        {form.formState.isSubmitting ? (
          <Button disabled>
            <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
            Creating Badge...
          </Button>
        ) : (
          <Button type="submit">Create Badge</Button>
        )}
      </form>
    </Form>
  );
}
