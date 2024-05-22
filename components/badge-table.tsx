"use client";

import CreateBadgeDialog from "@/app/home/apps/[id]/create-badge";
import { timeAgo } from "@/lib/time";
import { capitalizeString } from "@/lib/utils";
import Image from "next/image";
import emptyBadgeImage from "../images/superdev.png";
import ValueBox from "./value-box";

type Badge = {
  id: string;
  name: string;
  createdAt: string;
};

interface BadgeTableProps {
  badges: Badge[] | undefined;
  trackEvent: TrackEventFunction;
}

export default function BadgeTable({
  badges,
  trackEvent,
}: BadgeTableProps) {
  if (!badges || !badges.length) {
    return <EmptyState />;
  }
  return (
    <div className="space-y-4">
      {badges &&
        badges?.map((badge) => (
          <ValueBox
            trackEvent={{
              fn: trackEvent,
              event_name: "Badge ID",
            }}
            label={capitalizeString(badge.name)}
            description={`created ${timeAgo(
              Number(badge.createdAt)
            )}`}
            value={badge.id}
            copyText="Badge ID copied to clipboard."
          />
        ))}
    </div>
  );
}

function EmptyState() {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="w-[350px] text-center flex items-center justify-center flex-col">
        <Image
          src={emptyBadgeImage}
          alt="Tree Planting Badge"
          width={250}
          height={250}
          className="object-cover"
        />

        <p className="text-muted-foreground pb-2">
          Unlock the potential of your app by creating your first
          badge to reward users for their achievements and boost
          engagement.
        </p>
        {/* @ts-ignore */}
        <CreateBadgeDialog />
      </div>
    </div>
  );
}
