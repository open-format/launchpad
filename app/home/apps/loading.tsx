import AppTable from "@/components/app-table";
import { trackEvent } from "@/lib/analytics";

export default async function AppsPage() {
  return (
    <div className="space-y-4">
      <div className="flex justify-between flex-col space-y-4">
        <div className="flex justify-between">
          <h1>dApps</h1>
        </div>
      </div>
      <AppTable trackEvent={trackEvent} />
    </div>
  );
}
