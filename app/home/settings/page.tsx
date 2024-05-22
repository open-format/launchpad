import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { trackEvent } from "@/lib/analytics";
import APIKeys from "./api-keys";
import Web3Account from "./web3-account";

export default function SettingsPage() {
  return (
    <div className="flex w-full flex-col space-y-5">
      <h1>Settings</h1>
      <Web3Account trackEvent={trackEvent} />
      <APIKeys trackEvent={trackEvent} />
      <Card>
        <CardHeader>
          <CardTitle>Account</CardTitle>
        </CardHeader>
        <CardContent>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant="destructive">Delete Account</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle className="flex items-center space-x-2">
                  <p>Delete Account</p>
                  <Badge>Coming soon</Badge>
                </AlertDialogTitle>
                <AlertDialogDescription>
                  If you wish to delete your account, please reach out
                  to us through our support channels. We're working on
                  implementing an automatic deletion feature. Thank
                  you for your patience.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogAction>Continue</AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardContent>
      </Card>
    </div>
  );
}
