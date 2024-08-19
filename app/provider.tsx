'use client';

import React from 'react';
import { App, ConfigProvider } from 'antd';
import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AntdRegistry } from '@ant-design/nextjs-registry';

export interface ProviderProps {
  children?: React.ReactNode;
}

export default function Provider({ children }: ProviderProps) {
  const [queryClient] = React.useState(
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

  return (
    <QueryClientProvider client={queryClient}>
      <AntdRegistry>
        <ConfigProvider>
          <App>{children}</App>
        </ConfigProvider>
      </AntdRegistry>
      <ReactQueryDevtools />
    </QueryClientProvider>
  );
}
