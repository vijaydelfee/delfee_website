import type { MetadataRoute } from "next";

// Required by Next 16 when output: 'export' is used on metadata route handlers.
export const dynamic = "force-static";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://delfee.co";
  const lastModified = new Date("2026-04-01");

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
  ];
}
