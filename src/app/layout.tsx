'use client';
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider, useAuth } from "@/lib/auth-context";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "BulkEase - Group Buying Made Easy",
  description: "Join BulkEase to unlock wholesale prices through group buying. Save money on tech accessories, room decor, lifestyle products, and more.",
};

function MainContent({ children }: { children: React.ReactNode }) {
  const { user, isLoading } = useAuth();
  
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <AuthProvider>
          <MainContent>
            {children}
          </MainContent>
        </AuthProvider>
      </body>
    </html>
  );
}
