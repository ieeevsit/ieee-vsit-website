import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { Metadata, Viewport } from "next";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: '#0A0F1A',
}

export const metadata: Metadata = {
  metadataBase: new URL('https://ieeevsit.vercel.app/'),
  title: "IEEE VSIT | Vidyalankar School of Information Technology",
  description: "Official website of the IEEE VSIT Student Branch. We foster technical innovation, leadership, and a vibrant community of engineers at VSIT.",
  keywords: ["IEEE VSIT", "IEEE", "VSIT", "Vidyalankar School of Information Technology", "student branch", "engineering", "technology", "mumbai", "events", "workshops"],
  openGraph: {
    title: "IEEE VSIT | Vidyalankar School of Information Technology",
    description: "Official website of the IEEE VSIT Student Branch. We foster technical innovation, leadership, and a vibrant community of engineers at VSIT.",
    url: 'https://ieeevsit.vercel.app/',
    siteName: "IEEE VSIT",
    images: ['/og-image.png'],
  },
  twitter: {
    card: 'summary_large_image',
    title: "IEEE VSIT | Vidyalankar School of Information Technology",
    description: "Official website of the IEEE VSIT Student Branch. We foster technical innovation, leadership, and a vibrant community of engineers at VSIT.",
    images: ['/og-image.png'],
  },
  alternates: {
    canonical: 'https://ieeevsit.vercel.app/',
  },
};

interface RootLayoutProps {
  children: React.ReactNode;
}

export default function RootLayout({ children }: RootLayoutProps) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" type="image/x-icon" />
        <script 
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "IEEE VSIT",
              "url": "https://ieeevsit.vercel.app/",
              "logo": "https://ieeevsit.vercel.app/ieee-emblem.png",
              "contactPoint": {
                "@type": "ContactPoint",
                "email": "ieee@vsit.edu.in",
                "contactType": "Customer Service"
              },
              "sameAs": [
                "https://linkedin.com/company/ieee-vsit",
                "https://instagram.com/ieee_vsit"
              ]
            })
          }}
        />
        <script defer src="https://analytics.sohamdarekar.dev/script.js" data-website-id="cc89b66a-72f9-49d5-be47-b3bd0fb57c5e"></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased overflow-x-hidden`}
      >
        {children}
      </body>
    </html>
  );
}