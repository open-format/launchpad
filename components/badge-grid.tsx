"use client";

import CreateBadgeDialog from "@/app/home/apps/[id]/create-badge";
import { addressSplitter } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import {
  TooltipContent,
  TooltipTrigger,
} from "@radix-ui/react-tooltip";
import { CopyIcon, InfoIcon } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { toast } from "sonner";
import { createThirdwebClient } from "thirdweb";
import { download } from "thirdweb/storage";
import emptyBadgeImage from "../images/superdev.png";
import { Badge } from "./ui/badge";
import { Card, CardContent, CardFooter, CardTitle } from "./ui/card";
import { Skeleton } from "./ui/skeleton";
import { Tooltip, TooltipProvider } from "./ui/tooltip";

const client = createThirdwebClient({
  clientId: process.env.NEXT_PUBLIC_THIRDWEB_CLIENT!,
});

export default function BadgeGrid({
  badges,
  trackEvent,
}: {
  badges: Badge[] | undefined;
  trackEvent: TrackEventFunction;
}) {
  if (!badges || !badges.length) {
    return <EmptyState />;
  }
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3">
      {badges.map((badge) => (
        <Item
          key={badge.id}
          badge={badge}
          metadataURI={badge.metadataURI}
        />
      ))}
    </div>
  );
}

function Item({
  badge,
  metadataURI,
}: {
  badge: any;
  metadataURI: string;
}) {
  const [metadata, setMetadata] = useState<any>(null);
  const [image, setImage] = useState<any>(null);
  const [oldBadge, setOldBadge] = useState<any>(null);

  useEffect(() => {
    async function fetchMetadata() {
      if (!metadataURI) {
        setOldBadge(true);
      }
      try {
        const response = await download({ client, uri: metadataURI });
        const data = await response.json();
        setMetadata(data);
        const file = await download({ client, uri: data.image });
        setImage(file.url);
      } catch (error) {
        console.error("Error fetching metadata:", error);
      }
    }

    fetchMetadata();
  }, [metadataURI]);

  return (
    <Card>
      <CardContent className="mt-5">
        <AspectRatio ratio={1 / 1.2} className="bg-muted rounded-md">
          {image ? (
            <Image
              src={image}
              alt={metadata?.name}
              fill
              className="rounded-md object-cover"
            />
          ) : oldBadge ? (
            <div className="text-sm rounded-md items-center justify-center flex text-center p-2 h-full">
              This is a v1 badge, which does not have an image. All
              new badges include on-chain images.
            </div>
          ) : (
            <Skeleton />
          )}
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-4">
        {metadata?.name ? (
          <CardTitle>{metadata.name}</CardTitle>
        ) : badge.name ? (
          <CardTitle>{badge.name}</CardTitle>
        ) : (
          <Skeleton />
        )}
        <div className="flex justify-between w-full">
          {metadata?.type && (
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="font-semibold">
                      Type <InfoIcon className="h-4 w-4 ml-1" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Type of badge</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div className="flex items-center space-x-1">
                <p>{metadata.type}</p>
              </div>
            </div>
          )}

          {badge?.id && (
            <div>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <Badge className="font-semibold">
                      Badge ID <InfoIcon className="h-4 w-4 ml-1" />
                    </Badge>
                  </TooltipTrigger>
                  <TooltipContent>Type of badge</TooltipContent>
                </Tooltip>
              </TooltipProvider>
              <div
                onClick={() => {
                  navigator.clipboard.writeText(badge.id);
                  toast("Badge ID copied to clipboard.");
                }}
              >
                <div className="flex items-center space-x-1">
                  <p>{addressSplitter(badge.id)}</p>
                  <CopyIcon className="hover:text-muted-foreground h-4 w-4" />
                </div>
              </div>
            </div>
          )}
        </div>

        {metadata?.description && (
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Badge className="font-semibold">
                    Description <InfoIcon className="h-4 w-4 ml-1" />
                  </Badge>
                </TooltipTrigger>
                <TooltipContent>Badge Description</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <div className="flex items-center space-x-1">
              <p>{metadata.description}</p>
            </div>
          </div>
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
