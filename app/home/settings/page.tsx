import { getAccountAddress } from "@/app/_actions";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import ValueBox from "@/components/value-box";
import { CreateAccountForm } from "./create-account-form";
import { CreateAPIKey } from "./create-api-key";
import DeleteAccountForm from "./delete-account-form";
import RevealKey from "./reveal-key-form";

async function getData() {
  const res = await getAccountAddress();
  return res.data;
}

export default async function SettingsPage() {
  //@TODO correct handle errors
  const data = await getData().catch((e) => e);

  return (
    <div className="flex w-full flex-col space-y-5">
      <h1>Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Web3 Account</CardTitle>
          <CardDescription>
            Your web3 account is responsible for sending and receiving
            onchain rewards.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data && data.address ? (
            <div>
              <div>
                <Label>Public Key</Label>
                <ValueBox
                  value={data.address}
                  copyText="Public Key copied to clipboard."
                  description="Your public key is used to receive rewards"
                />
              </div>
              <div>
                <Label>Private Key</Label>
                <p className="text-sm text-muted-foreground py-1">
                  Your private key is used to authorise the sending of
                  rewards from your dApps.
                </p>
                <RevealKey />
              </div>
            </div>
          ) : (
            <CreateAccountForm />
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Securely create a new API key linked to your web3 account.
            For your security, API keys are only displayed once at the
            time of creation.
          </CardDescription>
        </CardHeader>
        <CardContent>
          {data.address ? (
            <CreateAPIKey />
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Button disabled>Generate New API Key</Button>
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  You need to create a web3 account before you can
                  generate an API Key.
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently
                  delete your account and remove your data from our
                  servers.
                </DialogDescription>
              </DialogHeader>
              <DeleteAccountForm />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
