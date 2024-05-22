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

import { badgeFactoryAbi } from "@/abis/ERC721FactoryFacet";
import { URLS } from "@/lib/constants";
import { usePrivy } from "@privy-io/react-auth";
import { writeContract } from "@wagmi/core";
import { useParams, useRouter } from "next/navigation";
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
  const router = useRouter();
  const params = useParams();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      await writeContract(config, {
        address: params.id as `0x${string}`,
        abi: badgeFactoryAbi,
        functionName: "createERC721",
        args: [
          data.name,
          "BADGE",
          address as `0x${string}`,
          1000,
          stringToHex("Base", { size: 32 }),
        ],
      }).then(() => setTimeout(() => router.refresh(), 1000));

      toast.success(`Badge successfully created!`, {
        description:
          "Copy the name or badge ID to start using it in your application.",
        action: {
          label: "Learn more",
          onClick: () =>
            window.open(`${URLS.docs}/functions/rewards`, "_blank"),
        },
        duration: 10000,
        dismissible: true,
      });

      form.reset();
      closeDialog();
    } catch (e: any) {
      if (e.details) {
        return toast.error(getErrorMessage(e.details));
      } else if (e.metaMessages?.[0].includes("nameAlreadyUsed")) {
        toast.error(getErrorMessage(e.message));
      }
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
