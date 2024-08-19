'use client';

import React from 'react';
import { Button, Flex, Result } from 'antd';

export interface ErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function Error({ error, reset }: ErrorProps): React.ReactNode {
  return (
    <Flex flex={1} vertical align="center" justify="center">
      <Result
        status="500"
        title="500"
        subTitle={error.message ?? 'Sorry, something went wrong.'}
        extra={
          <Button
            type="primary"
            onClick={() => {
              reset();
            }}
          >
            Try again
          </Button>
        }
      />
    </Flex>
  );
}
