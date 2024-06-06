"use client";

import CreateAppDialog from "@/app/home/apps/create/create-app";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { usePrivy } from "@privy-io/react-auth";
import { useQuery } from "@tanstack/react-query";
import request, { gql } from "graphql-request";
import Image from "next/image";
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

  const { data, isLoading } = useGraphQLQuery(["getApps"], GET_APPS, {
    user_address: address,
  });

  function handleClick(appName: string) {
    trackEvent({
      event_name: "View dApp",
      event_meta: { name: appName },
    });
  }

  if (isLoading) {
    return <LoadingState />;
  }

  if (!data?.apps || !data.apps.length) {
    return <EmptyState trackEvent={trackEvent} />;
  }

  return (
    <div className="flex justify-between flex-col">
      <div className="flex justify-between items-center">
        <h1>dApps</h1>
        <CreateAppDialog trackEvent={trackEvent} />
      </div>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead className="hidden lg:table-cell">
              dApp ID
            </TableHead>
            <TableHead className="text-right sr-only">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {data?.apps &&
            data?.apps.map((app, i) => (
              <TableRow key={i}>
                <TableCell>{app.name}</TableCell>
                <TableCell>
                  {/* @DEV as we support more blockchains, the correct chain will need to be displayed here. */}
                  <Link
                    href="https://sepolia.arbiscan.io"
                    target="_blank"
                  >
                    <ChainName chain="arbitrumSepolia" />
                  </Link>
                </TableCell>
                <TableCell className="hidden lg:table-cell">
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
            ))}
        </TableBody>
      </Table>
    </div>
  );
}

function EmptyState({
  trackEvent,
}: {
  trackEvent: TrackEventFunction;
}) {
  return (
    <div className="flex justify-between flex-col">
      <h1>dApps</h1>
      <div className="flex flex-col justify-center items-center">
        <div className="w-[350px] text-center flex items-center justify-center flex-col space-y-4">
          <Image
            src="https://avatars.githubusercontent.com/u/121942809?s=200&v=4"
            alt="Tree Planting Badge"
            width={125}
            height={125}
            className="object-cover rounded-lg"
          />
          <p className="text-muted-foreground pb-2">
            Create your first onchain app to start rewarding your
            users with XP and badges.
          </p>
          <CreateAppDialog trackEvent={trackEvent} />
        </div>
      </div>
    </div>
  );
}

function LoadingState() {
  return (
    <div className="flex justify-between flex-col">
      <h1>dApps</h1>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Chain</TableHead>
            <TableHead className="hidden lg:table-cell">
              dApp ID
            </TableHead>
            <TableHead className="text-right sr-only">View</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <TableRow>
            {new Array(3).fill("").map((_, i) => (
              <TableCell key={i}>
                <Skeleton className="h-[25px] w-full" />
              </TableCell>
            ))}
          </TableRow>
        </TableBody>
      </Table>
    </div>
  );
}
