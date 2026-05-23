import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin"], display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL ?? "http://localhost:3000"),
  title: "Mohammad Talah Sheikh | AI & Solution Architecture Portfolio",
  description:
    "Professional portfolio for Mohammad Talah Sheikh, Senior AI and full-stack engineering leader in Sydney.",
  icons: {
    icon: "/icon.svg",
  },
  openGraph: {
    title: "Mohammad Talah Sheikh | AI & Solution Architecture Portfolio",
    description:
      "Senior AI and full-stack engineering leader specialising in enterprise GenAI, banking platforms, and distributed systems.",
    type: "website",
    locale: "en_AU",
  },
  twitter: {
    card: "summary_large_image",
    title: "Mohammad Talah Sheikh | AI & Solution Architecture Portfolio",
    description:
      "Senior AI and full-stack engineering leader specialising in enterprise GenAI, banking platforms, and distributed systems.",
  },
};

export const viewport: Viewport = {
  themeColor: "#0b0d12",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={inter.className}>{children}</body>
    </html>
  );
}
