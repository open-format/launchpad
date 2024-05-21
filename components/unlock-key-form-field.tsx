import { UseFormReturn } from "react-hook-form";
import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from "./ui/input";

export default function UnlockKeyFormField({
  form,
}: {
  form: UseFormReturn<any>;
}) {
  return (
    <FormField
      control={form.control}
      name="password"
      render={({ field }) => (
        <FormItem className="flex-1">
          <FormLabel>
            Create Unlock Key to secure your web3 account
          </FormLabel>
          <FormControl>
            <Input
              id="password"
              autoComplete="password"
              {...field}
              type="password"
            />
          </FormControl>
          <FormDescription>
            Please create a strong key phrase.
          </FormDescription>
          <FormMessage />
        </FormItem>
      )}
    />
  );
}
