"use client";

import { deleteAccount } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import { Form } from "@/components/ui/form";
import { useForm } from "react-hook-form";

export default function DeleteAccountForm() {
  const form = useForm();

  async function handleFormSubmission() {
    try {
      await deleteAccount();
    } catch (e) {
      console.log(e);
    }
  }
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleFormSubmission)}>
        <Button type="submit" variant="destructive">
          Delete Account
        </Button>
      </form>
    </Form>
  );
}
