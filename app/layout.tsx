import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mohammad Talah Sheikh | AI & Solution Architecture Portfolio",
  description:
    "Professional portfolio for Mohammad Talah Sheikh, Senior AI and full-stack engineering leader in Sydney.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
