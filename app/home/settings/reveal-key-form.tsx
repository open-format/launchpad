"use client";

import { Button } from "@/components/ui/button";
import { default as ValueBox } from "@/components/value-box";

import { usePrivy } from "@privy-io/react-auth";

export default function RevealKeyForm() {
  const { exportWallet } = usePrivy();

  return (
    <div className="flex space-x-2 flex-1">
      <ValueBox value="********************************" />
      <Button onClick={exportWallet}>Export</Button>
    </div>
  );
}
