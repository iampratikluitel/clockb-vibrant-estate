import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/store/ReduxProvider";
import { auth } from "@/auth";
import "./globals.css";
import SessionProviderWrapper from "@/components/sessionProvider";

const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

export const metadata: Metadata = {
  title: "Project Estate",
  description: "Welcome to ProjectEstate",
  openGraph: {
    title: "Project Estate",
    description: "Welcome to ProjectEstate",
    images: [
      {
        url: "/logo/project-estate.png",
        width: 120,
        height: 630,
        alt: "Project Estate Logo",
      },
    ],
  },
  icons: {
    icon: "/favicon.ico",  
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased`}
      >
        <SessionProviderWrapper session={session}>
          <Toaster />
          <ReduxProvider>{children}</ReduxProvider>
        </SessionProviderWrapper>
      </body>
    </html>
  );
}
