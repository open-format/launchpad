import AppTable from "@/components/app-table";
import { trackEvent } from "@/lib/analytics";
import CreateAppDialog from "./create/create-app";

export default async function AppsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col space-y-4">
        <div className="flex justify-between">
          <h1>dApps</h1>
          <CreateAppDialog trackEvent={trackEvent} />
        </div>
        {/* @DEV Hidden until we content is available */}
        {/* <GetStarted /> */}
      </div>
      <AppTable trackEvent={trackEvent} />
    </div>
  );
}
