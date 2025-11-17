import type { Metadata } from 'next'
import { Inter, Poppins, Space_Grotesk } from 'next/font/google'
import './globals.css'
import { ThemeProvider } from '@/components/theme-provider'

const inter = Inter({ 
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const poppins = Poppins({ 
  weight: ['400', '500', '600', '700', '800'],
  subsets: ['latin'],
  variable: '--font-poppins',
  display: 'swap',
})

const spaceGrotesk = Space_Grotesk({ 
  subsets: ['latin'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

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
    url: 'https://portfiliomy.vercel.app',
    title: 'Ayush Kumar Sao | Software Developer Portfolio',
    description: 'Software Developer specializing in C++, JavaScript, React.js, and Next.js. Top 0.4% on LeetCode with 500-day streak.',
    siteName: 'Ayush Kumar Sao Portfolio',
    images: [
      {
        url: 'https://portfiliomy.vercel.app/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Ayush Kumar Sao - Software Developer',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Ayush Kumar Sao | Software Developer Portfolio',
    description: 'Software Developer specializing in C++, JavaScript, React.js, and Next.js',
    images: ['https://portfiliomy.vercel.app/og-image.png'],
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
      <body className={`${inter.variable} ${poppins.variable} ${spaceGrotesk.variable} font-sans antialiased`} suppressHydrationWarning>
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
