"use client";

import { buttonVariants } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { CoinsIcon, InfoIcon } from "lucide-react";
import Link from "next/link";
import ChainName from "./chain-name";

type Transaction = {
  id: number;
  app: string;
  chain: "arbitrum" | "polygon" | "arbitrumSepolia" | "polygonAmoy";
  type: string;
};

const TRANSACTIONS: Transaction[] = [
  {
    id: Math.random(),
    app: "REWARDLE",
    chain: "arbitrumSepolia",
    type: "Reward XP",
  },
  {
    id: Math.random(),
    app: "REWARDLE",
    chain: "arbitrumSepolia",
    type: "Create Badge",
  },
  {
    id: Math.random(),
    app: "REWARDLE",
    chain: "arbitrumSepolia",
    type: "Reward Badge",
  },
  {
    id: Math.random(),
    app: "REWARDLE",
    chain: "arbitrum",
    type: "Create Badge",
  },
  {
    id: Math.random(),
    app: "REWARDLE",
    chain: "arbitrum",
    type: "Reward Badge",
  },
];

export default function BillingTable() {
  return (
    <Table>
      <TableCaption>
        A list of your OPENFORMAT transactions.
      </TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[200px]">dApp</TableHead>
          <TableHead>Chain</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="flex items-center">
                  Used credits
                  <InfoIcon className="w-4 h-4 ml-2" />
                </TooltipTrigger>
                <TooltipContent className="max-w-[300px]">
                  <p>
                    Used credits refer to the amount of credits that
                    will be deducted from your credit balance for a
                    given transaction.
                  </p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {TRANSACTIONS.map((tx) => (
          <TableRow key={tx.id}>
            <TableCell className="font-medium">{tx.app}</TableCell>
            <TableCell>
              <Link
                href="https://sepolia.arbiscan.io"
                target="_blank"
              >
                <ChainName chain={tx.chain} />
              </Link>
            </TableCell>
            <TableCell>{tx.type}</TableCell>
            <TableCell>
              <div className="flex items-center font-bold opacity-20">
                0
                <CoinsIcon className="w-4 h-4 ml-1" />
              </div>
            </TableCell>
            <TableCell className="text-right">
              <Link
                className={buttonVariants()}
                href="https://sepolia.arbiscan.io/tx/0x335b536948c8cf908036c6fc2fb777b9d8844cb6be3bf81799685beafd5b73ae"
                target="_blank"
              >
                View
              </Link>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
