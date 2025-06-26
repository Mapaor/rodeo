import { Geist, Geist_Mono } from "next/font/google";
import "@/styles/globals.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";

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
  description: "La teva productora audiovisual de confiança",
};

export default function RootLayout({ children }) {
  return (
    <html lang="ca">
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <NavBar />
        {children}
        <Footer />
      </body>
    </html>
  );
}