import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/lib/locale-context'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: 'Arthur Torres — AI Engineer',
  description: "AI Engineer building production LLM agents, Python automations, and data pipelines. Currently at Banco Inter's Global Operations — automations saving 1.0 FTE.",
  keywords: ['AI Engineer', 'AI Automation Engineer', 'Applied AI Engineer', 'Forward Deployed Engineer', 'LLM Agents', 'Python', 'FastAPI', 'Automation', 'Docker', 'Kubernetes', 'Arthur Torres'],
  authors: [{ name: 'Arthur Torres' }],
  creator: 'Arthur Torres',
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://torres.dev',
    title: 'Arthur Torres — AI Engineer',
    description: 'AI Engineer building production LLM agents, Python automations, and data pipelines. Currently at Banco Inter.',
    siteName: 'torres.dev',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arthur Torres — AI Engineer',
    description: 'AI Engineer building production LLM agents, Python automations, and data pipelines. Currently at Banco Inter.',
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
        <LocaleProvider>{children}</LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
