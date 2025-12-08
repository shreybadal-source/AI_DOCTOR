import { type Metadata } from 'next'
import { ClerkProvider } from '@clerk/nextjs'
import { Geist, Geist_Mono } from "next/font/google";
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { Analytics } from "@vercel/analytics/react";
import "../globals.css";
import Provider from './provider';
import Chatbot from '@/components/Chatbot';

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AI Docter Agent",
  description: "AI Docter voice agent which can help you to get the best treatment for your health",
};

export default async function RootLayout({
  children,
  params
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  const messages = await getMessages();

  return (
    <ClerkProvider>
      <html lang={locale}>
        <body className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`} suppressHydrationWarning>
          <NextIntlClientProvider messages={messages}>
            <Provider>
              {children}
              <Chatbot />
              <Analytics />
            </Provider>
          </NextIntlClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}