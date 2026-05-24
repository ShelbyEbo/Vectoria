import type { Metadata } from "next";
import "./globals.css";
import { Syne, DM_Sans, DM_Mono } from 'next/font/google'
const syne = Syne({
  subsets: ['latin'],
  weight: ['400','500', '600'],
  variable: '--font-display',
  display: 'swap',
})

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['300','400','500'],
  variable: '--font-body',
  display: 'swap',
})

const dmMono = DM_Mono({
  subsets: ['latin'],
  weight: ['400','500'],
  variable: '--font-mono',
  display: 'swap',
})
export const metadata: Metadata = {
  title: "Vectoria",
  description: "Physics simulator",
  icons: { icon: '/icon.svg' }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${syne.variable} ${dmSans.variable} ${dmMono.variable} h-full antialiased scroll-smooth`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <body className="min-h-full flex flex-col">{children}</body>
    </html>
  );
}
