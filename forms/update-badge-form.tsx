import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { uploadFileToIPFS, uploadJSONToIPFS } from "@/app/_actions";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { getErrorMessage } from "@/lib/errors";
import { ReloadIcon } from "@radix-ui/react-icons";
import Image from "next/image";

import { badgeAbi } from "@/abis/ERC721Badge";
import { writeContract } from "@wagmi/core";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { useConfig } from "wagmi";

const FormSchema = z.object({
  name: z.string().min(3).max(32).optional(),
  description: z.string().min(3),
  type: z.string(),
  image: z.any(),
});

interface UpdateBadgeFormProps {
  closeDialog: () => void;
  trackEvent: TrackEventFunction;
  metadata: any;
  badge: Badge;
}

export function UpdateBadgeForm({
  badge,
  metadata,
  closeDialog,
  trackEvent,
}: UpdateBadgeFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  const config = useConfig();
  const router = useRouter();
  const image = form.watch("image");

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const formData = new FormData();
      formData.append("file", data.image);
      let image = null;

      if (data.image) {
        image = await uploadFileToIPFS(formData);
      }

      const newMetadata = {
        description: data.description,
        type: data.type,
        ...(image && { image: image }),
      };

      const mergeMetadata = { ...metadata, ...newMetadata };

      const metadataURI = await uploadJSONToIPFS(mergeMetadata);

      await writeContract(config, {
        address: badge.id as `0x${string}`,
        abi: badgeAbi,
        functionName: "setBaseURI",
        args: [metadataURI],
      }).then(() => setTimeout(() => router.refresh(), 1000));

      toast.success(`Badge successfully updated!`);

      await trackEvent({
        event_name: "Update Badge",
        event_meta: {
          app: badge.id,
        },
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
          disabled
          defaultValue={metadata?.name}
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Name" {...field} />
              </FormControl>
              <FormMessage />
              <p className="text-destructive text-sm">
                Name is immutable and cannot be changed.
              </p>
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="description"
          defaultValue={metadata?.description}
          render={({ field }) => (
            <FormItem className="flex-1">
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input
                  placeholder="A trophy for completing your first activity..."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          defaultValue={metadata?.type}
          name="type"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Type</FormLabel>
              <FormControl>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select Type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="key">Key</SelectItem>
                    <SelectItem value="vanity">Vanity</SelectItem>
                    <SelectItem value="collectible">
                      Collectible
                    </SelectItem>
                    <SelectItem value="perk">Perk</SelectItem>
                  </SelectContent>
                </Select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="image"
          render={({ field: { value, onChange, ...fieldProps } }) => (
            <FormItem>
              <FormLabel>Image</FormLabel>
              {image && (
                <Image
                  src={URL.createObjectURL(image)}
                  alt="Uploaded page image"
                  width={125}
                  height={125}
                  className="rounded-md object-cover"
                />
              )}
              <FormControl>
                <Input
                  {...fieldProps}
                  type="file"
                  accept="image/*"
                  onChange={(e) =>
                    onChange(e.target.files && e.target.files[0])
                  }
                />
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
