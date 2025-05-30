import type React from "react"
import "./globals.css"
import { Inter } from "next/font/google"
import { TranslationProvider } from "@/hooks/use-translation"
import Footer from "@/components/footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "ImmerseAd",
  description:
    "The ultimate platform for immersive advertising connecting influencers and merchants through verified X.com accounts and secure crypto payments.",
  generator: "v0.dev",
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={inter.className}>
        <TranslationProvider>
          <div className="flex flex-col min-h-screen">
            <main className="flex-1">{children}</main>
            <Footer />
          </div>
        </TranslationProvider>
      </body>
    </html>
  )
}
