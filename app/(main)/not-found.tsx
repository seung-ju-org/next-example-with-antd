'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { Button, Flex, Result } from 'antd';

export default function NotFound(): React.ReactNode {
  const router = useRouter();
  return (
    <Flex flex={1} vertical align="center" justify="center">
      <Result
        status="404"
        title="404"
        subTitle="Sorry, the page you visited does not exist."
        extra={
          <Button
            type="primary"
            onClick={() => {
              router.push('/');
            }}
          >
            Back Home
          </Button>
        }
      />
    </Flex>
  );
}
