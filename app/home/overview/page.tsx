import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

const ITEMS = [
  {
    title: "Create and view dApps",
    description:
      "Create onchain dApps and XP tokens to engage and reward your users",
    href: "/home/apps",
  },
  {
    title: "Generate an API key",
    description:
      "Generate an API key to interact with the OPENFORMAT API",
    href: "/home/settings",
  },
  {
    title: "Get your web3 account details",
    description:
      "Set up a web3 account, view your public key, and export your private key to reward users from your dApps",
    href: "/home/settings",
  },
  {
    title: "Create and View Badges",
    description:
      "Create trophies and keys in your dApps to reward users or token-gate your applications",
  },
];

export default function Overview() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Follow the instructions below to create an on-chain reward
            system in minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge>
            Estimated setup time:
            <span className="font-bold ml-1">6 minutes</span>
          </Badge>
          <ol className="space-y-4 py-4 px-6 list-disc">
            {ITEMS.map((item, i) => (
              <li key={i}>
                {item.href ? (
                  <Link href={item.href}>
                    <div>
                      <h3 className="hover:text-muted-foreground">
                        <strong className="flex items-center">
                          {item.title}{" "}
                          <ArrowRightCircleIcon className="ml-2" />
                        </strong>
                      </h3>
                      <p className="text-muted-foreground">
                        {item.description}
                      </p>
                    </div>
                  </Link>
                ) : (
                  <div>
                    <h3>
                      <strong className="flex items-center">
                        {item.title}
                      </strong>
                    </h3>
                    <p className="text-muted-foreground">
                      {item.description}
                    </p>
                  </div>
                )}
              </li>
            ))}
          </ol>
        </CardContent>
      </Card>
    </div>
  );
}
