import { Inter } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/toaster"
import { ThemeProvider } from "@/components/theme-provider"
import { ProvideAuth } from "@/hooks/use-auth"

const inter = Inter({ subsets: ["latin"] })

export const metadata = {
  title: "DEMO Quest",
  description: "Explore startup booths and win prizes at DEMO!",
  manifest: "/manifest.json",
  themeColor: "#6d28d9",
  viewport: "width=device-width, initial-scale=1, maximum-scale=1, user-scalable=0",
    generator: 'v0.dev'
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
      </head>
      <body className={`${inter.className} overscroll-none`}>
        <ThemeProvider attribute="class" defaultTheme="dark">
          <ProvideAuth>
            {children}
          </ProvideAuth>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}