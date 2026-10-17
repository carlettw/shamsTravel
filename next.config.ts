import type { NextConfig } from "next";
import { API_URL, PROXY_PREFIX, isApiConfigured } from "./lib/api-config";

const nextConfig: NextConfig = {
    devIndicators: false,
    // Dev rejimda boshqa qurilmadan (telefon, VM) kirish uchun ruxsat etilgan manzillar.
    // Yangi manzil chiqsa, shu ro'yxatga qo'shib, `npm run dev` ni qayta ishga tushiring.
    allowedDevOrigins: ["192.168.56.1"],
    outputFileTracingIncludes: {
        "/**": ["./public/locales/**"],
    },
    // Render "cold start" uchun uzoqroq kutish
    experimental: {
        proxyTimeout: 120_000,
    },
    // Brauzer -> /backend-api/... -> backend (CORS kerak emas)
    async rewrites() {
        if (!isApiConfigured) return [];
        return [{ source: `${PROXY_PREFIX}/:path*`, destination: `${API_URL}/:path*` }];
    },
};

export default nextConfig;