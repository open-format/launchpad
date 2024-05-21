import { getApp } from "@/app/_actions";
import BadgeTable from "@/components/badge-table";
import ChainName from "@/components/chain-name";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ValueBox from "@/components/value-box";
import { InfoIcon } from "lucide-react";
import CreateBadgeDialog from "./create-badge";

async function getData(app: string) {
  try {
    const res = await getApp(app);
    return res;
  } catch (e: any) {
    //@TODO Improve error handling
    console.log(e.message);
  }
}

export default async function ViewAppPage({
  params,
}: {
  params: { id: string };
}) {
  const app = await getData(params.id.toLowerCase());

  return (
    <div className="space-y-5">
      {app && (
        <h1 className="text-3xl font-bold leading-none tracking-tight">
          {app.name}
        </h1>
      )}
      <Card>
        <CardHeader>
          <h2>Keys</h2>
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
          {app && (
            <div className="space-y-4">
              {app.id && (
                <ValueBox
                  label="App ID"
                  description="This the App ID used to interact with your onchain application."
                  value={app?.id}
                  copyText="App ID copied to clipboard."
                />
              )}
              {app.xpToken.id && (
                <ValueBox
                  label="XP Token Address"
                  description="This the on-chain token address for the XP token associated with this dApp. This value is required for the SDK only."
                  value={app?.xpToken.id}
                  copyText="App ID copied to clipboard."
                />
              )}
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        {Boolean(app?.badges?.length) && (
          <CardHeader>
            <div className="flex justify-between">
              <h2>Badges</h2>
              <CreateBadgeDialog />
            </div>
          </CardHeader>
        )}
        <CardContent>
          <BadgeTable badges={app?.badges} />
        </CardContent>
      </Card>
    </div>
  );
}
