/**
 * Get the full URL for an image.
 * If the path starts with http, return it as is (Cloudinary or external).
 * If the path starts with /uploads, prepend the backend host.
 */
import { NEXT_PUBLIC_API_URL } from "@/config/env.config";

export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    
    const baseUrl = NEXT_PUBLIC_API_URL.replace("/api/v1", "");
    return `${baseUrl}${path}`;
};
