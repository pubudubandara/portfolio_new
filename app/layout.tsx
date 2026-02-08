import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { Toaster } from "@/components/ui/toaster"
import BackgroundAnimation from "@/components/BackgroundAnimation"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL('https://www.pubududev.me/'), 
  title: {
    default: 'Pubudu Bandara - Full Stack Developer | IT Undergraduate',
    template: '%s | Pubudu Bandara'
  },
  description: 'Pubudu Bandara - Full Stack Developer and IT Undergraduate at University of Moratuwa. Specializing in web development, React, Next.js, and modern JavaScript technologies. View my portfolio, projects, and certificates.',
  keywords: ['Pubudu Bandara', 'Full Stack Developer', 'Web Developer', 'IT Undergraduate', 'University of Moratuwa', 'React Developer', 'Next.js', 'Portfolio', 'JavaScript', 'TypeScript', 'Frontend Developer', 'Backend Developer'],
  authors: [{ name: 'Pubudu Bandara' }],
  creator: 'Pubudu Bandara',
  publisher: 'Pubudu Bandara',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://www.pubududev.me/',
    title: 'Pubudu Bandara - Full Stack Developer | IT Undergraduate',
    description: 'Full Stack Developer and IT Undergraduate at University of Moratuwa. Explore my portfolio, projects, skills, and certificates in web development.',
    siteName: 'Pubudu Bandara Portfolio',
    images: [
      {
        url: '/img.jpg',
        width: 1200,
        height: 630,
        alt: 'Pubudu Bandara - Full Stack Developer',
      },
    ],
  },
  
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },

  generator: 'Next.js',
  applicationName: 'Pubudu Bandara Portfolio',
  referrer: 'origin-when-cross-origin',
  category: 'Technology',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="canonical" href="https://www.pubududev.me/" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
          <BackgroundAnimation />
          
          {/* Main content sits here with proper z-index */}
          <main className="relative z-10">
            {children}
          </main>
          <Toaster />
        </ThemeProvider>
      </body>
    </html>
  )
}
