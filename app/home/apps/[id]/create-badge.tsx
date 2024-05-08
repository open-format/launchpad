"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { CreateBadgeForm } from "@/forms/create-badge-form";
import { useState } from "react";

export default function CreateBadgeDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggle() {
    setIsOpen((t) => !t);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className={buttonVariants()}>
        Create Badge
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Badge</DialogTitle>
          <DialogDescription>Create a badge.</DialogDescription>
        </DialogHeader>
        <CreateBadgeForm onSubmit={toggle} />
      </DialogContent>
    </Dialog>
  );
}
