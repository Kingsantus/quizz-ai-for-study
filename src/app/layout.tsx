import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { SessionProvider } from "next-auth/react";
import Header from '@/components/ui/headers';

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Quizz Ai',
  description: 'Generated Quizzez And Study Faster Using AI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <SessionProvider>
      <body className={"dark"}>
        <Header />
        {children}
      </body>
      </SessionProvider>
    </html>
  )
}
