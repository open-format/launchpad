"use client";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import Link from "next/link";
import { useAccount } from "wagmi";
import ChainName from "./chain-name";
import { buttonVariants } from "./ui/button";
import ValueBox from "./value-box";

type App = {
  id: string;
  name: string;
  createdAt: string;
};

interface AppTableProps {
  apps: App[];
}

const GET_APPS = gql`
  query getAppsByUser($user: String!) {
    apps(
      where: { owner_contains_nocase: $user }
      orderBy: createdAt
      orderDirection: desc
    ) {
      id
      name
      createdAt
    }
  }
`;

const fetcher = async (query, variables) => {
  const data = await request<AppData>(
    process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    query,
    { user: variables.user_address }
  );

  return data;
};

export const useGraphQLQuery = (queryKey, query, variables) => {
  return useQuery({
    queryKey,
    queryFn: () => fetcher(query, variables),
  });
};

export default function AppTable() {
  const { address } = useAccount();
  const { data, error, isLoading } = useGraphQLQuery(
    ["getUsers"],
    GET_APPS,
    {
      user_address: address,
    }
  );

  if (isLoading) {
    return <div>loading apps...</div>;
  }
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
        {data.apps &&
          data.apps.map((app, i) => (
            <TableRow key={i}>
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
              <TableCell className="hidden lg:block">
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
