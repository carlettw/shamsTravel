import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function localizedText(
  value: string | { uz?: string; ru?: string; en?: string } | null | undefined,
  lang: string = "uz"
): string {
  if (!value) return "";
  if (typeof value === "string") return value;
  return value[lang as "uz" | "ru" | "en"] ?? value.uz ?? value.en ?? value.ru ?? "";
}

export function localizedList(
  value: string[] | { uz?: string[]; ru?: string[]; en?: string[] } | undefined,
  lang: string = "uz"
): string[] {
  if (!value) return [];
  if (Array.isArray(value)) return value;
  return value[lang as "uz" | "ru" | "en"] ?? value.uz ?? value.en ?? value.ru ?? [];
}

export function localizedHref(
  currentLocale: string,
  href: string,
  fallbackLng: string = "en"
): string {
  if (currentLocale === fallbackLng) return href;
  return href === "/" ? `/${currentLocale}` : `/${currentLocale}${href}`;
}

export function metaT(
  t: (key: string) => string,
  key: string,
  fallbackKey: string
): string {
  const value = t(key);
  return value && value !== key ? value : t(fallbackKey);
}

const CURRENCY_SYMBOLS: Record<string, string> = { USD: "$", EUR: "€", GBP: "£", RUB: "₽" };

/** Narxni backenddan kelgan valyuta bilan chiqaradi (USD → $100, UZS → 1 200 000 UZS). */
export function formatPrice(price: number | string, currency = "USD"): string {
    const value = Number(price);
    const code = currency.toUpperCase();
    const symbol = CURRENCY_SYMBOLS[code];
    const formatted = Number.isFinite(value)
        ? value.toLocaleString("en-US", { maximumFractionDigits: 0 }).replace(/,/g, " ")
        : String(price);
    return symbol ? `${symbol}${formatted}` : `${formatted} ${code}`;
}
