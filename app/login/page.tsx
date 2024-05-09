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
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="fixed flex items-center justify-center lg:justify-start w-full gap-2 font-semibold p-4">
        <Image
          className="rounded-md"
          src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
          height={25}
          width={25}
          alt="hi"
        />
        <span>OPENFORMAT</span>
      </div>
      <div className="hidden bg-muted lg:flex flex-col justify-between h-screen border-l p-5">
        <div className="space-y-2 my-24">
          <h1 className="text-5xl max-w-[400px]">
            Welcome to the Launchpad 🚀
          </h1>
          <h3>The no-code blockchain rewards platform.</h3>
        </div>
        <div className="flex flex-col items-center space-x-2 m-3 justify-center">
          <blockquote className="space-y-2 text-left">
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
      <div className="flex items-center justify-center py-12 text-center">
        <div className="mx-auto grid w-[350px] gap-6">
          <div>
            <h1 className="text-3xl font-bold">Welcome</h1>
            <h2 className="text-sm font-medium text-muted-foreground">
              Sign in to your account
            </h2>
          </div>
          <LoginForm />
        </div>
      </div>
    </div>
  );
}
