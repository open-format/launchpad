import { getUserApps } from "@/app/_actions";
import AppTable from "@/components/app-table";
import GetStarted from "@/components/get-started";
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

export default async function AppsPage() {
  // @TODO Improve error handling
  const apps = await getData();

  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col space-y-4">
        <div className="flex justify-between">
          <h1>dApps</h1>
          <CreateAppDialog />
        </div>
        <GetStarted />
      </div>
      {/* @ts-ignore */}
      <AppTable apps={apps} />
    </div>
  );
}
