"use client";

import CreateBadgeDialog from "@/app/home/apps/[id]/create-badge";
import { addressSplitter } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import emptyBadgeImage from "../images/superdev.png";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";
import { Skeleton } from "./ui/skeleton";

export default function BadgeGrid({
  badges,
}: {
  badges: Badge[] | undefined;
}) {
  if (!badges || !badges.length) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {badges.map((badge) => (
        <Item
          key={badge.id}
          badge={badge}
          metadataURI="ipfs://QmU7QZy6YksoLNHzETpBiupMUJn6wGDEVAd6jjaBNkGzJq"
        />
      ))}
    </div>
  );
}

function resolveURI(uri: string) {
  const url = `https://ipfs.io/ipfs/${uri.split("ipfs://")[1]}`;
  console.log(url);
  return url;
}

function Item({
  badge,
  metadataURI,
}: {
  badge: any;
  metadataURI: string;
}) {
  const [metadata, setMetadata] = useState<any>(null);

  useEffect(() => {
    async function fetchMetadata() {
      try {
        const response = await fetch(resolveURI(metadataURI));
        const data = await response.json();
        setMetadata(data);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    }

    fetchMetadata();
  }, [metadataURI]);

  return (
    <Card>
      <CardContent className="mt-5">
        <AspectRatio ratio={1 / 1.2} className="bg-muted">
          {metadata?.image ? (
            <Image
              src={resolveURI(metadata.image)}
              alt={metadata.name}
              fill
              className="rounded-md object-cover"
            />
          ) : (
            <Skeleton />
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        {metadata?.name ? (
          <CardTitle>{metadata.name}</CardTitle>
        ) : (
          <Skeleton />
        )}

        <Badge
          className="space-x-1"
          onClick={() => {
            navigator.clipboard.writeText(badge.id);
            toast("Badge ID copied to clipboard.");
          }}
        >
          <p>{addressSplitter(badge.id)}</p>
          <CopyIcon className="h-4 w-4" />
        </Badge>

        {metadata?.name ? (
          <CardDescription>{metadata.description}</CardDescription>
        ) : (
          <Skeleton />
        )}
      </CardFooter>
    </Card>
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
        <CreateBadgeDialog />
      </div>
    </div>
  );
}
