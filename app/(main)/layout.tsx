'use client';

import React from 'react';
import {
  Breadcrumb,
  BreadcrumbProps,
  Flex,
  Layout as AntdLayout,
  Menu,
  theme,
} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import nextImage from '#app/assets/images/next.svg';

export interface LayoutProps {
  children: React.ReactNode;
}

const items: {
  name: string;
  path: string;
  children: { name: string; path: string }[];
}[] = [
  {
    name: 'Home',
    path: '/',
    children: [],
  },
  {
    name: 'nav1',
    path: '/nav1',
    children: [],
  },
  {
    name: 'nav2',
    path: '/nav2',
    children: [],
  },
  {
    name: 'nav3',
    path: '/nav3',
    children: [],
  },
];

export default function Layout({ children }: LayoutProps): React.ReactNode {
  const pathname = usePathname();
  const {
    token: { colorBgContainer, borderRadiusLG },
  } = theme.useToken();
  return (
    <AntdLayout style={{ minWidth: 1600, height: '100vh', overflow: 'hidden' }}>
      <AntdLayout.Sider
        style={{
          background: colorBgContainer,
          overflow: 'auto',
          paddingTop: 72,
        }}
      >
        <Link
          href="/"
          style={{
            padding: 16,
            display: 'block',
            textAlign: 'center',
            position: 'fixed',
            top: 0,
            backgroundColor: '#ffffff',
            width: 200,
            zIndex: 50,
          }}
        >
          <Image src={nextImage} alt="Next" height={25} priority />
        </Link>
        <Menu
          theme="light"
          mode="inline"
          defaultOpenKeys={items.reduce<string[]>(
            (previousValue, currentValue) => {
              if (pathname.startsWith(currentValue.path)) {
                previousValue.push(currentValue.path);
              }
              return previousValue;
            },
            [],
          )}
          selectedKeys={items.reduce<string[]>(
            (previousValue, currentValue) => {
              if (
                currentValue.path === '/'
                  ? currentValue.path === pathname
                  : pathname.startsWith(currentValue.path)
              ) {
                previousValue.push(currentValue.path);
                currentValue.children.forEach((child) => {
                  if (pathname.startsWith(child.path)) {
                    previousValue.push(child.path);
                  }
                });
              }
              return previousValue;
            },
            [],
          )}
          items={items.map((item) => {
            return {
              key: item.path,
              label:
                (item.children.length ?? 0) > 0 ? (
                  item.name
                ) : (
                  <Link href={item.path}>{item.name}</Link>
                ),
              children:
                item.children.length > 0 &&
                item.children.map((child) => {
                  return {
                    key: child.path,
                    label: <Link href={child.path}>{child.name}</Link>,
                  };
                }),
            };
          })}
        />
      </AntdLayout.Sider>
      <AntdLayout>
        <AntdLayout.Header
          style={{ padding: '0 24px', background: colorBgContainer }}
        />
        <AntdLayout.Content
          style={{
            margin: 16,
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
          }}
        >
          <Flex
            style={{
              padding: 24,
              flex: 1,
              background: colorBgContainer,
              borderRadius: borderRadiusLG,
              overflow: 'hidden',
            }}
            gap={24}
            vertical
          >
            <Breadcrumb
              items={items.reduce<BreadcrumbProps['items']>(
                (previousValue, currentValue) => {
                  if (pathname.startsWith(currentValue.path)) {
                    previousValue?.push({
                      title: currentValue.name,
                    });
                    currentValue.children?.forEach((child) => {
                      if (pathname.startsWith(child.path)) {
                        previousValue?.push({
                          title: child.name,
                        });
                      }
                    });
                  }
                  return previousValue;
                },
                [],
              )}
            />
            <Flex
              flex={1}
              vertical
              style={{
                overflow: 'auto',
              }}
            >
              {children}
            </Flex>
          </Flex>
        </AntdLayout.Content>
      </AntdLayout>
    </AntdLayout>
  );
}
