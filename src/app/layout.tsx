import { Header } from "@/components/Header";
import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  title: "Music Theory Tools",
};

const RootLayout: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Header />
        <main className="px-8 pb-48">{children}</main>
      </body>
    </html>
  );
};

export default RootLayout;
