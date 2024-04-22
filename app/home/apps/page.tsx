"use client";

import AppTable from "@/components/app-table";
import GetStarted from "@/components/get-started";
import { useState } from "react";
import CreateAppDialog from "./create/create-app";

export default function AppsPage() {
  const [isGetStartedOpen, setIsGetStared] = useState<boolean>(true);
  return (
    <div className="space-y-4">
      {isGetStartedOpen && (
        <GetStarted
          isOpen={isGetStartedOpen}
          setIsOpen={setIsGetStared}
        />
      )}
      <div className="flex justify-between">
        <h1>Apps</h1>
        <CreateAppDialog />
      </div>
      <AppTable />
    </div>
  );
}
