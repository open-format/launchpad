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

import { createBadge } from "@/app/_actions";
import { URLS } from "@/lib/constants";
import { useParams } from "next/navigation";
import { toast } from "sonner";

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
  const params = useParams();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      await createBadge(
        params.id as string,
        data.name,
        "hello",
        "ipfs://"
      );

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
