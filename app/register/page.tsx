import { buttonVariants } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { GitHubLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";

export default function RegisterPage() {
  return (
    <div className="w-full lg:grid lg:min-h-[600px] lg:grid-cols-2 xl:min-h-[800px]">
      <div className="flex items-center justify-center py-12">
        <div className="mx-auto grid w-[350px] gap-6">
          <div>
            <h1 className="text-3xl font-bold">Register</h1>
            <h2 className="text-sm font-medium text-muted-foreground">
              Create a new account
            </h2>
          </div>
          <Link
            className={buttonVariants()}
            href="/onboarding/create-account"
          >
            <GitHubLogoIcon className="mr-2" />
            Continue with Github
          </Link>
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-strong"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="bg-background px-2 text-sm text-muted-foreground">
                OR
              </span>
            </div>
          </div>

          <div className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="m@example.com"
                required
              />
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="terms" />
              <label
                htmlFor="terms"
                className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              >
                Sign up to product updates
              </label>
            </div>
            <Link
              className={buttonVariants()}
              href="/onboarding/create-account"
            >
              Register
            </Link>
          </div>
          <div className="my-8 self-center text-sm text-center">
            <span className="text-foreground-light">
              Have an account?
            </span>{" "}
            <Link
              className="underline text-foreground hover:text-foreground-light transition"
              href="/login"
            >
              Sign In Now
            </Link>
          </div>
        </div>
      </div>
      <div className="hidden bg-muted lg:flex h-screen items-end border-l ">
        <div className="flex items-center space-x-2 m-3 justify-center p-5">
          <blockquote className="space-y-2 text-right">
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
