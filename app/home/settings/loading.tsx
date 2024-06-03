import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function Loading() {
  return (
    <div className="flex w-full flex-col space-y-5">
      <h1>Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>web3 Account</CardTitle>
          <CardDescription>
            Your web3 account is responsible for sending and receiving
            onchain rewards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[250px]" />
        </CardContent>
      </Card>
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
          <Skeleton className="w-full h-[100px]" />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Skeleton className="w-full h-[100px]" />
        </CardContent>
      </Card>
    </div>
  );
}
