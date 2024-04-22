"use client";
import { Button, buttonVariants } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import ValueBox from "@/components/value-box";
import { URLS } from "@/lib/constants";
import { cn } from "@/lib/utils";
import { ReloadIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useState } from "react";

export default function Create() {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [keys, setKeys] = useState<boolean>(false);

  function createAccount() {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setKeys(true);
    }, 3000);
  }
  return (
    <div className="flex flex-col items-center justify-center space-y-5">
      {keys ? (
        <Card>
          <CardHeader>
            <CardTitle>Your Account Keys</CardTitle>
            <CardDescription>
              Keep these keys safe. You can use them in the API or in
              the SDK. Access to these values is exclusive to you;
              your private key is visible only with your password.
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div>
              <Label>Public Key</Label>
              <ValueBox
                value="0xsrt45tfn45ufgnerferferyg453tf3r"
                copyText="Public key copied to clipboard."
              />
            </div>
            <div>
              <Label>Private Key</Label>
              <ValueBox
                value="0x235rc34retunf354crtcf54rtcr45rt"
                copyText="Private key copied to clipboard."
              />
            </div>
            <div>
              <Label>Recovery Phrase</Label>
              <Textarea>
                renew below major witness ready sheriff whisper cattle
                dinosaur correct couch infant hour lecture write
              </Textarea>
              <p className={cn("text-sm text-destructive")}>
                This recovery phrase is crucial—it's your lifeline for
                account recovery if your password is ever forgotten.
              </p>
            </div>
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              className={buttonVariants({ variant: "outline" })}
              href={URLS.docs}
              target="_blank"
            >
              View Docs
            </Link>
            <Link className={buttonVariants()} href="/home/apps">
              Continue
            </Link>
          </CardFooter>
        </Card>
      ) : (
        <>
          <Card>
            <CardHeader>
              <CardTitle>Create your web3 account</CardTitle>
              <CardDescription>
                You'll need a Web3 account to use OPENFORMAT. We can
                set one up for you, but you'll have to secure it
                yourself. OPENFORMAT doesn't store your password, so
                it can't be recovered by us.
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form>
                <div className="grid w-full items-center gap-4">
                  <div className="flex flex-col space-y-1.5">
                    <Label htmlFor="name">Password</Label>
                    <Input
                      type="password"
                      id="password"
                      autoComplete="password"
                      placeholder="Enter password"
                    />
                  </div>
                </div>
              </form>
            </CardContent>
            <CardFooter className="flex justify-between">
              <Link
                className={buttonVariants({ variant: "outline" })}
                href={URLS.docs}
                target="_blank"
              >
                Learn More
              </Link>
              {isLoading ? (
                <Button disabled>
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creating web3 account
                </Button>
              ) : (
                <Button onClick={createAccount}>
                  Create web3 account
                </Button>
              )}
            </CardFooter>
          </Card>
          <Link href="/home/apps">Skip</Link>
        </>
      )}
    </div>
  );
}
