import type { NextConfig } from "next";
import { API_URL, PROXY_PREFIX, isApiConfigured } from "./lib/api-config";

const nextConfig: NextConfig = {
    devIndicators: false,
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