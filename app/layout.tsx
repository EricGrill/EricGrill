import type { Metadata } from "next";
import { Space_Grotesk, JetBrains_Mono } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-sans",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-mono",
});

export const metadata: Metadata = {
  title: {
    default: "Eric Grill",
    template: "%s | Eric Grill",
  },
  description: "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
  metadataBase: new URL("https://ericgrill.com"),
  authors: [{ name: "Eric Grill", url: "https://ericgrill.com/about" }],
  creator: "Eric Grill",
  publisher: "Eric Grill",
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    title: "Eric Grill",
    description: "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
    url: "https://ericgrill.com",
    siteName: "Eric Grill",
    locale: "en_US",
    type: "website",
    images: [
      {
        url: "/og-default.png",
        width: 1200,
        height: 630,
        alt: "Eric Grill",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Eric Grill",
    description: "Builder. Pilot. Grappler. Writing about AI, aviation, jiu jitsu, blockchain, and programming.",
    site: "@EricGrill",
    creator: "@EricGrill",
    images: ["/og-default.png"],
  },
  alternates: {
    canonical: "https://ericgrill.com",
  },
  verification: {
    google: "G-YCKKX4GDGR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-YCKKX4GDGR"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'G-YCKKX4GDGR');
          `}
        </Script>
      </head>
      <body className={`${spaceGrotesk.variable} ${jetbrainsMono.variable} flex flex-col min-h-screen`}>
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
