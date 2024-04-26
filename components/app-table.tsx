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

type App = {
  id: string;
  name: string;
  createdAt: string;
};

interface AppTableProps {
  apps: App[];
}

export default function AppTable({ apps }: AppTableProps) {
  if (!apps) {
    return <div>No apps found.</div>;
  }
  return (
    <Table>
      <TableCaption>A list of your created apps.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Name</TableHead>
          <TableHead>Chain</TableHead>
          <TableHead>App ID</TableHead>
          <TableHead className="text-right sr-only">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {apps &&
          apps.map((app) => (
            <TableRow>
              <TableCell className="font-medium">
                {app.name}
              </TableCell>
              <TableCell>
                {/* @DEV as we support more blockchains, the correct chain will need to be displayed here. */}
                <Link
                  href="https://sepolia.arbiscan.io"
                  target="_blank"
                >
                  <ChainName chain="arbitrumSepolia" />
                </Link>
              </TableCell>
              <TableCell>
                <ValueBox
                  basic
                  value={app.id}
                  copyText="App ID copied to clipboard."
                />
              </TableCell>
              <TableCell className="text-right">
                <Link
                  className={buttonVariants()}
                  href={`apps/${app.id}`}
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
