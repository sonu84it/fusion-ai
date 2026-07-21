import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Fusion AI — GenAI Model Directory",
  description: "An independent directory of foundation-model providers, open-model labs, and AI inference platforms.",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>{children}</body>
    </html>
  );
}
