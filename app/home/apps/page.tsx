import AppTable from "@/components/app-table";
import { trackEvent } from "@/lib/analytics";

export default async function AppsPage() {
  return (
    <div className="space-y-4">
      <AppTable trackEvent={trackEvent} />
    </div>
  );
}
