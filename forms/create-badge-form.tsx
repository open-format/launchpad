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
  description: z.string().min(3),
  type: z.string(),
  image: z.any(),
});

interface CreateBadgeFormProps {
  closeDialog: () => void;
  trackEvent: TrackEventFunction;
}

export function CreateBadgeForm({
  closeDialog,
  trackEvent,
}: CreateBadgeFormProps) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });
  const config = useConfig();
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  const router = useRouter();
  const params = useParams();
  const image = form.watch("image");

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      const formData = new FormData();
      formData.append("file", data.image);

      const image = await uploadFileToIPFS(formData);

      const metadata = {
        name: data.name,
        description: data.description,
        type: data.type,
        image: image,
      };

      const metadataURI = await uploadJSONToIPFS(metadata);

      console.log({ metadataURI });

      await writeContract(config, {
        address: params.id as `0x${string}`,
        abi: badgeFactoryAbi,
        functionName: "createERC721WithTokenURI",
        args: [
          data.name,
          "BADGE",
          metadataURI,
          address as `0x${string}`,
          1000,
          stringToHex("Badge", { size: 32 }),
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

      await trackEvent({
        event_name: "Create Badge",
        event_meta: {
          app: params.id,
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
