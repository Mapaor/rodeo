import "@/styles/globals.css";
import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import messagesCa from '../../messages/ca.json';
import messagesEs from '../../messages/es.json';
import messagesEn from '../../messages/en.json';
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export async function generateMetadata({ params }) {
  const { locale = 'ca' } = await params;
  const messages = {
    ca: messagesCa,
    es: messagesEs,
    en: messagesEn
  }[locale] || messagesCa;

  return {
    title: "Rodeo Studio",
    description: messages.metadata.description,
    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/favicon.ico"
    }
  };
}

export default async function Layout({ children, params }) {
  const { locale = 'ca' } = await params;
  const messages = {
    ca: messagesCa,
    es: messagesEs,
    en: messagesEn
  }[locale] || messagesCa;

  return (
    <html lang={locale}>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NextIntlClientProvider locale={locale} messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}