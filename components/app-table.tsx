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
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import Link from "next/link";
import ChainName from "./chain-name";
import { buttonVariants } from "./ui/button";
import { Skeleton } from "./ui/skeleton";
import ValueBox from "./value-box";

type App = {
  id: string;
  name: string;
  createdAt: string;
};

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

const fetcher = async (
  query: any,
  variables: Record<string, string>
) => {
  const data = await request<AppData>(
    process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    query,
    { user: variables.user_address }
  );

  return data;
};

export const useGraphQLQuery = (
  queryKey: string[],
  query: any,
  variables: Record<string, string>
) => {
  return useQuery({
    queryKey,
    queryFn: () => fetcher(query, variables),
  });
};

interface AppTableProps {
  trackEvent: TrackEventFunction;
}

export default function AppTable({ trackEvent }: AppTableProps) {
  const { user } = usePrivy();
  const address = user?.wallet?.address;

  if (!address) {
    return null;
  }

  const { data } = useGraphQLQuery(["getApps"], GET_APPS, {
    user_address: address,
  });

  function handleClick(appName: string) {
    trackEvent({
      event_name: "View App",
      event_meta: { name: appName },
    });
  }

  return (
    <Table>
      <TableCaption>A list of your created apps.</TableCaption>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Chain</TableHead>
          <TableHead className="hidden xl:block">App ID</TableHead>
          <TableHead className="text-right sr-only">View</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {data?.apps ? (
          data?.apps.map((app, i) => (
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
                  trackEvent={{
                    fn: trackEvent,
                    event_name: "dApp ID",
                  }}
                  basic
                  label="dApp ID"
                  value={app.id}
                  copyText="dApp ID copied to clipboard."
                />
              </TableCell>
              <TableCell className="text-right">
                <Link
                  className={buttonVariants()}
                  href={`apps/${app.id}`}
                  onClick={() => handleClick(app.name)}
                >
                  View
                </Link>
              </TableCell>
            </TableRow>
          ))
        ) : (
          <TableRow>
            {new Array(3).fill("").map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-[25px] w-full" />
              </TableCell>
            ))}
          </TableRow>
        )}
      </TableBody>
    </Table>
  );
}
