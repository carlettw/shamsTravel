/**
 * Backend manzilini bitta joyda o'qiydi va tekshiradi.
 * NEXT_PUBLIC_API_URL bo'lmasa yoki noto'g'ri bo'lsa, axios "ERR_INVALID_URL" beradi.
 */
function normalizeApiUrl(raw: string | undefined): string {
    const value = (raw ?? "").trim().replace(/^["']|["']$/g, "");
    if (!value) return "";

    // Protokol yozilmagan bo'lsa (masalan "my-api.onrender.com/api/v1"), https qo'shamiz
    const withProtocol = /^https?:\/\//i.test(value)
        ? value
        : `${/^(localhost|127\.0\.0\.1)/i.test(value) ? "http" : "https"}://${value}`;

    try {
        const url = new URL(withProtocol);
        return url.toString().replace(/\/+$/, "");
    } catch {
        return "";
    }
}

export const API_URL = normalizeApiUrl(process.env.NEXT_PUBLIC_API_URL);

/** `/api/v1` ni olib tashlangan backend origin (rasmlar uchun) */
export const API_ORIGIN = API_URL.replace(/\/api\/v1\/?$/, "");

export const isApiConfigured = API_URL.length > 0;

/**
 * Brauzer so'rovlari bir xil domen orqali (/backend-api) o'tadi, Next.js ularni
 * backendga yo'naltiradi (next.config.ts). Shunda CORS muammosi bo'lmaydi.
 * Server tomonda esa to'g'ridan-to'g'ri backend manzili ishlatiladi.
 */
export const PROXY_PREFIX = "/backend-api";

export function getApiBase(): string {
    if (!isApiConfigured) return "";
    return typeof window === "undefined" ? API_URL : PROXY_PREFIX;
}

if (!isApiConfigured && process.env.NODE_ENV !== "production") {
    console.warn(
        "[Shams Travel] NEXT_PUBLIC_API_URL ko'rsatilmagan yoki noto'g'ri. " +
            ".env.local fayliga to'liq manzilni yozing, masalan: " +
            "NEXT_PUBLIC_API_URL=https://your-backend.onrender.com/api/v1 " +
            "va `npm run dev` ni qayta ishga tushiring."
    );
}
