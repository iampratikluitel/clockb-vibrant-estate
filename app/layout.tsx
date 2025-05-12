import type { Metadata } from "next";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/sonner";
import ReduxProvider from "@/store/ReduxProvider";
import { auth } from "@/auth";
import "./globals.css";
import SessionProviderWrapper from "@/components/sessionProvider";
import { DOMAIN } from "@/lib/constants";

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
  title: "Project Estates",
  description: "Transforming Real Estate into Value-Driven Investments",
  icons: {
    icon: "/favicon.ico",
  },
  openGraph: {
    type: "website",
    url: DOMAIN,
    title: `Project Estates`,
    description: "Transforming Real Estate into Value-Driven Investments",
    images: [
      {
        url: "/logo/project-estate.png",
      },
    ],
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
