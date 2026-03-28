import { Inter, DM_Serif_Display, Geist_Mono } from 'next/font/google'
import { Analytics } from '@vercel/analytics/next'
import { AuthProvider } from '@/components/auth/auth-context'
import './globals.css'

const inter = Inter({ 
  subsets: ["latin"],
  variable: '--font-inter'
})

const dmSerif = DM_Serif_Display({ 
  subsets: ["latin"],
  weight: "400",
  variable: '--font-serif'
})

const geistMono = Geist_Mono({ 
  subsets: ["latin"],
  variable: '--font-geist-mono'
})

export const metadata = {
  title: 'NeuroRoute - The Platform to Route AI Intelligently',
  description: 'NeuroRoute automatically selects the fastest, most cost-efficient, and highest-quality AI model for every request.',
  keywords: ['AI', 'routing', 'machine learning', 'API', 'infrastructure'],
}

export const viewport = {
  themeColor: '#41431B',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${dmSerif.variable} ${geistMono.variable}`}>
      <body className="font-sans antialiased text-[#41431B]">
        <AuthProvider>
          {children}
        </AuthProvider>
        <Analytics />
      </body>
    </html>
  )
}
