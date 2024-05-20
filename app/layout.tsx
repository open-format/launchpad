"use client";

import { ThemeProvider } from "@/components/theme-provider";
import {
  QueryClient,
  QueryClientProvider,
} from "@tanstack/react-query";
import { Manrope as FontSans } from "next/font/google";

import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import { WagmiProvider, createConfig } from "@privy-io/wagmi";
import Script from "next/script";
import { arbitrumSepolia } from "viem/chains";
import { http } from "wagmi";
import "./globals.css";
import PrivyProvider from "./providers";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});

const queryClient = new QueryClient();

export const config = createConfig({
  chains: [arbitrumSepolia], // Pass your required chains as an array
  transports: {
    [arbitrumSepolia.id]: http(),
  },
});

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
            <QueryClientProvider client={queryClient}>
              <WagmiProvider config={config}>
                {children}
              </WagmiProvider>
            </QueryClientProvider>
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
          data-dev="example.com"
        />
      </body>
    </html>
  );
}
