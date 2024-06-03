"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { usePrivy } from "@privy-io/react-auth";
import { CreateAPIKey } from "./create-api-key";

interface Web3AccountProps {
  trackEvent: TrackEventFunction;
}

export default function APIKeys({ trackEvent }: Web3AccountProps) {
  const { user } = usePrivy();
  const address = user?.wallet?.address;
  return (
    <Card>
      <CardHeader>
        <CardTitle>API Key</CardTitle>
        <CardDescription>
          Securely create a new API key linked to your web3 account.
          Please be careful, as creating a new API key will override
          any existing keys, disabling them. For your security, we
          only display your API key once at the time of creation.
        </CardDescription>
      </CardHeader>
      <CardContent>
        {address && <CreateAPIKey trackEvent={trackEvent} />}
      </CardContent>
    </Card>
  );
}
