import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import { getAssetPath } from "@/lib/utils"
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
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
