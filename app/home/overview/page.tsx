import AppTable from "@/components/app-table";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import { ArrowRightCircleIcon } from "lucide-react";
import Link from "next/link";
import CreateAppDialog from "../apps/create/create-app";

const ITEMS = [
  {
    title: "Create your first dApp below",
    description:
      "Create onchain dApps, XP tokens, and credit tokens to engage and reward your users",
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
      <h1>Home</h1>
      <Card className="border-none">
        <CardHeader>
          <CardTitle>Get Started</CardTitle>
          <CardDescription>
            Follow the instructions below to create an onchain reward
            system in minutes.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-2">
          <Badge>
            Estimated setup time:
            <span className="font-bold ml-1">6 minutes</span>
          </Badge>
          <ol className="space-y-4 py-4 px-6 list-decimal">
            {ITEMS.map((item, i) => (
              <li key={i}>
                {item.href ? (
                  <Link href={item.href}>
                    <div>
                      <h3 className="hover:underline">
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

      <Card className="border-0">
        <CardHeader>
          <CardTitle className="flex items-center justify-between w-full">
            <span>dApps</span>
            <CreateAppDialog trackEvent={trackEvent} />
          </CardTitle>
        </CardHeader>
        <CardContent>
          <AppTable trackEvent={trackEvent} />
        </CardContent>
      </Card>
    </div>
  );
}
