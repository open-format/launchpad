import { getAccountAddress, getUserApps } from "@/app/_actions";
import AppTable from "@/components/app-table";
import FlashCard from "@/components/flash-card";
import GetStarted from "@/components/get-started";
import { buttonVariants } from "@/components/ui/button";
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
      {!account && (
        <FlashCard
          title="Action Required"
          description="You need to create a web3 account before creating any dApp
        or badges."
        >
          <Link className={buttonVariants()} href="/home/settings">
            Settings
          </Link>
        </FlashCard>
      )}
      <div className="flex justify-between flex-col space-y-2">
        <div className="flex justify-between">
          <h1>Apps</h1>
          <CreateAppDialog account={account} />
        </div>
        <GetStarted />
      </div>
      {/* @ts-ignore */}
      <AppTable apps={apps} />
    </div>
  );
}
