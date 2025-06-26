import { NextIntlClientProvider } from 'next-intl';
import { Geist, Geist_Mono } from "next/font/google";
import messagesCa from '../../messages/ca.json';
import messagesEs from '../../messages/es.json';
import messagesEn from '../../messages/en.json';
import '@/styles/globals.css';
import React from "react";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Rodeo Studio",
  description: "La teva productora audiovisual de confiança", // Canviar també segons l'idioma?
};

export default async function LocaleLayout({ children, params }) {
   const { locale } = await params;
  
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