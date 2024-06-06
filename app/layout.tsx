import { ThemeProvider } from "@/components/theme-provider";
import { Manrope as FontSans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import PrivyProvider from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

export const metadata: Metadata = {
  title: "OPENFORMAT Launchpad",
  description:
    "The dashboard for the OPENFORMAT onchain rewards platform.",
  viewport: { width: "device-width", initialScale: 1 },
  openGraph: {
    type: "website",
    url: "https://app.openformat.tech",
    title: "OPENFORMAT Launchpad",
    description:
      "The dashboard for the OPENFORMAT onchain rewards platform.",
    siteName: "OPENFORMAT Launchpad",
    images: [
      {
        url: "https://app.openformat.tech/opengraph-banner.png",
      },
    ],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
          fontSans.variable
        )}
      >
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          <PrivyProvider>
            {children}
            <Toaster
              toastOptions={{ classNames: { error: "bg-red-500" } }}
            />
          </PrivyProvider>
        </ThemeProvider>
        <Script
          defer
          src="https://api.pirsch.io/pa.js"
          id="pianjs"
          data-code={process.env.NEXT_PUBLIC_PIRSH_DATA_CODE}
        />
      </body>
    </html>
  );
}
