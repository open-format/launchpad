import { Badge } from "@/components/ui/badge";
import { trackEvent } from "@/lib/analytics";
import Image from "next/image";
import { LoginForm } from "./login-form";

const ITEMS = [
  {
    title: "Create and View Apps",
    description:
      "Create onchain apps and XP tokens to reward your users.",
  },
  {
    title: "Generate an API Key",
    description:
      "Create an API key to interact with the OPENFORMAT API and no-code nodes.",
  },
  {
    title: "Get Your Web3 Account Details",
    description:
      "Generate a Web3 account, view your account address, and export your private key to reward your users.",
  },
  {
    title: "Create and View Badges",
    description:
      "Create trophies and keys to reward users or token-gate your applications.",
  },
];

export default async function LoginPage() {
  return (
    <div className="flex flex-col h-screen p-2">
      <header className="flex items-center justify-center lg:justify-start w-full gap-2 font-semibold p-4">
        <Image
          className="rounded-md"
          src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
          height={25}
          width={25}
          alt="hi"
        />
        <span>OPENFORMAT</span>
        <Badge>BETA</Badge>
      </header>
      <div className="max-w-prose mx-auto flex flex-col items-between justify-between h-full">
        <div className="text-center space-y-2 mt-4">
          <h1 className="text-5xl">Welcome to the Launchpad</h1>
          <h2>
            The dashboard for the OPENFORMAT onchain rewards platform
          </h2>
        </div>
        <LoginForm trackEvent={trackEvent} />

        <div className="text-left px-1">
          <h3>Features:</h3>
          <ol className="space-y-4 py-4 px-6 list-disc">
            {ITEMS.map((item, i) => {
              return (
                <li>
                  <div>
                    <h3>
                      <strong>{item.title}</strong>
                    </h3>
                    <p>{item.description}</p>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
        <div>
          <blockquote className="space-y-2 text-center">
            <p className="text-muted-foreground">
              "Using OPENFORMAT to power our first web3 enabled
              project took all of the hassle out of dealing with smart
              contracts and got us up and running much quicker"
            </p>
            <footer className="text-sm font-semibold">
              Jack - Developer
            </footer>
          </blockquote>
        </div>
      </div>
    </div>
  );
}
