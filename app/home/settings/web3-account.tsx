"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ValueBox from "@/components/value-box";
import { usePrivy } from "@privy-io/react-auth";
import { Label } from "@radix-ui/react-dropdown-menu";

interface Web3AccountProps {
  trackEvent: TrackEventFunction;
}

export default function Web3Account({
  trackEvent,
}: Web3AccountProps) {
  const { user, exportWallet } = usePrivy();
  const address = user?.wallet?.address;

  function handleExport() {
    trackEvent({
      event_name: "Export Private Key",
    });
    exportWallet();
  }
  return (
    <Card>
      <CardHeader>
        <CardTitle>Web3 Account</CardTitle>
        <CardDescription>
          Your web3 account is responsible for sending and receiving
          onchain rewards.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {address && (
          <div>
            <div>
              <ValueBox
                trackEvent={{
                  fn: trackEvent,
                  event_name: "Public Key",
                }}
                value={address}
                label="Public Key"
                copyText="Public Key copied to clipboard."
                description="Your public key is used to receive rewards."
              />
            </div>
            <div>
              <Label>Private Key</Label>
              <div className="flex space-x-2 flex-1">
                <ValueBox value="********************************" />
                <Button onClick={handleExport}>Export</Button>
              </div>
              <p className="text-sm text-muted-foreground py-1">
                Your private key is used to authorise the sending of
                rewards from your dApps.
              </p>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
