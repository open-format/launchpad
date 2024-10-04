import { getApp } from "@/app/_actions";
import BadgeGrid from "@/components/badge-grid";
import ChainName from "@/components/chain-name";
import Copy from "@/components/copy";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { capitalizeString } from "@/lib/utils";
import { InfoIcon } from "lucide-react";
import { default as CreateBadgeDialog } from "./create-badge";
import { default as CreateTokenDialog } from "./create-token";
import CreditsHelpDialog from "./credits-help-dialog";
import { default as CreditsSection } from "./credits-section";

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
  const data = await getData(params.id.toLowerCase());

  if (!data) {
    return <p>App not found</p>;
  }

  const { app, fungibleTokens } = data;

  const creditToken = fungibleTokens && fungibleTokens[0];

  return (
    <div className="space-y-5">
      {app && (
        <>
          <h1 className="font-bold leading-none tracking-tight">
            {capitalizeString(app.name)}
          </h1>
          <div className="flex flex-col lg:flex-row justify-between space-y-4 lg:space-y-0">
            <div className="flex flex-col space-y-2">
              <ChainName chain="arbitrumSepolia" />
              <div className="flex items-center">
                <InfoIcon className="h-4 w-4 mr-1 text-of-yellow " />
                <span className="text-xs">
                  We cover transactions costs for this blockchain
                </span>
              </div>
            </div>
            <div className="text-sm space-y-2">
              {app.id && (
                <div className="flex space-x-2 items-center">
                  <p className="text-right w-24">dApp ID</p>
                  <p>{app.id}</p>
                  <Copy
                    align="right"
                    value={app.id}
                    copyText="dApp ID copied to clipboard."
                    trackEvent={{
                      fn: trackEvent,
                      event_name: "dApp ID",
                    }}
                  />
                </div>
              )}
              {app?.xpToken?.id && (
                <div className="flex space-x-2 items-end justify-end">
                  <p className="text-right w-24">XP Token ID</p>
                  <p>{app.xpToken.id}</p>
                  <Copy
                    align="right"
                    value={app.xpToken.id}
                    copyText="XP Token Address copied to clipboard."
                    trackEvent={{
                      fn: trackEvent,
                      event_name: "XP Token Address",
                    }}
                  />
                </div>
              )}
              {creditToken?.id && (
                <div className="flex space-x-2 items-end justify-end whitespace-nowrap">
                  <p>Credit Token ID</p>
                  <p>{creditToken.id}</p>
                  <Copy
                    align="right"
                    value={creditToken.id}
                    copyText="Credit Token Address copied to clipboard."
                    trackEvent={{
                      fn: trackEvent,
                      event_name: "Credit Token Address",
                    }}
                  />
                </div>
              )}
            </div>
          </div>
        </>
      )}
      <Card className="border-0 border-t-2 rounded-none">
        <CardHeader className="px-0">
          <div className="flex justify-between w-full">
            <div className="flex space-x-2 items-center">
              <h3>Credits</h3>
              {creditToken && <CreditsHelpDialog />}
            </div>
            {!creditToken && (
              <CreateTokenDialog trackEvent={trackEvent} />
            )}
          </div>
        </CardHeader>
        <CardContent className="space-y-4 px-0">
          {creditToken && (
            <div className="flex flex-col space-y-4 lg:space-y-0 lg:flex-row lg:justify-between">
              <CreditsSection creditToken={creditToken} />
            </div>
          )}
        </CardContent>
      </Card>
      <Card className="border-0 border-t-2 rounded-none px-0">
        {Boolean(app?.badges?.length) && (
          <CardHeader className="px-0">
            <div className="flex justify-between">
              <h3>Badges</h3>
              <CreateBadgeDialog trackEvent={trackEvent} />
            </div>
          </CardHeader>
        )}
        <CardContent className="px-0">
          <BadgeGrid badges={app?.badges} trackEvent={trackEvent} />
        </CardContent>
      </Card>
    </div>
  );
}
