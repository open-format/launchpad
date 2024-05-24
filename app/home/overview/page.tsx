import GetStarted from "@/components/get-started";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";

const ITEMS = [
  {
    title: "Create and View Apps",
    description:
      "Create onchain apps and XP tokens to reward your users.",
    href: "/home/apps",
  },
  {
    title: "Generate an API Key",
    description:
      "Create an API key to interact with the OPENFORMAT API and no-code nodes.",
    href: "/home/settings",
  },
  {
    title: "Get Your Web3 Account Details",
    description:
      "Generate a Web3 account, view your account address, and export your private key to reward your users.",
    href: "/home/settings",
  },
  {
    title: "Create and View Badges",
    description:
      "Create trophies and keys to reward users or token-gate your applications.",
  },
  {
    title: "Mission Builder",
    description: "Create missions in your applications.",
    comingSoon: true,
  },
];

export default function Overview() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            This section demonstrates what you can do here, why you
            want to do it, and provides direct links to relevant
            destinations.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge>
            Estimated setup time:
            <span className="font-bold ml-1">3 minutes</span>
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
                  <div
                    className={cn({ "opacity-50": item.comingSoon })}
                  >
                    <h3>
                      <strong className="flex items-center">
                        {item.title}
                        {item.comingSoon && (
                          <Badge className="ml-2">coming soon</Badge>
                        )}
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
      <GetStarted />
    </div>
  );
}
