import type { MetadataRoute } from "next";

// Required by Next 16 when output: 'export' is used on metadata route handlers.
export const dynamic = "force-static";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
    },
    sitemap: "https://delfee.co/sitemap.xml",
  };
}
