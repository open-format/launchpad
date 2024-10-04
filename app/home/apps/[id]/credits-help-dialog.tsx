"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { HelpCircle } from "lucide-react";
import { useState } from "react";

export default function CreditsHelpDialog() {
  const [isOpen, setIsOpen] = useState<boolean>(false);

  function toggle() {
    setIsOpen((t) => !t);
  }

  return (
    <Dialog open={isOpen} onOpenChange={toggle}>
      <DialogTrigger>
        <HelpCircle className="w-4 h-4 text-of-yellow" />
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Credits</DialogTitle>
        </DialogHeader>
        <ul className="space-y-4">
          <li>
            <strong>Credits held by treasury</strong>
            <p>
              This is the amount of credits in your web3 account
              currently allocated to the dApp. They are available to
              be rewarded to the user. If a user spends credits they
              will be transferred to this wallet.
            </p>
          </li>
          <li>
            <strong>Credits held by users</strong>
            <p>
              This is the total amount of credits held by all your
              users. When a user spends credits, they are transferred
              user's web3 account to the treasury.
            </p>
          </li>
          <li>
            <strong>Total credits</strong>
            <p>
              This is the total amount of credits in circulation,
              which is a combination of{" "}
              <strong>Total credits held by treasury</strong> and{" "}
              <strong>Total credits held by users</strong>.
            </p>
          </li>
          <li>
            <strong>Increase supply</strong>
            <p>
              Use this input to increase the amount of credits in the
              system. When increased they will appear in the
              <strong>Total credits held by treasury</strong>.
            </p>
          </li>
          <li>
            <strong>Decrease supply</strong>
            <p>
              Use this input to decrease the amount of credits in the
              system. When decreased they will be removed from the{" "}
              <strong>Total credits held by treasury</strong>.
            </p>
          </li>
        </ul>
      </DialogContent>
    </Dialog>
  );
}
