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

export default function CreateBadgeDialog({
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
        Create Badge
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Badge</DialogTitle>
          <DialogDescription>
            A badge is an NFT for rewarding engagement and managing
            access. It could grant entry to exclusive events, verify
            memberships for premium content, and unlock special
            in-game features through blockchain verification, among
            many other uses.
          </DialogDescription>
        </DialogHeader>
        <CreateBadgeForm
          closeDialog={toggle}
          trackEvent={trackEvent}
        />
      </DialogContent>
    </Dialog>
  );
}
