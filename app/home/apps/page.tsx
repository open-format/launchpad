import { getUserApps } from "@/app/_actions";
import AppTable from "@/components/app-table";
import GetStarted from "@/components/get-started";
import CreateAppDialog from "./create/create-app";

async function getData() {
  const res = await getUserApps();
  return res;
}

export default async function AppsPage() {
  // @TODO Improve error handling
  const apps = await getData().catch((e) => e);

  return (
    <div className="space-y-4">
      <GetStarted />
      <div className="flex justify-between">
        <h1>Apps</h1>
        <CreateAppDialog />
      </div>
      <AppTable apps={apps} />
    </div>
  );
}
