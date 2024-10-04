import { useQuery } from "@tanstack/react-query";
import request from "graphql-request";

const fetcher = async <T>(
  query: any,
  variables: Record<string, string>
) => {
  const data = await request<T>(
    process.env.NEXT_PUBLIC_SUBGRAPH_URL!,
    query,
    variables
  );

  return data;
};

export const useGraphQLQuery = <T>(
  queryKey: string[],
  query: any,
  variables: Record<string, string>
) => {
  return useQuery({
    queryKey,
    queryFn: () => fetcher<T>(query, variables),
  });
};
