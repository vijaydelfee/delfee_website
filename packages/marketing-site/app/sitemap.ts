import type { MetadataRoute } from "next";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://shieldai.dev";
  const lastModified = new Date("2026-04-01");

  return [
    { url: baseUrl, lastModified, changeFrequency: "weekly", priority: 1.0 },
    { url: `${baseUrl}/pricing`, lastModified, changeFrequency: "weekly", priority: 0.9 },
    { url: `${baseUrl}/docs`, lastModified, changeFrequency: "monthly", priority: 0.7 },
    { url: `${baseUrl}/demo`, lastModified, changeFrequency: "monthly", priority: 0.8 },
  ];
}
