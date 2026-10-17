import { API_ORIGIN } from "@/lib/api-config";

export function getMediaUrl(path?: string | null): string | null {
    if (!path) return null;
    if (path.startsWith("http://") || path.startsWith("https://")) return path;
    return `${API_ORIGIN}${path.startsWith("/") ? "" : "/"}${path}`;
}