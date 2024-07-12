import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Header/components/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Paradise Problems",
  description: "Movie: City of Love",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/icons/faviconpng.png" />
      </head>
      <body className={inter.className}>
        <Navbar showSupportInNavbar={undefined} openModal={undefined} />
        {children}
      </body>
    </html>
  );
}
