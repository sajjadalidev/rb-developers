import type { Metadata } from "next";
import "./globals.css";
import { WhatsAppFloat } from "@/components/WhatsAppFloat";

export const metadata: Metadata = {
  title: "NIKZN Real Estate & Developers | Pakistan Real Estate",
  description:
    "Verified properties, projects, file rates, and investment tools for Pakistan real estate.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        {children}
        <WhatsAppFloat />
      </body>
    </html>
  );
}
