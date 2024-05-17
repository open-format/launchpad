import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import {
  uploadFileToIPFS,
  uploadJSONToIPFS,
  validatePassword,
} from "@/app/_actions";
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

import { createBadge } from "@/app/_actions";
import UnlockKeyFormField from "@/components/unlock-key-form-field";
import { URLS } from "@/lib/constants";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const FormSchema = z.object({
  name: z.string().min(3).max(32),
  description: z.string().min(3),
  type: z.string(),
  password: z.string(),
  image: z.any(),
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
  const image = form.watch("image");
  const router = useRouter();

  async function handleFormSubmission(
    data: z.infer<typeof FormSchema>
  ) {
    try {
      await validatePassword(data.password);

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

      await createBadge(
        params.id as string,
        data.name,
        data.password,
        metadataURI
      );

      router.refresh();

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
      if (e.message.includes("password")) {
        form.setError("password", {
          type: "custom",
          message: e.message,
        });
      } else {
        toast.error(getErrorMessage(e.message));
      }
    }
  }

  return (
    <Form {...form}>
      <form
        className="w-full space-y-2"
        onSubmit={form.handleSubmit(handleFormSubmission)}
      >
        <div>
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
            render={({
              field: { value, onChange, ...fieldProps },
            }) => (
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
          <UnlockKeyFormField form={form} />
        </div>
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
