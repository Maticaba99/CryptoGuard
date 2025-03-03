import "./globals.css";
import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import { ThemeProvider } from "@/components/theme-provider";
import ReduxProvider from "@/store/ReduxProvider";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-space-grotesk",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  metadataBase: new URL("http://localhost:3000"), // Modificar en producción
  title: "CryptoGuard AI - Secure Your Digital Assets",
  description:
    "Advanced AI-powered security for your cryptocurrency investments with real-time monitoring and personalized coaching.",
  keywords:
    "cryptocurrency security, AI security, crypto protection, blockchain security",
  openGraph: {
    title: "CryptoGuard AI - Secure Your Digital Assets",
    description:
      "Advanced AI-powered security for your cryptocurrency investments with real-time monitoring and personalized coaching.",
    url: "https://cryptoguard.ai",
    siteName: "CryptoGuard AI",
    images: [
      {
        url: "/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "CryptoGuard AI",
      },
    ],
    locale: "en_US",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${spaceGrotesk.variable} ${inter.variable} font-body`}>
        <ReduxProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
