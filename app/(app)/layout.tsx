import type { Metadata } from "next";
import { Inter } from "next/font/google";

import NavBar from "@/components/nav-bar";


const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Tracking your expenses and investments was never this easy ",
  icons:["/logo.svg"]
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
      
          <div className="sm:px-6 md:px-0 max-w-6xl mx-auto">
          <NavBar />
          {children}
          </div>
          
   
  );
}
