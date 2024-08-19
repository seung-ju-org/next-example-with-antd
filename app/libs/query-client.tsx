import React from 'react';
import {
  DefaultError,
  dehydrate,
  FetchQueryOptions,
  HydrationBoundary,
  QueryClient,
  QueryKey,
} from '@tanstack/react-query';

export const getQueryClient = React.cache(
  () =>
    new QueryClient({
      defaultOptions: {
        queries: {
          retry: false,
          staleTime: 1000 * 60,
          refetchOnWindowFocus: false,
          refetchOnMount: true,
          refetchOnReconnect: false,
        },
      },
    }),
);

export function dehydrateQuery<
  TQueryFnData = unknown,
  TError = DefaultError,
  TData = TQueryFnData,
  TQueryKey extends QueryKey = QueryKey,
>(
  options: FetchQueryOptions<TQueryFnData, TError, TData, TQueryKey>,
): Promise<void> {
  return getQueryClient().prefetchQuery(options);
}

export function getDehydratedState() {
  return dehydrate(getQueryClient(), {
    shouldDehydrateQuery: () => true,
  });
}

export interface HydrateProps {
  children?: React.ReactNode;
}

export default function Hydrate({ children }: HydrateProps): React.ReactNode {
  return (
    <HydrationBoundary state={getDehydratedState()}>
      {children}
    </HydrationBoundary>
  );
}
