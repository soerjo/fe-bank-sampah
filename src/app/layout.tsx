import NavbarComponent from '@/components/Navbar'
import './globals.css'
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bank Sampah',
  description: 'Bank Sampah to organize your trash',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <main className='h-screen flex flex-col mx-auto bg-gray-100 overflow-hidden'>
          <NavbarComponent />
          <div className='container mx-auto h-full overflow-hidden px-4 md:px-0'>
            {children}
          </div>
        </main>
      </body>
    </html>
  )
}
