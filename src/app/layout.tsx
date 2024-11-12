import type { Metadata } from 'next';
import { Coming_Soon } from 'next/font/google';
import './globals.css';

const comingSoon = Coming_Soon({ weight: '400', subsets: ['latin'] });

export const metadata: Metadata = {
  title: 'Tirinhas',
  description: 'Um jogo muito legal de fazer tirinhas',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <link rel="icon" href="/favicon.ico" />
      </head>
      <body className={`${comingSoon.className} antialiased light`}>
        {children}
      </body>
    </html>
  );
}
