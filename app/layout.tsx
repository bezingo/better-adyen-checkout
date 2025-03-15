import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { CartProvider } from './contexts/CartContext';
import { LocaleProvider } from './contexts/LocaleContext';
import { AuthProvider } from './contexts/AuthContext';

const inter = Inter({ subsets: ['latin'], variable: '--font-inter' });

export const metadata: Metadata = {
  title: 'Better Checkout with Adyen',
  description: 'A Next.js e-commerce checkout with Adyen payment integration',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} font-sans`}>
        <AuthProvider>
          <LocaleProvider>
            <CartProvider>
              {children}
            </CartProvider>
          </LocaleProvider>
        </AuthProvider>
      </body>
    </html>
  );
}