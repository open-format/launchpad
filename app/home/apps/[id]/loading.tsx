import ChainName from "@/components/chain-name";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ValueBox from "@/components/value-box";
import { InfoIcon } from "lucide-react";

export default async function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="w-[250px] h-[30px]" />
      <Card>
        <CardHeader>
          <CardTitle>Keys</CardTitle>
          <div className="flex space-x-2">
            <ChainName chain="arbitrumSepolia" />
            <TooltipProvider>
              <Tooltip delayDuration={250}>
                <TooltipTrigger>
                  <Badge className="bg-green-500 hover:bg-green-500">
                    gas sponsorship{" "}
                    <InfoIcon className="h-4 w-4 ml-1" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent
                  side="bottom"
                  className="max-w-[300px]"
                >
                  We cover transactions costs for this blockchain.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ValueBox
              label="App ID"
              description="This the App ID used to interact with your onchain application."
              value=""
              copyText="App ID copied to clipboard."
              isLoading={true}
            />

            <ValueBox
              label="XP Token Address"
              description="This the on-chain token address for the XP token associated with this dApp. This value is required for the SDK only."
              value=""
              isLoading={true}
              copyText="App ID copied to clipboard."
            />
          </div>
        </CardContent>
      </Card>
      {/* <div className="flex justify-between">
        <h1>Badges</h1>
        <CreateBadgeDialog />
      </div>
      <BadgeGrid /> */}
    </div>
  );
}
