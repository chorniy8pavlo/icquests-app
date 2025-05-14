import type { Metadata } from "next";
import {Inter} from "next/font/google";
import "./globals.css";
import Provider from "./provider";
import Navbar from "@/components/navbar";
import Footer from "@/components/footer";


const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: "ICQuests",
  description: "ICQuests is a platform for creating and completing quests on the Internet Computer.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.className} antialiased font-sans relative`}
      >
        <Provider>
           <Navbar />
          {children}
          <Footer />
        </Provider>
      </body>
    </html>
  );
}
