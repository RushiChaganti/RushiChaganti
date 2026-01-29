import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { getAssetPath } from "@/lib/utils"
import Script from "next/script"
import "./globals.css"

export const metadata: Metadata = {
  title: "Rushi Chaganti- Portfolio",
  description: "Turning ideas into experiences, one project at a time.",
  icons: {
    icon: getAssetPath('/bat.png'),
    shortcut: getAssetPath('/bat.png'),
    apple: getAssetPath('/bat.png'),
  },
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${GeistSans.variable} ${GeistMono.variable}`}>
      <head>
        <Script
          async
          src="https://www.googletagmanager.com/gtag/js?id=G-4EWJ70DD1G"
          strategy="afterInteractive"
        />
        <Script id="google-analytics" strategy="afterInteractive">
          {`
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());

            gtag('config', 'G-4EWJ70DD1G');
          `}
        </Script>
      </head>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
