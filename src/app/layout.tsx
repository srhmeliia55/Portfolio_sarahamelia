import type { Metadata, Viewport } from "next";
import { Geist_Mono, Plus_Jakarta_Sans, Sora } from "next/font/google";
import "./globals.css";
import "lenis/dist/lenis.css";
import { Providers } from "@/components/providers";
import { siteMeta } from "@/data/portfolio";

const sora = Sora({
  variable: "--font-sora",
  subsets: ["latin"],
  display: "swap",
});

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

/**
 * Skrip tema. Dijalankan sinkron saat browser membaca <head>, jadi atribut
 * `data-theme` sudah benar sebelum paint pertama — tidak ada kedipan warna.
 * Prioritas: pilihan tersimpan (localStorage) → preferensi sistem → gelap.
 *
 * Sengaja HANYA menulis `data-theme` (bukan `style`) agar tidak ada atribut
 * tambahan pada <html> yang bisa memicu peringatan mismatch hidrasi.
 */
const themeScript = `(function(){try{var k="sarah-portfolio:theme",s=null;try{s=window.localStorage.getItem(k)}catch(e){}var t=(s==="light"||s==="dark")?s:(window.matchMedia("(prefers-color-scheme: light)").matches?"light":"dark");document.documentElement.dataset.theme=t}catch(e){}})();`;

export const metadata: Metadata = {
  metadataBase: new URL(siteMeta.url),
  title: {
    default: siteMeta.title,
    template: "%s · Sarah Amelia",
  },
  description: siteMeta.description,
  keywords: [...siteMeta.keywords],
  authors: [{ name: "Sarah Amelia" }],
  creator: "Sarah Amelia",
  applicationName: "Sarah Amelia — Portfolio",
  category: "technology",
  openGraph: {
    type: "website",
    locale: "id_ID",
    alternateLocale: ["en_US"],
    url: siteMeta.url,
    siteName: "Sarah Amelia",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  twitter: {
    card: "summary_large_image",
    title: siteMeta.title,
    description: siteMeta.description,
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#f5f5fa" },
    { media: "(prefers-color-scheme: dark)", color: "#04040c" },
  ],
  colorScheme: "light dark",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="id"
      data-theme="dark"
      suppressHydrationWarning
      className={`${sora.variable} ${jakarta.variable} ${geistMono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeScript }} />
      </head>
      <body
        className="font-sans antialiased"
        /**
         * Ekstensi browser (mis. ColorZilla yang menambahkan
         * `cz-shortcut-listen="true"` ke <body>) menyisipkan atribut ke HTML
         * sebelum React melakukan hidrasi. Atribut itu bukan bagian dari
         * markup kita, jadi peringatan mismatch untuk elemen ini
         * diabaikan — bukan bug aplikasi.
         */
        suppressHydrationWarning
      >
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
