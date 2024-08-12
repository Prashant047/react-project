import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { BookContextProvider } from './book-context';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Book Keeper",
  description: "Track the progress of your book reading"
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <BookContextProvider>
        <body className={`dark ${inter.className}`}>{children}</body>
      </BookContextProvider>
    </html>
  );
}
