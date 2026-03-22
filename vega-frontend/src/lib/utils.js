/**
 * Get the full URL for an image.
 * If the path starts with http, return it as is (Cloudinary or external).
 * If the path starts with /uploads, prepend the backend host.
 */
export const getImageUrl = (path) => {
    if (!path) return null;
    if (path.startsWith("http")) return path;
    
    const baseUrl = process.env.NEXT_PUBLIC_API_URL?.replace("/api/v1", "") || "http://localhost:5010";
    return `${baseUrl}${path}`;
};
