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
import { CreateTokenForm } from "@/forms/create-token-form";
import { useState } from "react";

export default function CreateTokenDialog({
  trackEvent,
}: {
  trackEvent: TrackEventFunction;
}) {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggle() {
    setIsOpen((t) => !t);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger className={buttonVariants()}>
        Create Credit Token
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Credit Token</DialogTitle>
          <DialogDescription>
            Credits are ideal for enabling users to purchase services
            and functionality within your ecosystem, driving
            engagement and retention.
          </DialogDescription>
        </DialogHeader>
        <CreateTokenForm
          closeDialog={toggle}
          trackEvent={trackEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
