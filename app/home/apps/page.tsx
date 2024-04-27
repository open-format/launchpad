import { getAccountAddress, getUserApps } from "@/app/_actions";
import AppTable from "@/components/app-table";
import GetStarted from "@/components/get-started";
import { buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { AlertTriangle } from "lucide-react";
import Link from "next/link";
import CreateAppDialog from "./create/create-app";

async function getData() {
  try {
    const res = await getUserApps();
    return res;
  } catch (e: any) {
    //@TODO Improve error handling
    console.log(e.message);
  }
}

async function getAccount() {
  try {
    const res = await getAccountAddress();
    return res;
  } catch (e) {
    //@TODO Improve error handling
    console.log(e);
  }
}

export default async function AppsPage() {
  // @TODO Improve error handling
  const apps = await getData();
  const account = await getAccount();

  return (
    <div className="space-y-4">
      <GetStarted />
      {!account && (
        <Card className="border-destructive">
          <CardHeader>
            <div className="flex space-x-2">
              <AlertTriangle className="text-destructive" />
              <CardTitle>Action Required</CardTitle>
            </div>
          </CardHeader>
          <CardContent>
            <CardDescription>
              You need to create a web3 account before creating any
              dApp or badges.
            </CardDescription>
          </CardContent>
          <CardFooter>
            <Link
              className={buttonVariants({})}
              href="/home/settings"
            >
              Settings
            </Link>
          </CardFooter>
        </Card>
      )}
      <div className="flex justify-between">
        <h1>Apps</h1>
        <CreateAppDialog account={account} />
      </div>
      {/* @ts-ignore */}
      <AppTable apps={apps} />
    </div>
  );
}
