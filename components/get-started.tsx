"use client";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { X } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { AspectRatio } from "./ui/aspect-ratio";

interface GetStartedProps {
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}

export default function GetStarted({
  isOpen,
  setIsOpen,
}: GetStartedProps) {
  const ITEMS = [
    {
      title: "First day with Buildship",
      description:
        "Building a No-Code Web3 Application in 5 Hours Using BuildShip and OPENFORMAT",
      href: "https://buildship.com/case-studies/building-a-complex-web3-application-using-no-code-with-buildship",
    },
    {
      title: "Second day",
      description:
        "Building a No-Code Web3 Application in 5 Hours Using BuildShip and OPENFORMAT",
      href: "https://buildship.com/case-studies/building-a-complex-web3-application-using-no-code-with-buildship",
    },
    {
      title: "Third day with Buildship",
      description:
        "Building a No-Code Web3 Application in 5 Hours Using BuildShip and OPENFORMAT",
      href: "https://buildship.com/case-studies/building-a-complex-web3-application-using-no-code-with-buildship",
    },
  ];
  return (
    <div className="space-y-2">
      <div className="flex justify-between items-center">
        <h2>Your first week in OPENFORMAT</h2>
        <X onClick={() => setIsOpen(false)} />
      </div>
      <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3">
        {ITEMS.map((item, i) => (
          <GridItem key={i} item={item} />
        ))}
      </div>
    </div>
  );
}

function GridItem({
  item,
}: {
  item: { title: string; href: string }[];
}) {
  return (
    <Card className="hover:bg-secondary/80">
      <Link href={item.href}>
        <CardHeader>
          <CardTitle>{item.title}</CardTitle>
          <CardDescription>{item.description}</CardDescription>
        </CardHeader>
        <CardContent>
          <AspectRatio>
            <Image
              src="https://framerusercontent.com/images/QyfMGJZASgeeUmBqq9w38kOnY.webp"
              alt="Image"
              className="rounded-md object-cover"
              fill
            />
          </AspectRatio>
        </CardContent>
      </Link>
    </Card>
  );
}
