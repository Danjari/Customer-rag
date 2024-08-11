import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { ClerkProvider, SignedIn, SignedOut, SignIn, UserButton } from '@clerk/nextjs'
import { dark } from '@clerk/themes';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DevBuddy',
  description: 'Best Psychological Interview Preparation Platform',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <ClerkProvider 
    appearance={{
      baseTheme: dark
    }}>
      
    <html lang="en">
      <body className={inter.className}>
        <div className='flex justify-center '>
        <SignedOut>
          <div className='mt-10'>
          <SignIn routing='hash' />
          </div>
          
        </SignedOut>
        </div>
        <SignedIn>
        {children}
        </SignedIn> 
        
      </body>
    </html>
    </ClerkProvider>
  )
}
