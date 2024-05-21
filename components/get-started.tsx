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
import { useEffect, useState } from "react";
import { AspectRatio } from "./ui/aspect-ratio";

type Item = {
  title: string;
  description: string;
  href: string;
};

export default function GetStarted() {
  const [isVisible, setIsVisible] = useState<boolean>(true);

  useEffect(() => {
    if (localStorage.getItem("showGetStarted") === "false") {
      setIsVisible(false);
    }
  }, []);

  function hide() {
    localStorage.setItem("showGetStarted", "false");
    setIsVisible(false);
  }

  if (typeof window === "undefined") {
    return null;
  }

  const ITEMS: Item[] = [
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
      {isVisible && (
        <div className="border rounded-md p-4">
          <div className="flex justify-between items-center">
            <h2>Your first week in OPENFORMAT</h2>
            <X onClick={hide} />
          </div>
          <div className="grid w-full gap-5 md:grid-cols-2 lg:grid-cols-3 px-12">
            {ITEMS.map((item, i) => (
              <GridItem key={i} item={item} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

function GridItem({ item }: { item: Item }) {
  return (
    <Card className="hover:bg-secondary/80 border-none">
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
