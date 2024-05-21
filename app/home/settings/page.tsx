"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
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
import { CreateAPIKey } from "./create-api-key";
import RevealKeyForm from "./reveal-key-form";

export default function SettingsPage() {
  const { user } = usePrivy();
  const address = user?.wallet?.address;

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
          {address && (
            <div>
              <div>
                <Label>Public Key</Label>
                <ValueBox
                  value={address}
                  copyText="Public Key copied to clipboard."
                  description="Your public key is used to receive rewards."
                />
              </div>
              <div>
                <Label>Private Key</Label>
                <RevealKeyForm />
                <p className="text-sm text-muted-foreground py-1">
                  Your private key is used to authorise the sending of
                  rewards from your dApps.
                </p>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>
            Securely create a new API key linked to your web3 account.
            Please be careful, as creating a new API key will override
            any existing keys, disabling them. For your security, we
            only display your API key once at the time of creation.
          </CardDescription>
        </CardHeader>
        <CardContent>{address && <CreateAPIKey />}</CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center space-x-2">
                  <p>Delete Account</p>
                  <Badge>Coming soon</Badge>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  If you wish to delete your account, please reach out
                  to us through our support channels. We're working on
                  implementing an automatic deletion feature. Thank
                  you for your patience.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
