import type { Metadata, Viewport } from 'next'
import { Geist, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { LocaleProvider } from '@/lib/locale-context'
import { PersonJsonLd } from '@/components/JsonLd'
import { SITE_URL } from '@/lib/site'
import './globals.css'

const _geist = Geist({ subsets: ["latin"] });
const _geistMono = Geist_Mono({ subsets: ["latin"] });

// Metadata is intentionally English-only. It is consumed by crawlers, search
// and link previews, not by readers, and the target audience for those is the
// international market. Page content stays bilingual via the EN/PT toggle.
// The copy leans on proper nouns and figures so it reads the same either way.
const SITE_DESCRIPTION =
  'Software engineer and AI engineer from Brazil. Python and FastAPI services, SQL and LLM agents for a bank’s US operation, as an intern at Banco Inter. Predictive maintenance on 37M telemetry records in an open Vale challenge, code and case study public. Undergraduate research at CEFET-MG on LLM models for market prediction and financial risk.'

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: 'Arthur Torres · Software Engineer & AI Engineer',
  description: SITE_DESCRIPTION,
  keywords: ['Software Engineer', 'Backend Engineer', 'AI Engineer', 'Python', 'FastAPI', 'SQL', 'LLM Agents', 'MCP', 'Model Context Protocol', 'LLM evaluation', 'Terraform', 'AWS', 'Docker', 'Kubernetes', 'Arthur Torres'],
  authors: [{ name: 'Arthur Torres' }],
  creator: 'Arthur Torres',
  alternates: {
    canonical: '/',
  },
  icons: {
    icon: '/icon.svg',
    apple: '/apple-icon.png',
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: 'pt_BR',
    url: SITE_URL,
    title: 'Arthur Torres · Software Engineer & AI Engineer',
    description: SITE_DESCRIPTION,
    siteName: 'Arthur Torres',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Arthur Torres · Software Engineer & AI Engineer',
    description: SITE_DESCRIPTION,
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
        <PersonJsonLd />
        <LocaleProvider>{children}</LocaleProvider>
        {process.env.NODE_ENV === 'production' && <Analytics />}
      </body>
    </html>
  )
}
