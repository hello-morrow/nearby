import type { Metadata } from "next";
import "./globals.css";
import "../styles/navigation.css";

export const metadata: Metadata = {
  title: "Nearby",
  description: "Save today for tomorrow",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full antialiased">
      <body className="min-h-full flex flex-col page-enter">{children}</body>
    </html>
  );
}