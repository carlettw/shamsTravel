import type { Metadata } from "next";
import { Manrope } from "next/font/google";
import { AuthProvider } from "@/contexts/AuthContext";
import {
  initServerI18next,
  getT,
  getResources,
  generateI18nStaticParams,
} from "next-i18next/server";
import NextTopLoader from "nextjs-toploader";
import { I18nProvider } from "next-i18next/client";
import { Toaster } from "@/components/ui/sonner";
import i18nConfig from "../../i18n.config";
import "../globals.css";

const manrope = Manrope({
  variable: "--font-manrope",
  subsets: ["latin", "latin-ext", "cyrillic"],
  display: "swap",
});



initServerI18next(i18nConfig);

export async function generateMetadata(): Promise<Metadata> {
  return {
    metadataBase: new URL("https://shamstravel.uz"),
    title: {
      default: "Shams Travel — quyosh yo'l ko'rsatadi",
      template: "%s | Shams Travel",
    },

    description:
      "Shams Travel bilan sayohatni yorug' va tashvishsiz boshlang: tayyor turlar, transport, joylashtirish va gid xizmatlari bir joyda.",

    keywords: [
      "Shams Travel",
      "O'zbekiston sayohat",
      "O'zbekiston turizm",
      "Markaziy Osiyo sayohat",
      "Samarqand tur",
      "Buxoro tur",
      "Xiva tur",
      "Toshkent tur",
      "Farg'ona vodiysi sayohat",
      "Ipak yo'li sayohat",
      "Silk Road tour Uzbekistan",
      "Central Asia travel",
      "Uzbekistan travel agency",
      "Uzbekistan guided tours",
      "Uzbekistan tourism",
      "arzon sayohat paketlari O'zbekiston",
      "guruh bilan sayohat O'zbekiston",
      "individual tur O'zbekiston",
      "O'zbekiston turistik joylari",
      "sayohat turlari Samarqand",
    ],

    authors: [
      {
        name: "Shams Travel",
        url: "https://shamstravel.uz",
      },
    ],

    creator: "Shams Travel",
    publisher: "Shams Travel",

    category: "travel",

    alternates: {
      canonical: "https://shamstravel.uz/",
      languages: {
        uz: "https://shamstravel.uz/uz",
        ru: "https://shamstravel.uz/ru",
        en: "https://shamstravel.uz/",
      },
    },

    robots: {
      index: true,
      follow: true,
      nocache: false,

      googleBot: {
        index: true,
        follow: true,
        noimageindex: false,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },

    openGraph: {
      title: "Shams Travel — quyosh yo'l ko'rsatadi",
      description:
        "Tayyor turlar, transport, joylashtirish va gid xizmatlari — Shams Travel bilan yo'lga chiqing.",
      url: "https://shamstravel.uz/",
      siteName: "Shams Travel",
      locale: "uz_UZ",
      type: "website",

      images: [
        {
          url: "/images/hero_image.jpg",
          width: 1200,
          height: 630,
          alt: "Shams Travel — quyosh yo'l ko'rsatadi",
        },
      ],
    },

    twitter: {
      card: "summary_large_image",
      title: "Shams Travel — quyosh yo'l ko'rsatadi",
      description:
        "Shams Travel bilan sayohatni yorug' va tashvishsiz boshlang: tayyor turlar va to'liq xizmat bir joyda.",
      images: ["/images/hero_image.jpg"],
    },

    icons: {
      icon: "/favicon.ico",
      shortcut: "/favicon.ico",
      apple: "/apple-touch-icon.png",
    },
  };
}

export async function generateStaticParams() {
  return generateI18nStaticParams();
}

export default async function RootLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ lng: string }>;
}) {
  const { lng } = await params;
  const { i18n } = await getT();

  if (process.env.NODE_ENV === "development") {
    await i18n.reloadResources(
      i18nConfig.supportedLngs,
      i18nConfig.ns
    );
  }

  const resources = getResources(i18n);

  return (
    <html lang={lng}>
      <body className={`${manrope.variable} antialiased`}>
        <NextTopLoader color="var(--primary)" showSpinner={false} height={3} />
        <I18nProvider
          fallbackLng={i18nConfig.fallbackLng}
          language={lng}
          resources={resources}
        >
          <AuthProvider>{children}</AuthProvider>

          <Toaster
            richColors
            position="top-center"
          />
        </I18nProvider>
      </body>
    </html>
  );
}