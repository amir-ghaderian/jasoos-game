
import type { Metadata, Viewport } from 'next';
import { ThemeProvider } from 'next-themes';
import localFont from 'next/font/local';
import './globals.css';
import InstallGameModal from './components/InstallGameModal';

/* =========================================================
   SITE CONFIG
========================================================= */

const SITE_URL = 'https://jasoos-game-six.vercel.app';
const SITE_NAME = 'جاسوس';

const SITE_DESCRIPTION =
  'بازی جاسوس آنلاین و رایگان؛ یک بازی گروهی و دورهمی برای شناسایی جاسوس در میان بازیکنان. بدون نیاز به نصب، روی موبایل و کامپیوتر بازی کنید.';

/* =========================================================
   VIEWPORT
========================================================= */

export const viewport: Viewport = {
  themeColor: '#1e1b4b',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
};

/* =========================================================
   FONT
========================================================= */

const myPersianFont = localFont({
  src: '../public/fonts/Vazirmatn-Black.woff2',
  display: 'swap',
  variable: '--font-persian',
});

/* =========================================================
   SEO METADATA
========================================================= */

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),

  title: {
    default: 'بازی جاسوس آنلاین | بازی گروهی جاسوس',
    template: '%s | بازی جاسوس',
  },

  description: SITE_DESCRIPTION,

  verification: {
    google: 'Kz5BCLLKr7CmP-8TrASgYVgf3mK7qjq4voYne5fqbZE',
  },

  /* =======================================================
     KEYWORDS
  ======================================================= */

  keywords: [
    'بازی جاسوس',
    'بازی جاسوس آنلاین',
    'بازی جاسوس آنلاین رایگان',
    'بازی جاسوس تحت وب',
    'بازی جاسوس برای گوشی',
    'بازی جاسوس برای موبایل',
    'بازی جاسوس برای آیفون',
    'بازی جاسوس برای گوشی آیفون',
    'بازی جاسوس بدون نصب',
    'بازی جاسوس چند نفره آنلاین',
    'بازی جاسوس گروهی',
    'بازی جاسوس دورهمی',
    'بازی جاسوس مهمانی',
    'بازی گروهی',
    'بازی دورهمی',
    'بازی مهمانی',
    'بازی فکری',
    'جاسوس',
    'شناسایی جاسوس',
    'بازی چند نفره',
  ],

  applicationName: SITE_NAME,

  authors: [
    {
      name: SITE_NAME,
    },
  ],

  creator: SITE_NAME,
  publisher: SITE_NAME,

  generator: 'Next.js',

  referrer: 'origin-when-cross-origin',

  /* =======================================================
     CANONICAL
  ======================================================= */

  alternates: {
    canonical: '/',
  },

  /* =======================================================
     OPEN GRAPH
  ======================================================= */

  openGraph: {
    type: 'website',
    locale: 'fa_IR',

    url: SITE_URL,

    siteName: SITE_NAME,

    title: 'بازی جاسوس آنلاین | بازی گروهی جاسوس',

    description: SITE_DESCRIPTION,

    images: [
      {
        url: '/icons/icon-512x512.png',
        width: 512,
        height: 512,
        alt: 'بازی جاسوس آنلاین و گروهی',
      },
    ],
  },

  /* =======================================================
     TWITTER / X
  ======================================================= */

  twitter: {
    card: 'summary_large_image',

    title: 'بازی جاسوس آنلاین | بازی گروهی جاسوس',

    description: SITE_DESCRIPTION,

    images: ['/icons/icon-512x512.png'],

    creator: '@jasoos_game',
  },

  /* =======================================================
     ROBOTS
  ======================================================= */

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

  /* =======================================================
     PWA
  ======================================================= */

  manifest: '/manifest.json',

  /* =======================================================
     ICONS
  ======================================================= */

  icons: {
    icon: [
      {
        url: '/icons/icons8-spy-96.png',
      },
      {
        url: '/icons/icon-16x16.png',
        sizes: '16x16',
        type: 'image/png',
      },
      {
        url: '/icons/icon-32x32.png',
        sizes: '32x32',
        type: 'image/png',
      },
      {
        url: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],

    apple: [
      {
        url: '/icons/icon-192x192.png',
        sizes: '192x192',
        type: 'image/png',
      },
      {
        url: '/icons/icon-512x512.png',
        sizes: '512x512',
        type: 'image/png',
      },
    ],
  },

  /* =======================================================
     APPLE WEB APP
  ======================================================= */

  appleWebApp: {
    capable: true,
    title: SITE_NAME,
    statusBarStyle: 'black-translucent',
    startupImage: ['/icons/icon-512x512.png'],
  },

  /* =======================================================
     COLOR / BROWSER
  ======================================================= */

  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
};

/* =========================================================
   STRUCTURED DATA / JSON-LD
========================================================= */

const jsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebApplication',

  name: SITE_NAME,

  url: SITE_URL,

  description: SITE_DESCRIPTION,

  applicationCategory: 'GameApplication',

  operatingSystem: [
    'Web Browser',
    'iOS',
    'Android',
    'Windows',
    'macOS',
  ],

  browserRequirements: 'Requires JavaScript',

  inLanguage: 'fa-IR',

  isAccessibleForFree: true,

  genre: [
    'Party Game',
    'Group Game',
    'Puzzle Game',
  ],

  keywords: [
    'بازی جاسوس',
    'بازی جاسوس آنلاین',
    'بازی جاسوس تحت وب',
    'بازی جاسوس برای موبایل',
    'بازی جاسوس برای آیفون',
    'بازی جاسوس بدون نصب',
    'بازی گروهی جاسوس',
  ],
};

/* =========================================================
   ROOT LAYOUT
========================================================= */

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fa"
      dir="rtl"
      suppressHydrationWarning
      className={myPersianFont.className}
    >
      <head>

        {/* ===================================================
           PWA
        =================================================== */}

        <link rel="manifest" href="/manifest.json" />

        {/* ===================================================
           APPLE
        =================================================== */}

        <link
          rel="apple-touch-icon"
          href="/icons/icon-192x192.png"
        />

        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
        />

        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="black-translucent"
        />

        <meta
          name="apple-mobile-web-app-title"
          content={SITE_NAME}
        />

        {/* ===================================================
           MOBILE
        =================================================== */}

        <meta
          name="mobile-web-app-capable"
          content="yes"
        />

        {/* ===================================================
           MICROSOFT
        =================================================== */}

        <meta
          name="msapplication-TileImage"
          content="/icons/icon-144x144.png"
        />

        <meta
          name="msapplication-TileColor"
          content="#1e1b4b"
        />

        <meta
          name="msapplication-config"
          content="/browserconfig.xml"
        />

        {/* ===================================================
           JSON-LD
        =================================================== */}

        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(jsonLd).replace(
              /</g,
              '\\u003c'
            ),
          }}
        />

      </head>

      <body className="min-h-screen bg-gradient-to-br from-slate-900 via-stone-800 to-zinc-900">

        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
        >
          {children}
          <InstallGameModal />
        </ThemeProvider>

      </body>
    </html>
  );
}

