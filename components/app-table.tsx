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
import Link from "next/link";
import ChainName from "./chain-name";
import ValueBox from "./value-box";

export default function AppTable() {
  return (
    <Table>
      <TableCaption>A list of your created apps.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Chain</TableHead>
          <TableHead className="hidden lg:block">App ID</TableHead>
          <TableHead className="text-right sr-only">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">REWARDLE</TableCell>
          <TableCell>
            <Link
              href="https://sepolia.arbiscan.io/address/0x16BB52a951e3DD1D2CdB95b1A70C2B05Ce1E4Cee"
              target="_blank"
            >
              <ChainName chain="arbitrumSepolia" />
            </Link>
          </TableCell>
          <TableCell className="hidden lg:block">
            <ValueBox
              basic
              value="0x3BAf984d4684c9d0a78842B5ff59D74638DfC86d"
              copyText="App ID copied to clipboard."
            />
          </TableCell>
          <TableCell className="text-right">
            <Link className={buttonVariants()} href="apps/123">
              View
            </Link>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell className="font-medium">QUIZ APP</TableCell>
          <TableCell>
            <Link
              href="https://polygonscan.com/address/0x16BB52a951e3DD1D2CdB95b1A70C2B05Ce1E4Cee"
              target="_blank"
            >
              <ChainName chain="polygon" />
            </Link>
          </TableCell>
          <TableCell className="hidden lg:block">
            <ValueBox
              basic
              value="0xaf28A27d7201c93BD19ECf936fA290f39f23A06e"
              copyText="App ID copied to clipboard."
            />
          </TableCell>
          <TableCell className="text-right">
            <Link className={buttonVariants()} href="apps/123">
              View
            </Link>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}
