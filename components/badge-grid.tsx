"use client";

import { addressSplitter } from "@/lib/utils";
import { AspectRatio } from "@radix-ui/react-aspect-ratio";
import { CopyIcon } from "lucide-react";
import Image from "next/image";
import { toast } from "sonner";
import { Badge } from "./ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardTitle,
} from "./ui/card";

const BADGES = [
  {
    id: "0xCA3E55975Da462B21b050a5b0F6eEEe24C11158D",
    name: "Badge 1",
    description: "The description of the badge",
    image: "https://i.ibb.co/hcCWWyT/nasa-r-TZW4f02z-Y8-unsplash.jpg",
  },
  {
    id: "0xCA3E55975Da462B21b050a5b0F6eEEe24C11158E",
    name: "Badge 2",
    description: "The description of the badge",
    image: "https://i.ibb.co/hcCWWyT/nasa-r-TZW4f02z-Y8-unsplash.jpg",
  },
  {
    id: "0xCA3E55975Da462B21b050a5b0F6e4se24C11158D",
    name: "Badge 3",
    description: "The description of the badge",
    image: "https://i.ibb.co/hcCWWyT/nasa-r-TZW4f02z-Y8-unsplash.jpg",
  },
  {
    id: "0xCA3E55975Da462B21bf50a5b0F6e4se24C11158D",
    name: "Badge 4",
    description: "The description of the badge",
    image: "https://i.ibb.co/hcCWWyT/nasa-r-TZW4f02z-Y8-unsplash.jpg",
  },
];

export default function BadgeGrid() {
  return (
    <div className="grid grid-cols-1 gap-3 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {BADGES.map((badge) => (
        <Item key={badge.id} badge={badge} />
      ))}
    </div>
  );
}

function Item({ badge }: { badge: any }) {
  return (
    <Card>
      <CardContent className="mt-5">
        <AspectRatio ratio={1} className="bg-muted">
          <Image
            src={badge.image}
            alt="Photo by Drew Beamer"
            fill
            className="rounded-md object-cover"
          />
        </AspectRatio>
      </CardContent>
      <CardFooter className="flex flex-col items-start space-y-2">
        <CardTitle>{badge.name}</CardTitle>

        <Badge
          className="space-x-1"
          onClick={() => toast("Badge ID copied to clipboard.")}
        >
          <p>{addressSplitter(badge.id)}</p>
          <CopyIcon className="h-4 w-4" />
        </Badge>

        <CardDescription>{badge.description}</CardDescription>
      </CardFooter>
    </Card>
  );
}
