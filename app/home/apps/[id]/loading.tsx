import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import ValueBox from "@/components/value-box";
import CreateBadgeDialog from "./create-badge";

export default async function Loading() {
  return (
    <div className="space-y-5">
      <Skeleton className="w-[250px] h-[30px]" />
      <Skeleton className="w-[400px] h-[25px]" />
      <Card>
        <CardHeader>
          <h2>Keys</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <ValueBox
              label="App ID"
              description="This is the App ID used to interact with your onchain application."
              value=""
              copyText="App ID copied to clipboard."
              isLoading={true}
            />

            <ValueBox
              label="XP Token Address"
              description="This is the onchain token address for the XP token associated with this dApp. This value is required for the SDK only."
              value=""
              isLoading={true}
              copyText="App ID copied to clipboard."
            />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <div className="flex justify-between">
            <h2>Badges</h2>
            {/* @ts-ignore */}
            <CreateBadgeDialog />
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <ValueBox
            label=""
            value=""
            isLoading={true}
            copyText="Badge ID copied to clipboard."
          />
        </CardContent>
      </Card>
    </div>
  );
}
