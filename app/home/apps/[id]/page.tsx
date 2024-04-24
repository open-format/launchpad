"use client";

import BadgeGrid from "@/components/badge-grid";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ValueBox from "@/components/value-box";
import { useEffect, useState } from "react";
import CreateBadgeDialog from "./create-badge";

export default function ViewAppPage() {
  const [isCopied, setIsCopied] = useState<boolean>(false);

  useEffect(() => {
    if (isCopied) {
      setTimeout(() => setIsCopied(false), 5000);
    }
  }, [isCopied]);

  return (
    <div className="space-y-5">
      <h1 className="text-3xl font-bold leading-none tracking-tight">
        Rewardle
      </h1>
      <Card>
        <CardHeader>
          <CardTitle>App ID</CardTitle>
          <CardDescription className="flex items-center space-x-1">
            {/* <ChainName chain="arbitrumSepolia" /> */}
          </CardDescription>
          <CardDescription>
            Your APP ID is used to interact with this application.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <ValueBox
            value="0x1356y576gyf45tc45e"
            copyText="App ID copied to clipboard."
          />
        </CardContent>
      </Card>
      <div className="flex justify-between">
        <h1>Badges</h1>
        <CreateBadgeDialog />
      </div>
      <BadgeGrid />
    </div>
  );
}
