import React from 'react';
import { Metadata } from 'next';
import { Roboto } from 'next/font/google';
import { NextIntlClientProvider } from 'next-intl';
import { getLocale, getMessages } from 'next-intl/server';
import NextTopLoader from 'nextjs-toploader';
import { PublicEnvScript } from 'next-runtime-env';
import { AntdContext } from '@contexts/antd';
import { RefineContext } from '@contexts/refine';

import { ModalProvider } from '@/contexts/modal';

import '@/styles/globals.css';

const robotoSans = Roboto({
  weight: ['300', '400', '500', '700'],
  variable: '--font-roboto-sans',
  subsets: ['latin'],
});

export const metadata: Metadata = {
  title: 'Quản lý ra vào',
  description: 'Hệ thống quản lý ra vào',
  icons: {
    icon: '/images/favicon.ico',
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale}>
      <head>
        <PublicEnvScript />
      </head>
      <body className={`${robotoSans.variable} antialiased`} cz-shortcut-listen='true'>
        <NextTopLoader
          height={2}
          color='var(--color-primary)'
          shadow='none'
          showSpinner={false}
          initialPosition={0.4}
        />

        <NextIntlClientProvider locale={locale} messages={messages}>
          <RefineContext>
            <AntdContext>
              <ModalProvider>{children}</ModalProvider>
            </AntdContext>
          </RefineContext>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
