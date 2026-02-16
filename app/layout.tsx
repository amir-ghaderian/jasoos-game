import type { Metadata, Viewport } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';

const inter = Inter({ subsets: ['latin'] });

export const viewport: Viewport = {
  themeColor: '#1e1b4b',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
};

export const metadata: Metadata = {
  title: 'جاسوس',
  description: 'بازی گروهی جاسوس - شناسایی جاسوس در بین شهروندان',
  applicationName: 'جاسوس',
  authors: [{ name: 'جاسوس' }],
  generator: 'Next.js',
  keywords: ['بازی', 'جاسوس', 'شهروند', 'مافیا', 'بازی گروهی', 'بازی دورهمی'],
  referrer: 'origin-when-cross-origin',
  creator: 'جاسوس',
  publisher: 'جاسوس',
  
  // متادیتا برای PWA
  manifest: '/manifest.json',
  
  // متادیتا برای SEO
  openGraph: {
    title: 'جاسوس - بازی گروهی',
    description: 'بازی گروهی جاسوس - شناسایی جاسوس در بین شهروندان',
    url: 'https://jasoos.vercel.app',
    siteName: 'جاسوس',
    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'جاسوس - بازی گروهی',
      },
    ],
    locale: 'fa_IR',
    type: 'website',
  },
  
  // متادیتا برای توییتر
  twitter: {
    card: 'summary_large_image',
    title: 'جاسوس - بازی گروهی',
    description: 'بازی گروهی جاسوس - شناسایی جاسوس در بین شهروندان',
    images: ['/icons/icon-512x512.png'],
    creator: '@jasoos_game',
  },
  
  // متادیتا برای iOS
  appleWebApp: {
    capable: true,
    title: 'جاسوس',
    statusBarStyle: 'black-translucent',
    startupImage: ['/icons/icon-512x512.png'],
  },
  
 
  icons: {
    icon: [
      { url: '/icons/icons8-spy-96.png' },
      { url: '/icons/icon-16x16.png', sizes: '16x16', type: 'image/png' },
      { url: '/icons/icon-32x32.png', sizes: '32x32', type: 'image/png' },
      { url: '/icons/icon-192x192.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],
    apple: [
      { url: '/icons/icons8-spy-96.png', sizes: '192x192', type: 'image/png' },
      { url: '/icons/icon-512x512.png', sizes: '512x512', type: 'image/png' },
    ],

  },
  

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
  
 
  colorScheme: 'dark',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="fa" dir="rtl">
      <head>
 
        <link rel="apple-touch-icon" href="/icons/icon-192x192.png" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="black-translucent" />
        <meta name="apple-mobile-web-app-title" content="جاسوس" />
        
     
        <meta name="mobile-web-app-capable" content="yes" />
        <meta name="msapplication-TileImage" content="/icons/icon-144x144.png" />
        <meta name="msapplication-TileColor" content="#1e1b4b" />
        <meta name="msapplication-config" content="/browserconfig.xml" />
      </head>
      <body className={`${inter.className} bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900 min-h-screen`}>
        {children}
      </body>
    </html>
  );
}