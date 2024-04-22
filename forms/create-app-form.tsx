"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { Badge } from "@/components/ui/badge";
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
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Arbitrum, Polygon } from "@thirdweb-dev/chain-icons";

const FormSchema = z.object({
  name: z.string().min(3),
  chain: z.string(),
});

export function CreateAppForm({
  onSubmit,
}: {
  onSubmit: (data: any) => void;
}) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
  });

  function handleFormSubmission(data: z.infer<typeof FormSchema>) {
    onSubmit(data);
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
            name="chain"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Blockchain</FormLabel>
                <FormControl>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Select blockchain" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Testnet</SelectLabel>
                        <SelectItem value="arbitrum-sepolia">
                          <div className="flex items-center space-x-2">
                            <Arbitrum className="h-6 w-6" />
                            <p>Arbitrum Sepolia</p>
                          </div>
                        </SelectItem>
                        <SelectItem value="polygon-amoy" disabled>
                          <div className="flex items-center space-x-2">
                            <Polygon className="h-6 w-6" />
                            <p>Polygon Amoy</p>
                            <Badge>Coming soon</Badge>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                      <SelectGroup>
                        <SelectLabel>Mainnet</SelectLabel>
                        <SelectItem value="arbitrum-mainnet" disabled>
                          <div className="flex items-center space-x-2">
                            <Arbitrum className="h-6 w-6" />
                            <p>Arbitrum Mainnet</p>
                            <Badge>Coming soon</Badge>
                          </div>
                        </SelectItem>
                        <SelectItem value="polygon-mainnet" disabled>
                          <div className="flex items-center space-x-2">
                            <Polygon className="h-6 w-6" />
                            <p>Polygon Mainnet</p>
                            <Badge>Coming soon</Badge>
                          </div>
                        </SelectItem>
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>
        <Button type="submit">Create dApp</Button>
      </form>
    </Form>
  );
}
