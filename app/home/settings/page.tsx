"use client";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import ValueBox from "@/components/value-box";
import { EyeIcon, EyeOffIcon, RefreshCcw } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

export default function SettingsPage() {
  const [showKey, setShowKey] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [isAPIKeyModalOpen, setAPIKeyIsModalOpen] =
    useState<boolean>(false);
  const [apiKey, setApiKey] = useState<boolean>();

  function revealKey() {
    setShowKey(true);
    setIsModalOpen(false);
  }

  function createApiKey() {
    setAPIKeyIsModalOpen(true);
    setApiKey(true);
  }

  return (
    <div className="flex w-full flex-col space-y-5">
      <h1>Settings</h1>
      <Card>
        <CardHeader>
          <CardTitle>Web3 Account</CardTitle>
          <CardDescription>
            Here is your web3 account. It's used to do transactions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <Label>Public Key</Label>
          <ValueBox
            value="0x1356y576gyf45tc45e"
            copyText="Public Key copied to clipboard."
          />
          <Label>Private Key</Label>
          <div className="flex space-x-2 flex-1">
            <ValueBox
              value={showKey ? "0xs1234543t435retfw34e" : "*********"}
            />
            <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
              <DialogTrigger>
                <Button>
                  {showKey ? (
                    <EyeOffIcon className="w-4 h-6" />
                  ) : (
                    <EyeIcon className="w-4 h-4" />
                  )}
                </Button>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Reveal Private Key</DialogTitle>
                  <DialogDescription>
                    Please enter your password for your web3 account.
                  </DialogDescription>
                </DialogHeader>
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
                <Button onClick={revealKey}>Submit</Button>
              </DialogContent>
            </Dialog>
          </div>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>API Keys</CardTitle>
          <CardDescription>Manage your API Keys</CardDescription>
        </CardHeader>
        <CardContent>
          {apiKey ? (
            <>
              <Label>API Key</Label>
              <div className="flex space-x-2">
                <ValueBox value="*********" />
                <Button onClick={createApiKey}>
                  <RefreshCcw className="w-4 h-4 " />
                </Button>
              </div>
            </>
          ) : (
            <>
              <Button onClick={createApiKey}>Create API Key</Button>
            </>
          )}
          <Dialog
            open={isAPIKeyModalOpen}
            onOpenChange={setAPIKeyIsModalOpen}
          >
            <DialogContent>
              <DialogHeader>
                <DialogTitle>API Key</DialogTitle>
                <DialogDescription>
                  Use this key to interact with the OPENFORMAT API.
                  You will only see this key once.
                </DialogDescription>
              </DialogHeader>
              <ValueBox
                value="d34rferwrtx34-f4wrxn34-cerwfxw"
                copyText="API Key copied to clipboard."
              />
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <Dialog>
            <DialogTrigger>
              <Button variant="destructive">Delete Account</Button>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>Are you absolutely sure?</DialogTitle>
                <DialogDescription>
                  This action cannot be undone. This will permanently
                  delete your account and remove your data from our
                  servers.
                </DialogDescription>
              </DialogHeader>
              <Link href="/">
                <Button variant="destructive">Delete Account</Button>
              </Link>
            </DialogContent>
          </Dialog>
        </CardContent>
      </Card>
    </div>
  );
}
