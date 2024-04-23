import BillingTable from "@/components/billing-table";
import { Badge } from "@/components/ui/badge";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { URLS } from "@/lib/constants";
import { InfoIcon } from "lucide-react";

export default function BillingPage() {
  return (
    <div className="space-y-5">
      <div className="flex space-y-5 flex-col">
        <div className="flex space-x-2 items-center">
          <h1>Billing</h1>
          <Badge>Coming soon</Badge>
        </div>
        <p>
          We working hard on our decentralised billing system. We will
          notified you when we're ready.
        </p>
        <div className="grid grid-cols-4">
          <div>
            <div className="flex space-x-1">
              <p className="opacity-20">Credit Balance</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p>
                      Your credit balance will be consumed as you use
                      OPENFORMAT.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h2 className="opacity-20">$0</h2>
          </div>
          <div>
            <div className="flex space-x-1">
              <p className="opacity-20">Rewarded Credits</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p>
                      We reward our users for using OPENFORMAT. These
                      rewards will be periodically added to your
                      credit balance.
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h2 className="opacity-20">$0</h2>
          </div>
          <div>
            <div className="flex space-x-1">
              <p className="opacity-20">Contributed Value</p>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger>
                    <InfoIcon className="w-4 h-4" />
                  </TooltipTrigger>
                  <TooltipContent className="max-w-[300px]">
                    <p>
                      By using OPENFORMAT, you're supporting good
                      causes. This total shows the credit you've
                      directly contributed.{" "}
                      <a
                        className="font-semibold underline"
                        href={URLS.docs}
                      >
                        Learn more.
                      </a>
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
            <h2 className="opacity-20">$0</h2>
          </div>
        </div>
      </div>
      <div>
        <h2>Usage</h2>
        <BillingTable />
      </div>
    </div>
  );
}
