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
import ValueBox from "@/components/value-box";
import Link from "next/link";
import RevealKey from "./reveal-key-form";

async function getData() {
  const res = await getAccountAddress();
  return res.data;
}

export default async function SettingsPage() {
  const data = await getData();

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
          <Label>Public Key</Label>
          {data && data.address && (
            <ValueBox
              value={data.address}
              copyText="Public Key copied to clipboard."
            />
          )}
          <Label>Private Key</Label>
          <div className="flex space-x-2 flex-1">
            <RevealKey />
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API Keys</CardDescription>
        </CardHeader>
        <CardContent></CardContent>
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
              <Link href="/">
                <Button variant="destructive">Delete Account</Button>
              </Link>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
