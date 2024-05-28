import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import NavBar from "@/components/nav-bar";
import { Toaster } from "@/components/ui/toaster";
import AuthProvider from "@/components/providers/auth-provider";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Expense Tracker",
  description: "Tracking your expenses and investments was never this easy ",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>

      <html lang="en">
        <body className={`${inter.className}  mx-auto min-w-screen min-h-screen`}>
          <div className="sm:px-6 md:px-0 max-w-6xl mx-auto">
          
          {children}
          </div>
          
          <Toaster />
          </body>

      </html>
    </AuthProvider>
  );
}
