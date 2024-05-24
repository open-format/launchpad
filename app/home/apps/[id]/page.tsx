import { getApp } from "@/app/_actions";
import { default as BadgeTable } from "@/components/badge-table";
import ChainName from "@/components/chain-name";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { default as ValueBox } from "@/components/value-box";
import { trackEvent } from "@/lib/analytics";
import { capitalizeString } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { default as CreateBadgeDialog } from "./create-badge";

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
        <>
          <h1 className="text-3xl font-bold leading-none tracking-tight">
            {capitalizeString(app.name)}
          </h1>
          <div className="flex space-x-2">
            <ChainName chain="arbitrumSepolia" />
            <Badge className="bg-green-500 hover:bg-green-500">
              <InfoIcon className="h-4 w-4 mr-1" />
              We cover transactions costs for this blockchain
            </Badge>
          </div>
        </>
      )}
      <Card>
        <CardHeader>
          <h2>Keys</h2>
        </CardHeader>
        <CardContent>
          {app && (
            <div className="space-y-4">
              {app.id && (
                <ValueBox
                  trackEvent={{
                    fn: trackEvent,
                    event_name: "dApp ID",
                  }}
                  label="App ID"
                  description="This is the App ID used to interact with your onchain application."
                  value={app?.id}
                  copyText="App ID copied to clipboard."
                />
              )}
              {app?.xpToken?.id && (
                <ValueBox
                  trackEvent={{
                    fn: trackEvent,
                    event_name: "XP Token Address",
                  }}
                  label="XP Token Address"
                  description="This is the onchain token address for the XP token associated with this dApp. This value is required for the SDK only."
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
              <CreateBadgeDialog trackEvent={trackEvent} />
            </div>
          </CardHeader>
        )}
        <CardContent>
          <BadgeTable badges={app?.badges} trackEvent={trackEvent} />
        </CardContent>
      </Card>
    </div>
  );
}
