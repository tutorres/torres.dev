import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Arthur Torres — Data & Automation Engineer',
  description: 'I build data pipelines and AI-powered automations that reduce manual work and support operational decisions. Currently at Banco Inter.',
  keywords: ['Data Engineer', 'Automation', 'Python', 'LLM', 'AI', 'Banco Inter', 'Arthur Torres'],
  authors: [{ name: 'Arthur Torres' }],
  creator: 'Arthur Torres',
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://torres.dev',
    title: 'Arthur Torres — Data & Automation Engineer',
    description: 'I build data pipelines and AI-powered automations that reduce manual work and support operational decisions.',
    siteName: 'torres.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arthur Torres — Data & Automation Engineer',
    description: 'I build data pipelines and AI-powered automations that reduce manual work and support operational decisions.',
  },
  robots: {
    index: true,
    follow: true,
  },
}

export const viewport: Viewport = {
  themeColor: '#0a0a0a',
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className="dark bg-background scroll-smooth">
      <body className="font-sans antialiased">
        {children}
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
