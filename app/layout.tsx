import type { Metadata } from 'next'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

export const metadata: Metadata = {
  title: 'Ayush Kumar Sao | Software Developer Portfolio',
  description: 'Software Developer specializing in C++, JavaScript, React.js, and Next.js. Top 0.4% on LeetCode with 500-day streak. Building scalable web applications and solving complex problems.',
  keywords: [
    'Ayush Kumar Sao',
    'Software Developer',
    'Full Stack Developer',
    'React Developer',
    'Next.js Developer',
    'C++ Developer',
    'JavaScript Developer',
    'Portfolio',
    'LeetCode',
    'Web Development'
  ],
  authors: [{ name: 'Ayush Kumar Sao' }],
  creator: 'Ayush Kumar Sao',
  publisher: 'Ayush Kumar Sao',
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
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: 'https://your-domain.com',
    title: 'Ayush Kumar Sao | Software Developer Portfolio',
    description: 'Software Developer specializing in C++, JavaScript, React.js, and Next.js. Top 0.4% on LeetCode with 500-day streak.',
    siteName: 'Ayush Kumar Sao Portfolio',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Kumar Sao | Software Developer Portfolio',
    description: 'Software Developer specializing in C++, JavaScript, React.js, and Next.js',
  },
  generator: 'Next.js',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body suppressHydrationWarning>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
