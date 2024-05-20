"use client";

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
import ValueBox from "@/components/value-box";
import { Label } from "@radix-ui/react-dropdown-menu";
import { useAccount } from "wagmi";
import { CreateAPIKey } from "./create-api-key";
import DeleteAccountForm from "./delete-account-form";
import RevealKeyForm from "./reveal-key-form";

export default async function SettingsPage() {
  const { address } = useAccount();

  return (
    <div className="flex w-full flex-col space-y-5">
      <h1>Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Web3 Account</CardTitle>
          <CardDescription>
            Here is your web3 account. It's used to do transactions.
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
                />
              </div>
              <div>
                <Label>Private Key</Label>
                <RevealKeyForm />
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
            For your security, API keys are only displayed once at the
            time of creation.
          </CardDescription>
        </CardHeader>
        <CardContent>{address && <CreateAPIKey />}</CardContent>
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
