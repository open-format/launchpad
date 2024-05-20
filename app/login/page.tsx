import { Badge } from "@/components/ui/badge";
import getUserSession from "@/lib/getUserSession";
import Image from "next/image";
import { redirect } from "next/navigation";
import { LoginForm } from "./login-form";

export default async function LoginPage() {
  const {
    data: { user },
  } = await getUserSession();

  if (user) {
    return redirect("/home/apps");
  }
  return (
    <div className="w-full">
      <div className="fixed flex items-center justify-center lg:justify-start w-full gap-2 font-semibold p-4">
        <Image
          className="rounded-md"
          src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
          height={25}
          width={25}
          alt="hi"
        />
        <span>OPENFORMAT</span>
        <Badge>BETA</Badge>
      </div>
      <div className="lg:flex flex-col justify-between h-screen border-l p-5 text-center flex items-center space-y-2">
        <div className="space-y-2 my-24 flex flex-col justify-between">
          <h1 className="text-5xl">Welcome to the Launchpad</h1>
          <h3>
            The dashboard for the OPENFORMAT onchain rewards platform
          </h3>
          <LoginForm />
          <div className="py-6 text-left">
            {/* <p className="font-semibold">
              What you can do with the launchpad:
            </p> */}
            <ol className="space-y-4 py-4 list-disc mx-6">
              <li>
                <div>
                  Create and view apps
                  <p className="text-xs">
                    Create on-chain apps and XP tokens to reward XP to
                    your users.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  Generate an API Key
                  <p className="text-xs">
                    Create an API Key to interact with the OPENFORMAT
                    API and no-code nodes.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  Get your web3 account details
                  <p className="text-xs">
                    Web3 account generation, View your web3 account
                    address and export your private key to reward your
                    users.
                  </p>
                </div>
              </li>
              <li>
                <div>
                  Create and view badges
                  <p className="text-xs">
                    Create trophies and key to reward users or token
                    gate your applications.
                  </p>
                </div>
              </li>
            </ol>
          </div>
        </div>
        <div className="flex flex-col items-center space-x-2 m-3 justify-center max-w-prose">
          <blockquote className="space-y-2 text-center">
            <p className="text-lg">
              "Using OPENFORMAT to power our first Web3 enabled
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
