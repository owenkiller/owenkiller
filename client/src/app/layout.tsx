import type { Metadata } from 'next'
import { Toaster } from 'react-hot-toast'
import './globals.css'

export const metadata: Metadata = {
  title: 'WasteLight Africa - Fueling Communities from What We Throw Away',
  description: 'African Waste-to-Energy Innovation Hub transforming communities through sustainable waste management and clean energy solutions.',
  keywords: ['waste-to-energy', 'africa', 'sustainability', 'clean energy', 'innovation', 'community'],
  authors: [{ name: 'WasteLight Africa Team' }],
  openGraph: {
    title: 'WasteLight Africa - Waste-to-Energy Innovation Hub',
    description: 'Transforming African communities through sustainable waste management and clean energy solutions.',
    type: 'website',
    locale: 'en_US',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'WasteLight Africa',
    description: 'Fueling Communities from What We Throw Away',
  },
  viewport: 'width=device-width, initial-scale=1',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className="min-h-screen bg-gradient-to-br from-earth-50 to-primary-50">
        <div id="root" className="min-h-screen">
          {children}
        </div>
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 4000,
            style: {
              background: '#ffffff',
              color: '#1f2937',
              borderRadius: '8px',
              boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
            },
            success: {
              iconTheme: {
                primary: '#22c55e',
                secondary: '#ffffff',
              },
            },
            error: {
              iconTheme: {
                primary: '#dc2626',
                secondary: '#ffffff',
              },
            },
          }}
        />
      </body>
    </html>
  )
}